import express from 'express'
const router = express.Router()
const {
  getAllForm138,
  addForm138,
  updateForm138,
  deleteForm138,
} = require('./default')
import { isUserLoggedIn } from '../../../helper'

router.get('/', isUserLoggedIn, getAllForm138)
router.post('/', isUserLoggedIn, addForm138)
router.patch('/:id', isUserLoggedIn, updateForm138)
router.delete('/:id', isUserLoggedIn, deleteForm138)

module.exports = router
