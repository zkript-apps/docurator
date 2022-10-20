import { Application } from 'express'
import { API_ROOT } from '../utils/constants'
import StudentsRoute from './students'
import DaysPresentRoutes from './daysPresent'

export default function (app: Application) {
  app.use(`${API_ROOT}/students`, StudentsRoute)
  app.use(`${API_ROOT}/days-present`, DaysPresentRoutes)
}
