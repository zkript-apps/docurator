import { Application } from 'express'
import { API_ROOT } from '../utils/constants'
import StudentsRoute from './students'

export default function (app: Application) {
  app.use(`${API_ROOT}/students`, StudentsRoute)
}
