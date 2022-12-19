import ClaimAccess from '../../models/claimAccess'
import Form138 from '../../models/form138'

const getAllForm138WithAccess = async (req, res) => {
  // get all student id of all students that the school claimed string[]
  if (res.locals.user) {
    try {
      const getAllForm138WithAccess = await ClaimAccess.find({
        schoolId: res.locals.user._id,
      }).sort({
        createdAt: -1,
      })
      const studentIds = getAllForm138WithAccess.map((id) =>
        id.studentId.toString()
      )

      // get all students form137 that exist in the above result using $in query
      const form138Counts = await Form138.find({
        deletedAt: { $exists: false },
        studentId: { $in: studentIds },
      }).countDocuments()
      const getAllForm138 = await Form138.find({
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
        items: getAllForm138,
        count: form138Counts,
      })
    } catch (err: any) {
      const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED
      res.status(500).json(message)
    }
  }
}

module.exports = {
  getAllForm138WithAccess,
}
