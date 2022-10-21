import express from 'express'
const router = express.Router()
const {
  getAllAttendances,
  addAttendance,
  updateAttendance,
  deleteAttendance,
} = require('./default')
import { isUserLoggedIn } from '../../../helper'

router.get('/', isUserLoggedIn, getAllAttendances)
router.post('/', isUserLoggedIn, addAttendance)
router.patch('/:id', isUserLoggedIn, updateAttendance)
router.delete('/:id', isUserLoggedIn, deleteAttendance)

module.exports = router
