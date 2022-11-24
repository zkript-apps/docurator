import express from 'express'
const router = express.Router()
const {
  getAllClaimAccess,
  addClaimAccess,
  updateClaimAccess,
  deleteClaimAccess,
} = require('./default')
import { isUserLoggedIn } from '../../../helper'

router.get('/', isUserLoggedIn, getAllClaimAccess)
router.post('/', isUserLoggedIn, addClaimAccess)
router.patch('/:id', isUserLoggedIn, updateClaimAccess)
router.delete('/:id', isUserLoggedIn, deleteClaimAccess)

module.exports = router
