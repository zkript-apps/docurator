import ClaimAccess from '../../models/claimAccess'
import Form137 from '../../models/form137'
import Form138 from '../../models/form138'
import SubjectRecords from '../../models/subjectRecords'

const getAllForm137WithAccess = async (req, res) => {
  // get all student id of all students that the school claimed string[]
  if (res.locals.user) {
    try {
      const getAllForm137WithAccess = await ClaimAccess.find({
        deletedAt: { $exists: false },
        schoolId: res.locals.user.schoolId,
      }).sort({
        createdAt: -1,
      })
      const studentIds = getAllForm137WithAccess.map((id) =>
        id?.studentId?.toString()
      )

      const getAllForm138 = await Form138.find({
        deletedAt: { $exists: false },
        studentId: { $in: studentIds },
      }).sort({ gradeLevel: -1 })

      const getAllSubjectRecords = await Form138.find({
        deletedAt: { $exists: false },
        studentId: { $in: studentIds },
      }).sort({ createdAt: -1 })

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
        form138: getAllForm138,
        SubjectRecords: getAllSubjectRecords,
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
