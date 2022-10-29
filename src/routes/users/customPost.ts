import Users from '../../models/users'
import { UNKNOWN_ERROR_OCCURRED } from '../../utils/constants'
import { keys } from '../../config/keys'
import CryptoJS from 'crypto-js'
import jwt from 'jsonwebtoken'

const auth = async (req, res, next) => {
  const { email, password, phoneNumber } = req.body
  if ((email, password)) {
    try {
      const user = await Users.findOne({
        $or: [{ email }, { phoneNumber }],
      })
      if (!user || (user && user.deletedAt)) {
        throw new Error('Account does not exist in our system')
      }
      if (user && user.blockedAt) {
        throw new Error('Account was prohibited to login due to violations')
      }
      const encryptPassword = CryptoJS.AES.decrypt(
        user.password,
        keys.encryptKey
      )
      const originalPassword = encryptPassword.toString(CryptoJS.enc.Utf8)
      if (originalPassword !== password) {
        throw new Error('Email or password is invalid')
      } else {
        const token = jwt.sign(
          {
            id: user.id,
            phoneNumber: user.phoneNumber,
            email: user.email,
            userType: user.userType,
          },
          keys.signKey,
          { expiresIn: '2h' }
        )
        if (res.locals.user) {
          delete res.locals.user
        }
        res.json({ token, userType: user.userType })
      }
    } catch (err: any) {
      const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED
      res.status(500).json(message)
    }
  } else {
    res.status(500).json('Required values are missing')
  }
}

module.exports = {
  auth,
}
