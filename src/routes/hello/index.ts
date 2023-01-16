import express from 'express'
const router = express.Router()
import { hello } from './default'
import { isAuthenticated } from '../../../helper'

//default
router.get('/', isAuthenticated, hello)

module.exports = router
