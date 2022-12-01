import express from 'express'
const router = express.Router()
const {
  getAllForm137,
  addForm137,
  updateForm137,
  deleteForm137,
} = require('./default')
const { getAllForm137WithAccess } = require('./customGet')
import { isUserLoggedIn } from '../../../helper'

router.get('/', isUserLoggedIn, getAllForm137)
router.post('/', isUserLoggedIn, addForm137)
router.patch('/:id', isUserLoggedIn, updateForm137)
router.delete('/:id', isUserLoggedIn, deleteForm137)

//custom get
router.get('/with-access/', isUserLoggedIn, getAllForm137WithAccess)

module.exports = router
