import express from 'express'
import Users from '../../models/users'
import { UNKNOWN_ERROR_OCCURRED } from '../../utils/constants'

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
  const email = req.body.email
  const password = req.body.password
  const phoneNumber = req.body.phoneNumber

  if (email && password && phoneNumber) {
    try {
      const getExistingUser = await Users.find({
        $or: [{ email }, { phoneNumber }],
        deletedAt: { $exists: false },
      })
      if (getExistingUser.length === 0) {
        const user = new Users(req.body)
        await user.save()
        res.send({ data: user })
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

export default router
