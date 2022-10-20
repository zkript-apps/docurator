import { Application } from 'express'
import { API_ROOT } from '../utils/constants'
import Form137Route from './form137'
import StudentsRoute from './students'
import DaysPresentRoutes from './daysPresent'

export default function (app: Application) {
  app.use(`${API_ROOT}/students`, StudentsRoute)
  app.use(`${API_ROOT}/days-present`, DaysPresentRoutes)
  app.use(`${API_ROOT}/form137`, Form137Route)
}
