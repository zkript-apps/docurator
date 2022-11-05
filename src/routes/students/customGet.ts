import Students from '../../models/students'
import { UNKNOWN_ERROR_OCCURRED } from '../../utils/constants'

const getPaginatedStudents = async (req, res, next) => {
  const condition = req.query.condition ? JSON.parse(req.query.condition) : {}
  const limit = req.query.limit ? Number(req.query.limit) : 10
  const page = req.query.page ? Number(req.query.page) : 1
  if (!condition.deletedAt) {
    condition.deletedAt = {
      $exists: false,
    }
  }
  if (res.locals.user && String(res.locals.user._id) === condition.userId) {
    // if admin, remove condition userId to get all records
    if (res.locals.user.userType === 'Admin') {
      delete condition.userId
    }
    try {
      const studentsCounts = await Students.find(condition).countDocuments()
      const getAllStudents = await Students.find(condition)
        .populate([
          {
            path: 'userId',
            model: 'Users',
          },
        ])
        .limit(limit)
        .skip(page === 1 ? 0 : limit * (page - 1))
        .sort({ createdAt: -1 })
      res.json({
        items: getAllStudents,
        pageCount:
          studentsCounts < limit ? 1 : Math.ceil(withdrawsCounts / limit),
        page,
      })
    } catch ({ message: errMessage }) {
      const message = errMessage ? errMessage : UNKNOWN_ERROR_OCCURRED
      res.status(500).json(message)
    }
  } else {
    res.status(403).json('Unauthorized action')
  }

  //   try {
  //     const studentsCounts = await Students.find().countDocuments()
  //     const getAllStudents = await Students.find()
  //       .populate([
  //         {
  //           path: 'userId',
  //           model: 'Students',
  //         },
  //       ])
  //       .limit(limit)
  //       .skip(page === 1 ? 0 : limit * (page - 1))
  //       .sort({ createdAt: -1 })
  //     res.json({
  //       items: getAllStudents,
  //       pageCount: studentsCounts < limit ? 1 : Math.ceil(studentsCounts / limit),
  //       page,
  //     })
  //   } catch ({ message: errMessage }) {
  //     const message = errMessage ? errMessage : UNKNOWN_ERROR_OCCURRED
  //     res.status(500).json(message)
  //   }
}

module.exports = {
  getPaginatedStudents,
}
