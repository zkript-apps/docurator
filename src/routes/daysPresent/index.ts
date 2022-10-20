import express from 'express'
const router = express.Router()
const {
  getAllDaysPresent,
  addDaysPresent,
  updateDaysPresent,
  deleteDaysPresent,
} = require('./default')

router.get('/', getAllDaysPresent)
router.post('/', addDaysPresent)
router.patch('/:id', updateDaysPresent)
router.delete('/:id', deleteDaysPresent)

module.exports = router
