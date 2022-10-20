import { Application } from 'express'
import { API_ROOT } from '../utils/constants'
import DaysOfSchoolRoutes from './daysOfSchool'

export default function (app: Application) {
  app.use(`${API_ROOT}/days-of-school`, DaysOfSchoolRoutes)
}
