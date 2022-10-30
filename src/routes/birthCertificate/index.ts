import express from 'express'
const router = express.Router()
const {
  getAllBirthCertificate,
  addBirthCertificate,
  updateBirthCertificate,
  deleteBirthCertificate,
} = require('./default')
import { isUserLoggedIn } from '../../../helper'

router.get('/', isUserLoggedIn, getAllBirthCertificate)
router.post('/', isUserLoggedIn, addBirthCertificate)
router.patch('/:id', isUserLoggedIn, updateBirthCertificate)
router.delete('/:id', isUserLoggedIn, deleteBirthCertificate)

module.exports = router
