import ClaimAccess from '../../models/claimAccess'
import { UNKNOWN_ERROR_OCCURRED } from '../../utils/constants'

const getAllClaimAccess = async (req, res) => {
  if (res.locals.user) {
    try {
      const claimAccessCounts = await ClaimAccess.find({
        deletedAt: { $exists: false },
      }).countDocuments()
      const getAllClaimAccess = await ClaimAccess.find({
        deletedAt: { $exists: false },
      })
        .sort({
          createdAt: -1,
        })
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
        items: getAllClaimAccess,
        count: claimAccessCounts,
      })
    } catch (err: any) {
      const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED
      res.status(500).json(message)
    }
  }
}

module.exports = {
  getAllClaimAccess,
}
