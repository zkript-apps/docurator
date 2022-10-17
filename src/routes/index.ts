import { Application } from 'express'
import { API_ROOT } from '../utils/constants'
import AttendancesRoute from './attendances'

export default function (app: Application) {
  app.use(`${API_ROOT}/attendances`, AttendancesRoute)
}
