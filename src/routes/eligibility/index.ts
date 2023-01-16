import express from 'express'
const router = express.Router()
const {
  getAllEligibility,
  addEligibility,
  updateEligibility,
  deleteEligibility,
} = require('./default')
import { isAuthenticated } from '../../../helper'

router.get('/', isAuthenticated, getAllEligibility)
router.post('/', isAuthenticated, addEligibility)
router.patch('/:id', isAuthenticated, updateEligibility)
router.delete('/:id', isAuthenticated, deleteEligibility)

module.exports = router
