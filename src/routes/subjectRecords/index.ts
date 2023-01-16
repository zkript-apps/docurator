import express from 'express'
const router = express.Router()
const {
  getAllSubjectRecords,
  addSubjectRecords,
  updateSubjectRecord,
  deleteSubjectRecord,
} = require('./default')
import { isUserLoggedIn } from '../../../helper'

router.get('/', isUserLoggedIn, getAllSubjectRecords)
router.post('/', isUserLoggedIn, addSubjectRecords)
router.patch('/:id', isUserLoggedIn, updateSubjectRecord)
router.delete('/:id', isUserLoggedIn, deleteSubjectRecord)

module.exports = router
