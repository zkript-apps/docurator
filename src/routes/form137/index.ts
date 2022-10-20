import express from 'express'
const router = express.Router()
const {
  getAllForm137,
  addForm137,
  updateForm137,
  deleteForm137,
} = require('./default')

router.get('/', getAllForm137)
router.post('/', addForm137)
router.patch('/:id', updateForm137)
router.delete('/:id', deleteForm137)

module.exports = router
