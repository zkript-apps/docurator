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

    const { email, phoneNumber } = jwt.verify(token, keys.signKey)
    // Check if email exist in db
    const user = await Users.findOne({ email, phoneNumber })
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

module.exports = {
  verifyAuth,
}
