import Students from '../../models/students'
import { UNKNOWN_ERROR_OCCURRED } from '../../utils/constants'
import { isEmpty } from 'lodash'

const claimStudent = async (req, res, next) => {
  const getStudent = await Students.find({
    _id: req.params.id,
    deletedAt: { $exists: true },
  })
  const getClaimedStudent = await Students.find({
    _id: req.params.id,
    userStudentId: { $exists: true },
  })
  const userStudentId = req.body.userStudentId
  if (getStudent.length === 0) {
    if (getClaimedStudent.length === 0) {
      if (!isEmpty(userStudentId)) {
        try {
          const updateStudent = await Students.findByIdAndUpdate(
            req.params.id,
            {
              userStudentId,
              studentClaimedAt: Date.now(),
              updatedAt: Date.now(),
            },
            { new: true }
          )
          res.json(updateStudent)
        } catch (err: any) {
          const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED
          res.status(500).json(message)
        }
      } else {
        res.status(500).json('Enter student ID')
      }
    } else {
      res.status(500).json('Student record is already claimed')
    }
  } else {
    res.status(400).json('Student record can not be found')
  }
}

module.exports = {
  claimStudent,
}
