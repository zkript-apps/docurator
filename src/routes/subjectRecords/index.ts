import express from 'express'
const router = express.Router()
const {
  getAllSubjectRecords,
  addSubjectRecords,
  updateSubjectRecord,
  deleteSubjectRecord,
} = require('./default')
import { isAuthenticated } from '../../../helper'

router.get('/', isAuthenticated, getAllSubjectRecords)
router.post('/', isAuthenticated, addSubjectRecords)
router.patch('/:id', isAuthenticated, updateSubjectRecord)
router.delete('/:id', isAuthenticated, deleteSubjectRecord)

module.exports = router
