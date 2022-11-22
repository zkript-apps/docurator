import express from 'express'
const router = express.Router()
const {
  getAllStudents,
  addStudent,
  updateStudent,
  deleteStudent,
} = require('./default')
import { claimStudent, claimAccess } from './customPatch'
import { isUserLoggedIn } from '../../../helper'

router.get('/', isUserLoggedIn, getAllStudents)
router.post('/', isUserLoggedIn, addStudent)
router.patch('/:id', isUserLoggedIn, updateStudent)
router.delete('/:id', isUserLoggedIn, deleteStudent)

//custom patch
router.patch('/claim-record/:id', isUserLoggedIn, claimStudent)
router.patch('/claim-access/:id', isUserLoggedIn, claimAccess)

module.exports = router
