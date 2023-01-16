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
import { isAuthenticated } from '../../../helper'

router.get('/', isAuthenticated, getAllStudents)
router.post('/', isAuthenticated, addStudent)
router.patch('/:id', isAuthenticated, updateStudent)
router.delete('/:id', isAuthenticated, deleteStudent)

//custom get
router.get('/information', isAuthenticated, getStudent)

//custom patch
router.patch('/claim-record/:lrn', isAuthenticated, claimStudent)

module.exports = router
