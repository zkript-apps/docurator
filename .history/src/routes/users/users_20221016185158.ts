import express from 'express'
import Users from '../../models/users'
import {
  UNKNOWN_ERROR_OCCURRED,
  REQUIRED_VALUE_EMPTY,
  EMAIL_PHONENUMBER_ALREADY_USED,
} from '../../utils/constants'
import CryptoJS from 'crypto-js'
import keys from '../../config/keys'
import isEmpty from 'lodash/isEmpty'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const usersCounts = await Users.find().countDocuments()
    const getAllUsers = await Users.find().sort({ createdAt: -1 })
    res.json({
      items: getAllUsers,
      count: usersCounts,
    })
  } catch (err: any) {
    const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED
    res.status(500).json(message)
  }
})

router.post('/', async (req, res) => {
  const { email, password, phoneNumber, firstName, lastName } = req.body

  if (email && password && phoneNumber) {
    const encryptPassword = CryptoJS.AES.encrypt(password, keys.encryptKey)
    const newUser = new Users({
      email,
      phoneNumber,
      password: encryptPassword,
      firstName,
      lastName,
      userType: 'User',
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
})

router.patch('/:id', async (req, res) => {
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
    }
  } else {
    res.status(400).json('User does not exist')
  }
})

export default router
