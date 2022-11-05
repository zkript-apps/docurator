import express from 'express'
const router = express.Router()
const { getAllUsers, addUser, updateUser, deleteUser } = require('./default')
import { auth } from './customPost'
import { isUserLoggedIn } from '../../../helper'
import { verifyAuth } from './customGet'

//default
router.get('/', isUserLoggedIn, getAllUsers)
router.post('/', addUser)
router.patch('/:id', isUserLoggedIn, updateUser)
router.delete('/:id', isUserLoggedIn, deleteUser)

//custom post
router.post('/auth', auth)

//custom get
router.get('/verifyAuth', verifyAuth)

module.exports = router
