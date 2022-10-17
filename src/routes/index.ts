import { Application } from 'express'
import { API_ROOT } from '../utils/constants'
import Form137Route from './form137'

export default function (app: Application) {
  app.use(`${API_ROOT}/form137`, Form137Route)
}
