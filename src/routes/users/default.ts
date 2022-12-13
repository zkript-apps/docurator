import Users from '../../models/users'
import {
  UNKNOWN_ERROR_OCCURRED,
  REQUIRED_VALUE_EMPTY,
  EMAIL_PHONENUMBER_ALREADY_USED,
} from '../../utils/constants'
import CryptoJS from 'crypto-js'
import { keys } from '../../config/keys'
import isEmpty from 'lodash/isEmpty'

const getAllUsers = async (req, res) => {
  try {
    const usersCounts = await Users.find({
      deletedAt: { $exists: false },
    }).countDocuments()
    const getAllUsers = await Users.find({
      deletedAt: { $exists: false },
    }).sort({ createdAt: -1 })
    res.json({
      items: getAllUsers,
      count: usersCounts,
    })
  } catch (err: any) {
    const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED
    res.status(500).json(message)
  }
}

const addUser = async (req, res) => {
  const { email, password, phoneNumber, firstName, lastName, userType } =
    req.body

  if (email && password && phoneNumber && userType) {
    const encryptPassword = CryptoJS.AES.encrypt(password, keys.encryptKey)
    const newUser = new Users({
      email,
      phoneNumber,
      password: encryptPassword,
      firstName,
      lastName,
      userType,
    })
    try {
      const getExistingUser = await Users.find({
        $or: [{ email }, { phoneNumber }],
        deletedAt: { $exists: false },
      })
      if (getExistingUser.length === 0) {
        const createUser = await newUser.save()
        res.json(createUser)
      } else {
        res.status(400).json(EMAIL_PHONENUMBER_ALREADY_USED)
      }
    } catch (err: any) {
      const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED
      res.status(500).json(message)
    }
  } else {
    res.status(400).json(REQUIRED_VALUE_EMPTY)
  }
}

const updateUser = async (req, res) => {
  const getUser = await Users.find({
    _id: req.params.id,
    deletedAt: { $exists: true },
  })
  const condition = req.body
  if (getUser.length === 0) {
    if (!isEmpty(condition)) {
      try {
        const updateUser = await Users.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
            updatedAt: Date.now(),
          },
          { new: true }
        )
        res.json(updateUser)
      } catch (err: any) {
        const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED
        res.status(500).json(message)
      }
    } else {
      res.status(500).json('User cannot be found')
    }
  } else {
    res.status(400).json('User does not exist')
  }
}

const deleteUser = async (req, res) => {
  try {
    const getUser = await Users.find({
      _id: req.params.id,
      deletedAt: {
        $exists: false,
      },
    })
    if (getUser.length > 0) {
      const deleteUser = await Users.findByIdAndUpdate(req.params.id, {
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
  getAllUsers,
  addUser,
  updateUser,
  deleteUser,
}
