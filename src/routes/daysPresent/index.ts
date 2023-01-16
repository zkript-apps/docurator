import express from 'express'
const router = express.Router()
const {
  getAllDaysPresent,
  addDaysPresent,
  updateDaysPresent,
  deleteDaysPresent,
} = require('./default')
import { isUserLoggedIn } from '../../../helper'

router.get('/', isUserLoggedIn, getAllDaysPresent)
router.post('/', isUserLoggedIn, addDaysPresent)
router.patch('/:id', isUserLoggedIn, updateDaysPresent)
router.delete('/:id', isUserLoggedIn, deleteDaysPresent)

module.exports = router
