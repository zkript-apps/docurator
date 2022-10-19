import express from 'express'
const router = express.Router()
const {
  getAllEligibility,
  addEligibility,
  updateEligibility,
  deleteEligibility,
} = require('./default')

router.get('/', getAllEligibility)
router.post('/', addEligibility)
router.patch('/:id', updateEligibility)
router.delete('/:id', deleteEligibility)

module.exports = router
