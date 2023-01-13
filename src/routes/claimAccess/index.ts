import express from 'express'
const router = express.Router()
const {
  getClaimAccess,
  addClaimAccess,
  updateClaimAccess,
  deleteClaimAccess,
} = require('./default')
import { getAllClaimAccess, getAllPendingClaimAccess } from './customGet'
import { isUserLoggedIn } from '../../../helper'

router.get('/', isUserLoggedIn, getClaimAccess)
router.post('/', isUserLoggedIn, addClaimAccess)
router.patch('/:id', isUserLoggedIn, updateClaimAccess)
router.delete('/:id', isUserLoggedIn, deleteClaimAccess)

//custom get
router.get('/all', isUserLoggedIn, getAllClaimAccess)
router.get('/pending', isUserLoggedIn, getAllPendingClaimAccess)

module.exports = router
