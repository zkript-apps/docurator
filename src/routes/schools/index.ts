import express from 'express'
const router = express.Router()
const {
  getAllSchools,
  addSchools,
  updateSchools,
  deleteSchools,
} = require('./default')
import { isUserLoggedIn } from '../../../helper'

router.get('/', isUserLoggedIn, getAllSchools)
router.post('/', addSchools)
router.patch('/:id', isUserLoggedIn, updateSchools)
router.delete('/:id', isUserLoggedIn, deleteSchools)

module.exports = router
