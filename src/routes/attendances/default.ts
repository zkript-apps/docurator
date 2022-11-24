import Attendances from '../../models/attendances'
import {
  UNKNOWN_ERROR_OCCURRED,
  REQUIRED_VALUE_EMPTY,
  RECORD_DOES_NOT_EXIST,
  RECORD_ALREADY_DELETED,
} from '../../utils/constants'
import isEmpty from 'lodash/isEmpty'

const getAllAttendances = async (req, res) => {
  try {
    const attendancesCounts = await Attendances.find().countDocuments()
    const getAllAttendances = await Attendances.find({
      deletedAt: { $exists: false },
    }).sort({
      createdAt: -1,
    })
    res.json({
      items: getAllAttendances,
      count: attendancesCounts,
    })
  } catch (err: any) {
    const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED
    res.status(500).json(message)
  }
}

const addAttendance = async (req, res) => {
  const { studentId, lrn, academicYear, gradeLevel } = req.body

  if (lrn && gradeLevel) {
    const newAttendance = new Attendances({
      studentId,
      lrn,
      academicYear,
      gradeLevel,
    })

    try {
      const getExistingAttendances = await Attendances.find({
        $and: [{ lrn }, { gradeLevel }],
        deletedAt: { $exists: false },
      })
      if (getExistingAttendances.length === 0) {
        const createAttendance = await newAttendance.save()
        res.json(createAttendance)
      } else {
        res.status(400).json('Attendance record already exists')
      }
    } catch (err: any) {
      const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED
      res.status(500).json(message)
    }
  } else {
    res.status(400).json(REQUIRED_VALUE_EMPTY)
  }
}

const updateAttendance = async (req, res) => {
  const getAttendances = await Attendances.find({
    _id: req.params.id,
    deletedAt: { $exists: true },
  })
  const condition = req.body
  if (getAttendances.length === 0) {
    if (!isEmpty(condition)) {
      try {
        const updateAttendance = await Attendances.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
            updatedAt: Date.now(),
          },
          { new: true }
        )
        res.json(updateAttendance)
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

const deleteAttendance = async (req, res) => {
  try {
    const getAttendances = await Attendances.find({
      _id: req.params.id,
      deletedAt: {
        $exists: false,
      },
    })
    if (getAttendances.length > 0) {
      const deleteAttendance = await Attendances.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            deletedAt: Date.now(),
          },
        }
      )
      res.json(deleteAttendance)
    } else {
      throw new Error(RECORD_ALREADY_DELETED)
    }
  } catch (err: any) {
    const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED
    res.status(500).json(message)
  }
}

module.exports = {
  getAllAttendances,
  addAttendance,
  updateAttendance,
  deleteAttendance,
}
