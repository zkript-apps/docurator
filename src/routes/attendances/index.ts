import express from 'express'
const router = express.Router()
const {
  getAllAttendances,
  addAttendance,
  updateAttendance,
  deleteAttendance,
} = require('./default')
import { createAttendanceRecord } from './customPost'
import { isAuthenticated } from '../../../helper'

router.get('/', isAuthenticated, getAllAttendances)
router.post('/', isAuthenticated, addAttendance)
router.patch('/:id', isAuthenticated, updateAttendance)
router.delete('/:id', isAuthenticated, deleteAttendance)

//custom post
router.post(
  '/create-attendance-record',
  isAuthenticated,
  createAttendanceRecord
)

module.exports = router
