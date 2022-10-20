import { Application } from 'express'
import { API_ROOT } from '../utils/constants'
import SchoolDaysRoutes from './schoolDays'

export default function (app: Application) {
  app.use(`${API_ROOT}/schooldays`, SchoolDaysRoutes)
}
