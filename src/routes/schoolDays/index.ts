import express from 'express'
const router = express.Router()
const {
  getAllSchoolDays,
  addSchoolDays,
  updateSchoolDays,
  deleteSchoolDays,
} = require('./default')

router.get('/', getAllSchoolDays)
router.post('/', addSchoolDays)
router.patch('/:id', updateSchoolDays)
router.delete('/:id', deleteSchoolDays)

module.exports = router
