import SchoolDays from '../../models/schoolDays'
import {
  UNKNOWN_ERROR_OCCURRED,
  RECORD_EXISTS,
  REQUIRED_VALUE_EMPTY,
  RECORD_DOES_NOT_EXIST,
} from '../../utils/constants'
import isEmpty from 'lodash/isEmpty'

const getAllSchoolDays = async (req, res) => {
  try {
    const schoolDaysCounts = await SchoolDays.find().countDocuments()
    const getAllSchoolDays = await SchoolDays.find().sort({ createdAt: -1 })
    res.json({
      items: getAllSchoolDays,
      count: schoolDaysCounts,
    })
  } catch (err: any) {
    const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED
    res.status(500).json(message)
  }
}

const addSchoolDays = async (req, res) => {
  const {
    studentId,
    lrn,
    attendanceId,
    academicYear,
    gradeLevel,
    daysOfSchool,
    daysPresent,
  } = req.body

  if (studentId && attendanceId && gradeLevel) {
    const newSchoolDays = new SchoolDays({
      studentId,
      lrn,
      attendanceId,
      academicYear,
      gradeLevel,
      daysOfSchool,
      daysPresent,
    })

    try {
      const getExistingSchoolDays = await SchoolDays.find({
        $and: [{ studentId }, { attendanceId }, { gradeLevel }],
        deletedAt: { $exists: false },
      })
      if (getExistingSchoolDays.length === 0) {
        const createSchoolDays = await newSchoolDays.save()
        res.json(createSchoolDays)
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

const updateSchoolDays = async (req, res) => {
  const getSchoolDays = await SchoolDays.find({
    _id: req.params.id,
    deletedAt: { $exists: true },
  })
  const condition = req.body
  if (getSchoolDays.length === 0) {
    if (!isEmpty(condition)) {
      try {
        const updateSchoolDays = await SchoolDays.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
            updatedAt: Date.now(),
          },
          { new: true }
        )
        res.json(updateSchoolDays)
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

const deleteSchoolDays = async (req, res) => {
  try {
    const getSchoolDays = await SchoolDays.find({
      _id: req.params.id,
      deletedAt: {
        $exists: false,
      },
    })
    if (getSchoolDays.length > 0) {
      const deleteSchoolDays = await SchoolDays.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            deletedAt: Date.now(),
          },
        }
      )
      res.json(deleteSchoolDays)
    } else {
      throw new Error('Record is already deleted')
    }
  } catch (err: any) {
    const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED
    res.status(500).json(message)
  }
}

module.exports = {
  getAllSchoolDays,
  addSchoolDays,
  updateSchoolDays,
  deleteSchoolDays,
}
