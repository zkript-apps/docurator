import express from 'express'
const router = express.Router()
const { getAllUsers, addUser, updateUser, deleteUser } = require('./default')
import { auth } from './customPost'
import { isUserLoggedIn } from '../../helper'

//default
router.get('/', isUserLoggedIn, getAllUsers)
router.post('/', isUserLoggedIn, addUser)
router.patch('/:id', isUserLoggedIn, updateUser)
router.delete('/:id', isUserLoggedIn, deleteUser)

//custom post
router.post('/auth', auth)

module.exports = router
