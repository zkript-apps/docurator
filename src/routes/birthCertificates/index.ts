import express from 'express'
const router = express.Router()
const {
  getAllBirthCertificates,
  addBirthCertificate,
  updateBirthCertificate,
  deleteBirthCertificate,
} = require('./default')
import { getAllBirthCertificatesWithAccess } from './customGet'
import { isUserLoggedIn } from '../../../helper'

router.get('/', isUserLoggedIn, getAllBirthCertificates)
router.post('/', isUserLoggedIn, addBirthCertificate)
router.patch('/:id', isUserLoggedIn, updateBirthCertificate)
router.delete('/:id', isUserLoggedIn, deleteBirthCertificate)

//custom get
router.get('/with-access', isUserLoggedIn, getAllBirthCertificatesWithAccess)

module.exports = router
