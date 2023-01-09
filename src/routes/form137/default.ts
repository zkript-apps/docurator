import Form137 from '../../models/form137'
import Students from '../../models/students'
import {
  UNKNOWN_ERROR_OCCURRED,
  RECORD_EXISTS,
  REQUIRED_VALUE_EMPTY,
  RECORD_DOES_NOT_EXIST,
} from '../../utils/constants'
import isEmpty from 'lodash/isEmpty'

const getAllForm137 = async (req, res) => {
  try {
    const form137Counts = await Form137.find({
      deletedAt: { $exists: false },
    }).countDocuments()

    const getAllForm137 = await Form137.find({
      deletedAt: { $exists: false },
    })
      .sort({ createdAt: -1 })
      .populate([
        {
          path: 'studentId',
          model: 'Students',
        },
      ])
    res.json({
      items: getAllForm137,
      count: form137Counts,
    })
  } catch (err: any) {
    const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED
    res.status(500).json(message)
  }
}

const addForm137 = async (req, res) => {
  const { lrn, educationLevel } = req.body

  if (lrn) {
    const getExistingLrn = await Students.findOne({
      lrn,
      deletedAt: { $exists: false },
    })
    try {
      const getExistingForm137 = await Form137.find({
        $and: [{ lrn }, { educationLevel }],
        deletedAt: { $exists: false },
      })
      if (getExistingLrn) {
        const newForm137 = new Form137({
          studentId: getExistingLrn._id,
          lrn,
          educationLevel,
        })
        if (getExistingForm137.length === 0) {
          const createStudent = await newForm137.save()
          res.json(createStudent)
        } else {
          res.status(400).json(RECORD_EXISTS)
        }
      } else {
        res.status(400).json(`Student with the LRN ${lrn} does not exist`)
      }
    } catch (err: any) {
      const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED
      res.status(500).json(message)
    }
  } else {
    res.status(400).json(REQUIRED_VALUE_EMPTY)
  }
}

const updateForm137 = async (req, res) => {
  const getForm137 = await Form137.find({
    _id: req.params.id,
    deletedAt: { $exists: true },
  })
  const condition = req.body
  if (getForm137.length === 0) {
    if (!isEmpty(condition)) {
      try {
        const updateForm137 = await Form137.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
            updatedAt: Date.now(),
          },
          { new: true }
        )
        res.json(updateForm137)
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

const deleteForm137 = async (req, res) => {
  try {
    const getForm137 = await Form137.find({
      _id: req.params.id,
      deletedAt: {
        $exists: false,
      },
    })
    if (getForm137.length > 0) {
      const deleteForm137 = await Form137.findByIdAndUpdate(req.params.id, {
        $set: {
          deletedAt: Date.now(),
        },
      })
      res.json(deleteForm137)
    } else {
      throw new Error('Record is already deleted')
    }
  } catch (err: any) {
    const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED
    res.status(500).json(message)
  }
}
module.exports = {
  getAllForm137,
  addForm137,
  updateForm137,
  deleteForm137,
}
