import express from 'express'
const router = express.Router()
const {
  getAllDaysPresent,
  addDaysPresent,
  updateDaysPresent,
  deleteDaysPresent,
} = require('./default')
import { isAuthenticated } from '../../../helper'

router.get('/', isAuthenticated, getAllDaysPresent)
router.post('/', isAuthenticated, addDaysPresent)
router.patch('/:id', isAuthenticated, updateDaysPresent)
router.delete('/:id', isAuthenticated, deleteDaysPresent)

module.exports = router
