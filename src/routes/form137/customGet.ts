import ClaimAccess from '../../models/claimAccess'
import Form137 from '../../models/form137'

const getAllForm137WithAccess = async (req, res) => {
  // get all student id of all students that the school claimed string[]
  if (res.locals.user) {
    try {
      const getAllForm137WithAccess = await ClaimAccess.find({
        schoolId: res.locals.user.schoolId,
      }).sort({
        createdAt: -1,
      })
      const studentIds = getAllForm137WithAccess.map((id) =>
        id?.studentId?.toString()
      )

      // get all students form137 that exist in the above result using $in query
      const form137Counts = await Form137.find({
        deletedAt: { $exists: false },
        studentId: { $in: studentIds },
      }).countDocuments()
      const getAllForm137 = await Form137.find({
        deletedAt: { $exists: false },
        studentId: { $in: studentIds },
      })
        .sort({ createdAt: -1 })
        .populate([
          {
            path: 'studentId',
            model: 'Students',
          },
        ])
      res.json({
        items: getAllForm137,
        count: form137Counts,
      })
    } catch (err: any) {
      const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED
      res.status(500).json(message)
    }
  }
}

module.exports = {
  getAllForm137WithAccess,
}
