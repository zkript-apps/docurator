import express from 'express'
const router = express.Router()
const {
  getAllStudents,
  addStudent,
  updateStudent,
  deleteStudent,
} = require('./default')
import { claimStudent, claimAccess } from './customPatch'
import { getStudent } from './customGet'
import { isUserLoggedIn } from '../../../helper'

router.get('/', isUserLoggedIn, getAllStudents)
router.post('/', isUserLoggedIn, addStudent)
router.patch('/:id', isUserLoggedIn, updateStudent)
router.delete('/:id', isUserLoggedIn, deleteStudent)

//custom get
router.get('/information', isUserLoggedIn, getStudent)

//custom patch
router.patch('/claim-record', isUserLoggedIn, claimStudent)

module.exports = router
