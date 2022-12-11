import ClaimAccess from '../../models/claimAccess'
import BirthCertificates from '../../models/birthCertificates'

const getAllBirthCertificatesWithAccess = async (req, res) => {
  // get all student id of all students that the school claimed string[]
  if (res.locals.user) {
    try {
      const getAllForm137WithAccess = await ClaimAccess.find({
        schoolId: res.locals.user._id,
      }).sort({
        createdAt: -1,
      })
      const studentIds = getAllForm137WithAccess.map((id) =>
        id.studentId.toString()
      )

      // get all students form137 that exist in the above result using $in query
      const birthCertificatesCounts = await BirthCertificates.find({
        deletedAt: { $exists: false },
        studentId: { $in: studentIds },
      }).countDocuments()
      const getAllBirthCertificates = await BirthCertificates.find({
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
        items: getAllBirthCertificates,
        count: birthCertificatesCounts,
      })
    } catch (err: any) {
      const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED
      res.status(500).json(message)
    }
  }
}

module.exports = {
  getAllBirthCertificatesWithAccess,
}
