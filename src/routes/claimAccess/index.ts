import express from 'express'
const router = express.Router()
const {
  getClaimAccess,
  addClaimAccess,
  updateClaimAccess,
  deleteClaimAccess,
} = require('./default')
import { getAllClaimAccess, getAllPendingClaimAccess } from './customGet'
import { isAuthenticated } from '../../../helper'

router.get('/', isAuthenticated, getClaimAccess)
router.post('/', isAuthenticated, addClaimAccess)
router.patch('/:id', isAuthenticated, updateClaimAccess)
router.delete('/:id', isAuthenticated, deleteClaimAccess)

//custom get
router.get('/all', isAuthenticated, getAllClaimAccess)
router.get('/pending', isAuthenticated, getAllPendingClaimAccess)

module.exports = router
