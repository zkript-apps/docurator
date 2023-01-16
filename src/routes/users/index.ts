import express from 'express'
const router = express.Router()
import { getAllUsers, addUser, updateUser, deleteUser } from './default'
import { auth, createAccount } from './customPost'
import { verifyAuth, getUnverifiedAccounts } from './customGet'
import { isAuthenticated } from '../../../helper'
import changePassword from './customPatch'

//default
router.get('/', isAuthenticated, getAllUsers)
router.post('/', addUser)
router.patch('/:id', isAuthenticated, updateUser)
router.delete('/:id', isAuthenticated, deleteUser)

//custom post
router.post('/auth', auth)
router.post('/create-account', createAccount)

//custom get
router.get('/verifyAuth', verifyAuth)
router.get('/unverified', isAuthenticated, getUnverifiedAccounts)

//custom patch
router.patch('/change-password/:id', isAuthenticated, changePassword)

module.exports = router
