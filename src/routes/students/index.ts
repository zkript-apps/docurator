import express from 'express'
const router = express.Router()
const {
  getAllStudents,
  addStudent,
  updateStudent,
  deleteStudent,
} = require('./default')
import { isUserLoggedIn } from '../../../helper'

router.get('/', isUserLoggedIn, getAllStudents)
router.post('/', isUserLoggedIn, addStudent)
router.patch('/:id', isUserLoggedIn, updateStudent)
router.delete('/:id', isUserLoggedIn, deleteStudent)

module.exports = router
