import express from 'express'
const router = express.Router()
const {
  getAllAttendances,
  addAttendance,
  updateAttendance,
  deleteAttendance,
} = require('./default')

router.get('/', getAllAttendances)
router.post('/', addAttendance)
router.patch('/:id', updateAttendance)
router.delete('/:id', deleteAttendance)

module.exports = router
