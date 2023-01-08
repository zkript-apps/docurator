import Users from '../../models/users'
import jwt from 'jsonwebtoken'
import { keys } from '../../config/keys'
import { UNKNOWN_ERROR_OCCURRED } from '../../utils/constants'

const verifyAuth = async (req, res, next) => {
  const token = req.query.token
  try {
    // Check if token is defined
    if (!token) {
      throw new Error('Authentication is invalid')
    }
    // Verify the token

    const { email } = jwt.verify(token, keys.signKey)
    // Check if email exist in db
    const user = await Users.findOne({ email })
    if (!user || (user && user.deletedAt)) {
      throw new Error('We cannot find your account in our system')
    }
    if (user && user.blockedAt) {
      throw new Error('User was prohibited to login due to violations')
    }
    res.json(user)
  } catch ({ message: errMessage }) {
    const message = errMessage ? errMessage : UNKNOWN_ERROR_OCCURRED
    if (message === 'jwt malformed') {
      res.status(401).json('Invalid authentication credentials')
    } else if (message === 'Authentication is invalid') {
      res.status(401).json(message)
    } else if (message === 'jwt expired') {
      res.status(403).json('Authentication is expired, please login again')
    } else {
      res.status(500).json(message)
    }
  }
}

const getUnverifiedAccounts = async (req, res) => {
  try {
    const unverifiedAccountsCounts = await Users.find({
      deletedAt: { $exists: false },
      isVerified: false,
    }).countDocuments()
    const getAllUnverifiedAccounts = await Users.find({
      deletedAt: { $exists: false },
      isVerified: false,
    })
      .sort({ createdAt: -1 })
      .populate([
        {
          path: 'schoolId',
          model: 'Schools',
        },
      ])
    res.json({
      items: getAllUnverifiedAccounts,
      count: unverifiedAccountsCounts,
    })
  } catch (err: any) {
    const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED
    res.status(500).json(message)
  }
}

module.exports = {
  verifyAuth,
  getUnverifiedAccounts,
}
