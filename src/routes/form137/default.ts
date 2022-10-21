import Form137 from '../../models/form137'
import Users from '../../models/users'
import {
  UNKNOWN_ERROR_OCCURRED,
  RECORD_EXISTS,
  REQUIRED_VALUE_EMPTY,
  RECORD_DOES_NOT_EXIST,
} from '../../utils/constants'
import isEmpty from 'lodash/isEmpty'
import jwt from 'jsonwebtoken'
import { keys } from '../../config/keys'

const getAllForm137 = async (req, res) => {
  const bearerHeader = req.headers['authorization']
  if (bearerHeader) {
    const bearer = bearerHeader.split(' ')
    const bearerToken = bearer[1]
    try {
      const { email, phoneNumber } = jwt.verify(bearerToken, keys.signKey)
      const user = await Users.findOne({ email, phoneNumber })
      if (user && user.deletedAt) {
        throw new Error('We cannot find your account in our system')
      }
      if (user && user.blockedAt) {
        throw new Error(
          'Your account was banned, all actions and requested data was prohibited'
        )
      }
      res.locals.user = user
      try {
        const form137Counts = await Form137.find({
          schoolsWithAccess: user.id,
        }).countDocuments()
        const getAllForm137 = await Form137.find({
          schoolsWithAccess: user.id,
        }).sort({ createdAt: -1 })
        res.json({
          items: getAllForm137,
          count: form137Counts,
        })
      } catch (err: any) {
        const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED
        res.status(500).json(message)
      }
    } catch (err: any) {
      const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED
      if (message === 'jwt malformed') {
        res.status(401).json('Invalid authentication credentials')
      } else if (message === 'jwt expired') {
        res.status(403).json('Authentication is expired, please login again')
      } else {
        res.status(403).json(message)
      }
    }
  } else {
    res.status(401).json(`You are not authorized to perform this action`)
  }

  /*
  try {
    const form137Counts = await Form137.find().countDocuments()
    const getAllForm137 = await Form137.find().sort({ createdAt: -1 })
    res.json({
      items: getAllForm137,
      count: form137Counts,
    })
  } catch (err: any) {
    const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED
    res.status(500).json(message)
  }*/
}

const addForm137 = async (req, res) => {
  const { studentId, lrn } = req.body

  if (lrn) {
    const newStudent = new Form137({
      studentId,
      lrn,
    })

    try {
      const getExistingForm137 = await Form137.find({
        $or: [{ studentId }, { lrn }],
        deletedAt: { $exists: false },
      })
      if (getExistingForm137.length === 0) {
        const createStudent = await newStudent.save()
        res.json(createStudent)
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
