import express from 'express'
const router = express.Router()
const { getAllUsers, addUser, updateUser, deleteUser } = require('./default')

router.get('/', getAllUsers)
router.post('/', addUser)
router.patch('/:id', updateUser)
router.delete('/:id', deleteUser)

export default router
