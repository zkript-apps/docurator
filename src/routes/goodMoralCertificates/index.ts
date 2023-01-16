import express from 'express'
const router = express.Router()
import {
  getAllGoodMoralCertificates,
  addGoodMoralCertificates,
  updateGoodMoralCertificate,
  deleteGoodMoralCertificate,
} from './default'
import { getAllGoodMoralCertificatesWithAccess } from './customGet'
import { isAuthenticated } from '../../../helper'

//default
router.get('/', isAuthenticated, getAllGoodMoralCertificates)
router.post('/', addGoodMoralCertificates)
router.patch('/:id', isAuthenticated, updateGoodMoralCertificate)
router.delete('/:id', isAuthenticated, deleteGoodMoralCertificate)

//custom get
router.get(
  '/with-access',
  isAuthenticated,
  getAllGoodMoralCertificatesWithAccess
)

module.exports = router
