import express from 'express'
const router = express.Router()
const {
  getAllBirthCertificates,
  addBirthCertificate,
  updateBirthCertificate,
  deleteBirthCertificate,
} = require('./default')
import { getAllBirthCertificatesWithAccess } from './customGet'
import { isAuthenticated } from '../../../helper'

router.get('/', isAuthenticated, getAllBirthCertificates)
router.post('/', isAuthenticated, addBirthCertificate)
router.patch('/:id', isAuthenticated, updateBirthCertificate)
router.delete('/:id', isAuthenticated, deleteBirthCertificate)

//custom get
router.get('/with-access', isAuthenticated, getAllBirthCertificatesWithAccess)

module.exports = router
