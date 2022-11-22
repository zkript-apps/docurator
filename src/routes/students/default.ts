import Students from '../../models/students'
import {
  UNKNOWN_ERROR_OCCURRED,
  LRN_EXISTS,
  REQUIRED_VALUE_EMPTY,
} from '../../utils/constants'
import isEmpty from 'lodash/isEmpty'

const getAllStudents = async (req, res) => {
  try {
    const studentsCounts = await Students.find().countDocuments()
    const getAllStudents = await Students.find({
      deletedAt: { $exists: false },
    })
      .sort({ createdAt: -1 })
      .populate([
        {
          path: 'userId',
          model: 'Users',
        },
      ])
    res.json({
      items: getAllStudents,
      count: studentsCounts,
    })
  } catch (err: any) {
    const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED
    res.status(500).json(message)
  }
}

const addStudent = async (req, res) => {
  const {
    userId,
    lrn,
    statusOfApplicant,
    schoolName,
    dateOfBirth,
    gender,
    civilStatus,
    phoneNumber,
    email,
    mothersName,
    mothersOccupation,
    fathersName,
    fathersOccupation,
    guardiansName,
    guardiansMobileNumber,
    houseNumber,
    street,
    barangay,
    municipality,
    province,
  } = req.body

  if (lrn && statusOfApplicant && schoolName && phoneNumber) {
    const newStudent = new Students({
      userId,
      lrn,
      statusOfApplicant,
      schoolName,
      dateOfBirth,
      gender,
      civilStatus,
      phoneNumber,
      email,
      mothersName,
      mothersOccupation,
      fathersName,
      fathersOccupation,
      guardiansName,
      guardiansMobileNumber,
      houseNumber,
      street,
      barangay,
      municipality,
      province,
    })

    try {
      const getExistingStudent = await Students.find({
        $or: [{ lrn }, { email }],
        deletedAt: { $exists: false },
      })
      if (getExistingStudent.length === 0) {
        const createStudent = await newStudent.save()
        res.json(createStudent)
      } else {
        res.status(400).json(LRN_EXISTS)
      }
    } catch (err: any) {
      const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED
      res.status(500).json(message)
    }
  } else {
    res.status(400).json(REQUIRED_VALUE_EMPTY)
  }
}

const updateStudent = async (req, res) => {
  const getStudent = await Students.find({
    _id: req.params.id,
    deletedAt: { $exists: true },
  })
  const condition = req.body
  if (getStudent.length === 0) {
    if (!isEmpty(condition)) {
      try {
        const updateStudent = await Students.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
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
      res.status(500).json('Student cannot be found')
    }
  } else {
    res.status(400).json('User is already deleted')
  }
}

const deleteStudent = async (req, res) => {
  try {
    const getStudent = await Students.find({
      _id: req.params.id,
      deletedAt: {
        $exists: false,
      },
    })
    if (getStudent.length > 0) {
      const deleteUser = await Students.findByIdAndUpdate(req.params.id, {
        $set: {
          deletedAt: Date.now(),
        },
      })
      res.json(deleteUser)
    } else {
      throw new Error('User is already deleted')
    }
  } catch (err: any) {
    const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED
    res.status(500).json(message)
  }
}
module.exports = {
  getAllStudents,
  addStudent,
  updateStudent,
  deleteStudent,
}
