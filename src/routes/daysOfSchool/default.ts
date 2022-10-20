import DaysOfSchool from '../../models/daysOfSchool'
import {
  UNKNOWN_ERROR_OCCURRED,
  RECORD_EXISTS,
  REQUIRED_VALUE_EMPTY,
  RECORD_DOES_NOT_EXIST,
} from '../../utils/constants'
import isEmpty from 'lodash/isEmpty'

const getAllDaysOfSchool = async (req, res) => {
  try {
    const daysOfSchoolCounts = await DaysOfSchool.find().countDocuments()
    const getAllDaysOfSchool = await DaysOfSchool.find().sort({ createdAt: -1 })
    res.json({
      items: getAllDaysOfSchool,
      count: daysOfSchoolCounts,
    })
  } catch (err: any) {
    const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED
    res.status(500).json(message)
  }
}

const addDaysOfSchool = async (req, res) => {
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
    const newDaysOfSchool = new DaysOfSchool({
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
      const getExistingDaysOfSchool = await DaysOfSchool.find({
        attendanceId,
        deletedAt: { $exists: false },
      })
      if (getExistingDaysOfSchool.length === 0) {
        const createDaysOfSchool = await newDaysOfSchool.save()
        res.json(createDaysOfSchool)
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

const updateDaysOfSchool = async (req, res) => {
  const getDaysOfSchool = await DaysOfSchool.find({
    _id: req.params.id,
    deletedAt: { $exists: true },
  })
  const condition = req.body
  if (getDaysOfSchool.length === 0) {
    if (!isEmpty(condition)) {
      try {
        const updateDaysOfSchool = await DaysOfSchool.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
            updatedAt: Date.now(),
          },
          { new: true }
        )
        res.json(updateDaysOfSchool)
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

const deleteDaysOfSchool = async (req, res) => {
  try {
    const getDaysOfSchool = await DaysOfSchool.find({
      _id: req.params.id,
      deletedAt: {
        $exists: false,
      },
    })
    if (getDaysOfSchool.length > 0) {
      const deleteDaysOfSchool = await DaysOfSchool.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            deletedAt: Date.now(),
          },
        }
      )
      res.json(deleteDaysOfSchool)
    } else {
      throw new Error('Record is already deleted')
    }
  } catch (err: any) {
    const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED
    res.status(500).json(message)
  }
}

module.exports = {
  getAllDaysOfSchool,
  addDaysOfSchool,
  updateDaysOfSchool,
  deleteDaysOfSchool,
}
