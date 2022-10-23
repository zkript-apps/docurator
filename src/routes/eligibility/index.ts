import express from 'express'
const router = express.Router()
const {
  getAllEligibility,
  addEligibility,
  updateEligibility,
  deleteEligibility,
} = require('./default')
import { isUserLoggedIn } from '../../../helper'

router.get('/', isUserLoggedIn, getAllEligibility)
router.post('/', isUserLoggedIn, addEligibility)
router.patch('/:id', isUserLoggedIn, updateEligibility)
router.delete('/:id', isUserLoggedIn, deleteEligibility)

module.exports = router
