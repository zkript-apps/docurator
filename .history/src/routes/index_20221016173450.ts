import { Application } from 'express'
import { API_ROOT } from '../utils/constants'
import UsersRoute from './users/users'

export default function (app: Application) {
  app.use(`${API_ROOT}/users`, UsersRoute)
}
