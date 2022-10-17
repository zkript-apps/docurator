import express from 'express'
const router = express.Router()
const {
  getAllStudents,
  addStudent,
  updateStudent,
  deleteStudent,
} = require('./default')

router.get('/', getAllStudents)
router.post('/', addStudent)
router.patch('/:id', updateStudent)
router.delete('/:id', deleteStudent)

module.exports = router
