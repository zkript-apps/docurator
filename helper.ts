import Users from './src/models/users'
import { keys } from './src/config/keys'
import jwt from 'jsonwebtoken'
import { UNKNOWN_ERROR_OCCURRED } from './src/utils/constants'

const isUserLoggedIn = async (req, res, next) => {
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
      next()
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
}

module.exports = {
  isUserLoggedIn,
}
