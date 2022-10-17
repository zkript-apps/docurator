import express from 'express'
import Users from '../../models/users'
import { UNKNOWN_ERROR_OCCURRED } from '../../utils/constants'
import CryptoJS from 'crypto-js'
const keys = require('../../config/keys')

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
    const newUser = new Users({
      email,
      phoneNumber,
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
        res
          .status(500)
          .send({ error: 'Email or Phone number is already in use.' })
      }
    } catch (err: any) {
      const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED
      res.status(500).json(message)
    }
  } else {
    res.status(500).send({ error: 'Required fields cannot be empty.' })
  }
})

router.patch('/:id', async (req, res) => {
  try {
    const getUser = await Users.find({
      _id: req.params.id,
      deletedAt: { $exists: true },
    })
    if (getUser.length === 0) {
      const updateUser = await Users.findByIdAndUpdate(
        req.params.id,
        {
          updatedAt: Date.now(),
        },
        { new: true }
      )
      res.json(updateUser)
    } else {
      res.status(500).send({ error: 'User is already deleted.' })
    }
  } catch {
    res.status(404).send({ error: 'User does not exist.' })
  }
})

export default router
