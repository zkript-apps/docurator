import express from 'express'
const router = express.Router()
import {
  getAllForm138,
  addForm138,
  updateForm138,
  deleteForm138,
} from './default'
import { getAllForm138WithAccess } from './customGet'
import { createForm138WithAttendance } from './customPost'
import { isAuthenticated } from '../../../helper'

router.get('/', isAuthenticated, getAllForm138)
router.post('/', isAuthenticated, addForm138)
router.patch('/:id', isAuthenticated, updateForm138)
router.delete('/:id', isAuthenticated, deleteForm138)

//custom get
router.get('/with-access', isAuthenticated, getAllForm138WithAccess)

//custom post
router.post('/create', isAuthenticated, createForm138WithAttendance)

module.exports = router
