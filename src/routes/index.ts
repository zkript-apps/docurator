import { Application } from 'express'
import { API_ROOT } from '../utils/constants'
import UsersRoute from './users'
import DaysOfSchoolRoutes from './daysOfSchool'
import EligibilityRoutes from './eligibility'
import AttendancesRoute from './attendances'
import SubjectRecords from './subjectRecords'
import Form137Route from './form137'
import StudentsRoute from './students'
import DaysPresentRoutes from './daysPresent'
import BirthCertificate from './birthCertificate'

export default function (app: Application) {
  app.use(`${API_ROOT}/users`, UsersRoute)
  app.use(`${API_ROOT}/days-of-school`, DaysOfSchoolRoutes)
  app.use(`${API_ROOT}/eligibility`, EligibilityRoutes)
  app.use(`${API_ROOT}/attendances`, AttendancesRoute)
  app.use(`${API_ROOT}/subjectRecords`, SubjectRecords)
  app.use(`${API_ROOT}/students`, StudentsRoute)
  app.use(`${API_ROOT}/days-present`, DaysPresentRoutes)
  app.use(`${API_ROOT}/form137`, Form137Route)
  app.use(`${API_ROOT}/birth-certificates`, BirthCertificate)
}
