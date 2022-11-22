import express from 'express'
const router = express.Router()
const {
  getAllClaimAccess,
  addClaimAccess,
  //   updateAttendance,
  //   deleteAttendance,
} = require('./default')
import { isUserLoggedIn } from '../../../helper'

router.get('/', isUserLoggedIn, getAllClaimAccess)
router.post('/', isUserLoggedIn, addClaimAccess)
// router.patch('/:id', isUserLoggedIn, updateAttendance)
// router.delete('/:id', isUserLoggedIn, deleteAttendance)

module.exports = router
