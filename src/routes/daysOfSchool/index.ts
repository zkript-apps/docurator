import express from 'express'
const router = express.Router()
const {
  getAllDaysOfSchool,
  addDaysOfSchool,
  updateDaysOfSchool,
  deleteDaysOfSchool,
} = require('./default')
import { isAuthenticated } from '../../../helper'

router.get('/', isAuthenticated, getAllDaysOfSchool)
router.post('/', isAuthenticated, addDaysOfSchool)
router.patch('/:id', isAuthenticated, updateDaysOfSchool)
router.delete('/:id', isAuthenticated, deleteDaysOfSchool)

module.exports = router
