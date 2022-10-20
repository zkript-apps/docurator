import express from 'express'
const router = express.Router()
const {
  getAllDaysOfSchool,
  addDaysOfSchool,
  updateDaysOfSchool,
  deleteDaysOfSchool,
} = require('./default')

router.get('/', getAllDaysOfSchool)
router.post('/', addDaysOfSchool)
router.patch('/:id', updateDaysOfSchool)
router.delete('/:id', deleteDaysOfSchool)

module.exports = router
