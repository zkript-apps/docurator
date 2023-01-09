import Students from '../../models/students'
import { UNKNOWN_ERROR_OCCURRED } from '../../utils/constants'

const getStudent = async (req, res) => {
  try {
    const getStudent = await Students.findOne({
      userId: res.locals.user._id,
      userType: 'Student',
      deletedAt: { $exists: false },
    })
      .sort({ createdAt: -1 })
      .populate([
        {
          path: 'userId',
          model: 'Users',
        },
      ])
    res.json(getStudent)
  } catch (err: any) {
    const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED
    res.status(500).json(message)
  }
}

module.exports = {
  getStudent,
}
