import express from 'express'
const router = express.Router()
import {
  getAllForm138,
  addForm138,
  updateForm138,
  deleteForm138,
} from './default'
import { getAllForm138WithAccess } from './customGet'
import { isUserLoggedIn } from '../../../helper'

router.get('/', isUserLoggedIn, getAllForm138)
router.post('/', isUserLoggedIn, addForm138)
router.patch('/:id', isUserLoggedIn, updateForm138)
router.delete('/:id', isUserLoggedIn, deleteForm138)

//custom get
router.get('/with-access', isUserLoggedIn, getAllForm138WithAccess)

module.exports = router
