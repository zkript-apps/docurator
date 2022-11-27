import Users from '../../models/users'
import CryptoJS from 'crypto-js'
import { keys } from '../../config/keys'

const changePassword = async (req, res) => {
  const getUser = await Users.find({
    _id: req.params.id,
    deletedAt: { $exists: true },
  })
  const { oldPassword, newPassword } = req.body
  if (getUser.length === 0) {
    if (oldPassword && newPassword) {
      try {
        const verifyUser = await Users.findOne({
          _id: req.params.id,
          deletedAt: {
            $exists: false,
          },
        })

        const oldPasswordDecrypted = CryptoJS.AES.decrypt(
          verifyUser.password,
          keys.encryptKey
        )

        const dbPassword = oldPasswordDecrypted.toString(CryptoJS.enc.Utf8)
        if (dbPassword === newPassword) {
          throw new Error('You cannot use your old password')
        }
        if (!verifyUser || dbPassword !== oldPassword) {
          throw new Error('Wrong old password')
        }

        const newPasswordEncrypted = CryptoJS.AES.encrypt(
          newPassword,
          keys.encryptKey
        ).toString()

        const updateUser = await Users.findByIdAndUpdate(
          req.params.id,
          {
            password: newPasswordEncrypted,
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
      res.status(500).json('Enter old password')
    }
  } else {
    res.status(400).json('User does not exist')
  }
}

export default changePassword
