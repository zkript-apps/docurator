import express from 'express'
const router = express.Router()
const {
  getAllStudents,
  addStudent,
  updateStudent,
  deleteStudent,
} = require('./default')
import { isUserLoggedIn } from '../../../helper'
const { getPaginatedStudents } = require('./customGet')

router.get('/', isUserLoggedIn, getAllStudents)
router.post('/', isUserLoggedIn, addStudent)
router.patch('/:id', isUserLoggedIn, updateStudent)
router.delete('/:id', isUserLoggedIn, deleteStudent)

//custom get
router.get('/paginated', isUserLoggedIn, getPaginatedStudents)

module.exports = router
