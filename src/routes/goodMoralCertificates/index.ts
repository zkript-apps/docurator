import express from 'express'
const router = express.Router()
import {
  getAllGoodMoralCertificates,
  addGoodMoralCertificates,
  updateGoodMoralCertificate,
  deleteGoodMoralCertificate,
} from './default'
import { isUserLoggedIn } from '../../../helper'

//default
router.get('/', isUserLoggedIn, getAllGoodMoralCertificates)
router.post('/', addGoodMoralCertificates)
router.patch('/:id', isUserLoggedIn, updateGoodMoralCertificate)
router.delete('/:id', isUserLoggedIn, deleteGoodMoralCertificate)

module.exports = router
