import express from 'express'
const router = express.Router()
const {
  getAllStudents,
  addStudent,
  updateStudent,
  deleteStudent,
} = require('./default')
import { getStudent } from './customGet'
import { claimStudent } from './customPatch'
import { isUserLoggedIn } from '../../../helper'

router.get('/', isUserLoggedIn, getAllStudents)
router.post('/', isUserLoggedIn, addStudent)
router.patch('/:id', isUserLoggedIn, updateStudent)
router.delete('/:id', isUserLoggedIn, deleteStudent)

//custom patch
router.patch('/claim-record/:id', isUserLoggedIn, claimStudent)
router.get('/student', isUserLoggedIn, getStudent)

module.exports = router
