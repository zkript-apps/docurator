import Users from '../../models/users'
import Schools from '../../models/schools'
import {
  UNKNOWN_ERROR_OCCURRED,
  EMAIL_PHONENUMBER_ALREADY_USED,
  SCHOOL_ALREADY_EXISTS,
  REQUIRED_VALUE_EMPTY,
} from '../../utils/constants'
import { keys } from '../../config/keys'
import CryptoJS from 'crypto-js'
import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'

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
      if (user && user.isVerified === false) {
        throw new Error('Your account is not yet verified')
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

const createAccount = async (req, res) => {
  const {
    schoolName,
    schoolEmail,
    schoolPhoneNumber,
    schoolStreet,
    schoolBarangay,
    schoolMunicipality,
    schoolProvince,
    schoolZipCode,
    //user req body
    email,
    password,
    phoneNumber,
    firstName,
    lastName,
    userType,
  } = req.body

  if (userType === 'Admin') {
    if (
      schoolName &&
      schoolEmail &&
      schoolPhoneNumber &&
      email &&
      password &&
      phoneNumber &&
      userType
    ) {
      const newSchools = new Schools({
        schoolName,
        schoolEmail,
        schoolPhoneNumber,
        schoolStreet,
        schoolBarangay,
        schoolMunicipality,
        schoolProvince,
        schoolZipCode,
      })
      try {
        const getExistingSchools = await Schools.find({
          $or: [
            { schoolName: req.body.schoolName },
            { schoolEmail: req.body.schoolEmail },
            { schoolPhoneNumber: req.body.schoolPhoneNumber },
          ],
          deletedAt: { $exists: false },
        })
        if (getExistingSchools.length === 0) {
          const createSchools = await newSchools.save()
          //create user account
          const encryptPassword = CryptoJS.AES.encrypt(
            password,
            keys.encryptKey
          )
          const uuidKey = uuidv4()
          const encryptPublicKey = CryptoJS.AES.encrypt(
            createSchools.schoolName,
            uuidKey
          )
          const encryptPrivateKey = CryptoJS.AES.encrypt(
            createSchools?._id.toString(),
            uuidKey
          )
          const newUser = new Users({
            email,
            phoneNumber,
            password: encryptPassword,
            firstName,
            lastName,
            userType,
            schoolId: createSchools?._id.toString(),
            uuid: uuidKey,
            publicKey: 'pub_' + encryptPublicKey,
            privateKey: 'pri_' + encryptPrivateKey,
            isVerified: false,
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
          res.status(400).json(SCHOOL_ALREADY_EXISTS)
        }
      } catch (err: any) {
        const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED
        res.status(500).json(message)
      }
    } else {
      res.status(400).json(REQUIRED_VALUE_EMPTY)
    }
  } else if (userType === 'Student') {
    const encryptPassword = CryptoJS.AES.encrypt(password, keys.encryptKey)
    const newUser = new Users({
      email,
      phoneNumber,
      password: encryptPassword,
      firstName,
      lastName,
      userType,
      isVerified: true,
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
  }
}

module.exports = {
  auth,
  createAccount,
}
