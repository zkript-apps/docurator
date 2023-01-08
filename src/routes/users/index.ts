import express from 'express'
const router = express.Router()
import { getAllUsers, addUser, updateUser, deleteUser } from './default'
import { auth, createAccount } from './customPost'
import { verifyAuth, getUnverifiedAccounts } from './customGet'
import { isUserLoggedIn } from '../../../helper'
import changePassword from './customPatch'

//default
router.get('/', isUserLoggedIn, getAllUsers)
router.post('/', addUser)
router.patch('/:id', isUserLoggedIn, updateUser)
router.delete('/:id', isUserLoggedIn, deleteUser)

//custom post
router.post('/auth', auth)
router.post('/create-account', createAccount)

//custom get
router.get('/verifyAuth', verifyAuth)
router.get('/unverified', isUserLoggedIn, getUnverifiedAccounts)

//custom patch
router.patch('/change-password/:id', isUserLoggedIn, changePassword)

module.exports = router
