import daysPresent from '../../models/daysPresent'
import {
  UNKNOWN_ERROR_OCCURRED,
  RECORD_EXISTS,
  REQUIRED_VALUE_EMPTY,
  RECORD_DOES_NOT_EXIST,
} from '../../utils/constants'
import isEmpty from 'lodash/isEmpty'

const getAllDaysPresent = async (req, res) => {
  try {
    const daysPresentCounts = await daysPresent.find().countDocuments()
    const getAllDaysPresent = await daysPresent
      .find({
        deletedAt: { $exists: false },
      })
      .sort({ createdAt: -1 })
    res.json({
      items: getAllDaysPresent,
      count: daysPresentCounts,
    })
  } catch (err: any) {
    const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED
    res.status(500).json(message)
  }
}

const addDaysPresent = async (req, res) => {
  const {
    studentId,
    lrn,
    attendanceId,
    june,
    july,
    august,
    september,
    october,
    november,
    december,
    january,
    february,
    march,
    april,
    may,
  } = req.body

  if (studentId && attendanceId) {
    const newDaysPresent = new daysPresent({
      studentId,
      lrn,
      attendanceId,
      june,
      july,
      august,
      september,
      october,
      november,
      december,
      january,
      february,
      march,
      april,
      may,
    })

    try {
      const getExistingDaysPresent = await daysPresent.find({
        attendanceId,
        deletedAt: { $exists: false },
      })
      if (getExistingDaysPresent.length === 0) {
        const createDaysPresent = await newDaysPresent.save()
        res.json(createDaysPresent)
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

const updateDaysPresent = async (req, res) => {
  const getDaysPresent = await daysPresent.find({
    _id: req.params.id,
    deletedAt: { $exists: true },
  })
  const condition = req.body
  if (getDaysPresent.length === 0) {
    if (!isEmpty(condition)) {
      try {
        const updateDaysPresent = await daysPresent.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
            updatedAt: Date.now(),
          },
          { new: true }
        )
        res.json(updateDaysPresent)
      } catch (err: any) {
        const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED
        res.status(500).json(message)
      }
    } else {
      res.status(500).json(RECORD_DOES_NOT_EXIST)
    }
  } else {
    res.status(400).json('Record is already deleted')
  }
}

const deleteDaysPresent = async (req, res) => {
  try {
    const getDaysPresent = await daysPresent.find({
      _id: req.params.id,
      deletedAt: {
        $exists: false,
      },
    })
    if (getDaysPresent.length > 0) {
      const deleteDaysPresent = await daysPresent.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            deletedAt: Date.now(),
          },
        }
      )
      res.json(deleteDaysPresent)
    } else {
      throw new Error('Record is already deleted')
    }
  } catch (err: any) {
    const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED
    res.status(500).json(message)
  }
}

module.exports = {
  getAllDaysPresent,
  addDaysPresent,
  updateDaysPresent,
  deleteDaysPresent,
}
