import express from 'express'
const router = express.Router()
const {
  getAllSchools,
  addSchools,
  updateSchools,
  deleteSchools,
} = require('./default')
import { isAuthenticated } from '../../../helper'

router.get('/', isAuthenticated, getAllSchools)
router.post('/', addSchools)
router.patch('/:id', isAuthenticated, updateSchools)
router.delete('/:id', isAuthenticated, deleteSchools)

module.exports = router
