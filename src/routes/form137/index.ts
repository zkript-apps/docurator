import express from 'express'
const router = express.Router()
const {
  getAllForm137,
  addForm137,
  updateForm137,
  deleteForm137,
} = require('./default')
const { getAllForm137WithAccess } = require('./customGet')
import { isAuthenticated } from '../../../helper'

router.get('/', isAuthenticated, getAllForm137)
router.post('/', isAuthenticated, addForm137)
router.patch('/:id', isAuthenticated, updateForm137)
router.delete('/:id', isAuthenticated, deleteForm137)

//custom get
router.get('/with-access/', isAuthenticated, getAllForm137WithAccess)

module.exports = router
