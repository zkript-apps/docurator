import express from 'express'
const router = express.Router()
const {
  getAllDaysOfSchool,
  addSchoolDays,
  updateDaysOfSchool,
  deleteDaysOfSchool,
} = require('./default')

router.get('/', getAllDaysOfSchool)
router.post('/', addSchoolDays)
router.patch('/:id', updateDaysOfSchool)
router.delete('/:id', deleteDaysOfSchool)

module.exports = router
