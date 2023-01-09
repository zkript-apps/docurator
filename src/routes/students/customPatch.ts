import Students from '../../models/students'
import { UNKNOWN_ERROR_OCCURRED } from '../../utils/constants'

const claimStudent = async (req, res, next) => {
  const getStudent = await Students.findOne({
    lrn: req.params.lrn,
    deletedAt: { $exists: false },
  })
  const getClaimedStudents = await Students.find({
    $and: [{ lrn: req.params.lrn }, { userId: { $ne: null } }],
  })
  if (getStudent) {
    if (getClaimedStudents.length === 0) {
      if (req.params.lrn) {
        try {
          const updateStudent = await Students.findByIdAndUpdate(
            getStudent?._id.toString(),
            {
              userId: res?.locals?.user?._id,
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
        res.status(500).json('Enter your LRN')
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
