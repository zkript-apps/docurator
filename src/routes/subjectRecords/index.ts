import express from 'express'
const router = express.Router()
const {
  getAllSubjectRecords,
  addSubjectRecords,
  updateSubjectRecord,
  deleteSubjectRecord,
} = require('./default')

router.get('/', getAllSubjectRecords)
router.post('/', addSubjectRecords)
router.patch('/:id', updateSubjectRecord)
router.delete('/:id', deleteSubjectRecord)

module.exports = router
