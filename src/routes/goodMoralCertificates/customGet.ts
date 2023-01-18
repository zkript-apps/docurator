import ClaimAccess from '../../models/claimAccess'
import GoodMoralCertificates from '../../models/goodMoralCertificates'

const getAllGoodMoralCertificatesWithAccess = async (req, res) => {
  // get all student id of all students that the school claimed string[]
  if (res.locals.user) {
    try {
      const getAllForm137WithAccess = await ClaimAccess.find({
        deletedAt: { $exists: false },
        schoolId: res.locals.user.schoolId,
        isAccepted: true,
      }).sort({
        createdAt: -1,
      })
      const studentIds = getAllForm137WithAccess.map((id) =>
        id?.studentId?.toString()
      )

      // get all students form137 that exist in the above result using $in query
      const goodMoralCertificatesCounts = await GoodMoralCertificates.find({
        deletedAt: { $exists: false },
        studentId: { $in: studentIds },
      }).countDocuments()
      const getAllGoodMoralCertificates = await GoodMoralCertificates.find({
        deletedAt: { $exists: false },
        studentId: { $in: studentIds },
      })
        .sort({ createdAt: -1 })
        .populate([
          {
            path: 'studentId',
            model: 'Students',
            populate: {
              path: 'userId',
              model: 'Users',
            },
          },
        ])

      res.json({
        items: getAllGoodMoralCertificates,
        count: goodMoralCertificatesCounts,
      })
    } catch (err: any) {
      const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED
      res.status(500).json(message)
    }
  }
}

module.exports = {
  getAllGoodMoralCertificatesWithAccess,
}
