import { Application } from 'express'
import { API_ROOT } from '../utils/constants'
import SubjectRecords from './subjectRecords'

export default function (app: Application) {
  app.use(`${API_ROOT}/subjectRecords`, SubjectRecords)
}
