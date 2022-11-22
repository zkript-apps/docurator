import Eligibility from '../../models/eligibility'
import {
  UNKNOWN_ERROR_OCCURRED,
  REQUIRED_VALUE_EMPTY,
  RECORD_EXISTS,
  RECORD_DOES_NOT_EXIST,
} from '../../utils/constants'
import isEmpty from 'lodash/isEmpty'

const getAllEligibility = async (req, res) => {
  try {
    const eligibilityCounts = await Eligibility.find().countDocuments()
    const getAllEligibility = await Eligibility.find({
      deletedAt: { $exists: false },
    }).sort({ createdAt: -1 })
    res.json({
      items: getAllEligibility,
      count: eligibilityCounts,
    })
  } catch (err: any) {
    const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED
    res.status(500).json(message)
  }
}

const addEligibility = async (req, res) => {
  const { studentId, lrn, isEligibleForNextLevel, gradeLevel, academicYear } =
    req.body

  if (lrn && isEligibleForNextLevel != null && gradeLevel && academicYear) {
    const newEligibility = new Eligibility({
      studentId,
      lrn,
      isEligibleForNextLevel,
      gradeLevel,
      academicYear,
    })

    try {
      const getEligibility = await Eligibility.find({
        $and: [{ isEligibleForNextLevel }, { gradeLevel }],
        deletedAt: { $exists: false },
      })
      if (getEligibility.length === 0) {
        const createEligibility = await newEligibility.save()
        res.json(createEligibility)
      } else {
        res.status(400).json(RECORD_EXISTS)
      }
    } catch (err: any) {
      const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED
      res.status(500).json(message)
    }
  } else {
    res.status(400).json(REQUIRED_VALUE_EMPTY)
  }
}

const updateEligibility = async (req, res) => {
  const getEligibility = await Eligibility.find({
    _id: req.params.id,
    deletedAt: { $exists: true },
  })
  const condition = req.body
  if (getEligibility.length === 0) {
    if (!isEmpty(condition)) {
      try {
        const updateEligibility = await Eligibility.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
            updatedAt: Date.now(),
          },
          { new: true }
        )
        res.json(updateEligibility)
      } catch (err: any) {
        const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED
        res.status(500).json(message)
      }
    } else {
      res.status(500).json('Record can not be found')
    }
  } else {
    res.status(400).json(RECORD_DOES_NOT_EXIST)
  }
}

const deleteEligibility = async (req, res) => {
  try {
    const getEligibility = await Eligibility.find({
      _id: req.params.id,
      deletedAt: {
        $exists: false,
      },
    })
    if (getEligibility.length > 0) {
      const deleteEligibility = await Eligibility.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            deletedAt: Date.now(),
          },
        }
      )
      res.json(deleteEligibility)
    } else {
      throw new Error('Record is already deleted')
    }
  } catch (err: any) {
    const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED
    res.status(500).json(message)
  }
}

module.exports = {
  getAllEligibility,
  addEligibility,
  updateEligibility,
  deleteEligibility,
}
