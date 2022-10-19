import { Application } from 'express'
import { API_ROOT } from '../utils/constants'
import EligibilityRoutes from './eligibility'

export default function (app: Application) {
  app.use(`${API_ROOT}/eligibility`, EligibilityRoutes)
}
