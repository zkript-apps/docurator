import ClaimAccess from '../../models/claimAccess'
import {
  UNKNOWN_ERROR_OCCURRED,
  REQUIRED_VALUE_EMPTY,
  RECORD_DOES_NOT_EXIST,
  RECORD_ALREADY_DELETED,
} from '../../utils/constants'
import isEmpty from 'lodash/isEmpty'

const getAllClaimAccess = async (req, res) => {
  if (res.locals.user) {
    try {
      const claimAccessCounts = await ClaimAccess.find().countDocuments()
      const getAllClaimAccess = await ClaimAccess.find({
        accessClaimedBy: res.locals.user._id,
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

const addClaimAccess = async (req, res) => {
  const { studentId, accessClaimedBy, accessClaimedAt } = req.body

  if (studentId && accessClaimedBy) {
    const newClaimAccess = new ClaimAccess({
      studentId,
      accessClaimedBy,
      accessClaimedAt,
    })

    try {
      const getExistingClaimAccess = await ClaimAccess.find({
        $and: [{ studentId }, { accessClaimedBy }],
        deletedAt: { $exists: false },
      })
      if (getExistingClaimAccess.length === 0) {
        const createClaimAccess = await newClaimAccess.save()
        res.json(createClaimAccess)
      } else {
        res.status(400).json('Student record already claimed')
      }
    } catch (err: any) {
      const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED
      res.status(500).json(message)
    }
  } else {
    res.status(400).json(REQUIRED_VALUE_EMPTY)
  }
}

const updateClaimAccess = async (req, res) => {
  const getClaimAccesses = await ClaimAccess.find({
    _id: req.params.id,
    deletedAt: { $exists: true },
  })
  const condition = req.body
  if (getClaimAccesses.length === 0) {
    if (!isEmpty(condition)) {
      try {
        const updateClaimAccess = await ClaimAccess.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
            updatedAt: Date.now(),
          },
          { new: true }
        )
        res.json(updateClaimAccess)
      } catch (err: any) {
        const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED
        res.status(500).json(message)
      }
    } else {
      res.status(500).json(RECORD_DOES_NOT_EXIST)
    }
  } else {
    res.status(400).json(RECORD_ALREADY_DELETED)
  }
}

const deleteClaimAccess = async (req, res) => {
  try {
    const getClaimAccesses = await ClaimAccess.find({
      _id: req.params.id,
      deletedAt: {
        $exists: false,
      },
    })
    if (getClaimAccesses.length > 0) {
      const deleteClaimAccess = await ClaimAccess.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            deletedAt: Date.now(),
          },
        }
      )
      res.json(deleteClaimAccess)
    } else {
      throw new Error(RECORD_ALREADY_DELETED)
    }
  } catch (err: any) {
    const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED
    res.status(500).json(message)
  }
}

module.exports = {
  getAllClaimAccess,
  addClaimAccess,
  updateClaimAccess,
  deleteClaimAccess,
}
