import express from 'express'
const router = express.Router()
const {
  getAllDaysOfSchool,
  addDaysOfSchool,
  updateDaysOfSchool,
  deleteDaysOfSchool,
} = require('./default')
import { isUserLoggedIn } from '../../../helper'

router.get('/', isUserLoggedIn, getAllDaysOfSchool)
router.post('/', isUserLoggedIn, addDaysOfSchool)
router.patch('/:id', isUserLoggedIn, updateDaysOfSchool)
router.delete('/:id', isUserLoggedIn, deleteDaysOfSchool)

module.exports = router
