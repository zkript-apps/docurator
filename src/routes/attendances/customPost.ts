import Attendances from '../../models/attendances'
import DaysOfSchool from '../../models/daysOfSchool'
import DaysPresent from '../../models/daysPresent'
import Students from '../../models/students'
import {
  UNKNOWN_ERROR_OCCURRED,
  REQUIRED_VALUE_EMPTY,
} from '../../utils/constants'

const createAttendanceRecord = async (req, res) => {
  const {
    lrn,
    academicYear: { from, to },
    gradeLevel,
    //days of school
    daysOfSchoolJune,
    daysOfSchoolJuly,
    daysOfSchoolAugust,
    daysOfSchoolSeptember,
    daysOfSchoolOctober,
    daysOfSchoolNovember,
    daysOfSchoolDecember,
    daysOfSchoolJanuary,
    daysOfSchoolFebruary,
    daysOfSchoolMarch,
    daysOfSchoolApril,
    daysOfSchoolMay,
    //days present
    daysPresentJune,
    daysPresentJuly,
    daysPresentAugust,
    daysPresentSeptember,
    daysPresentOctober,
    daysPresentNovember,
    daysPresentDecember,
    daysPresentJanuary,
    daysPresentFebruary,
    daysPresentMarch,
    daysPresentApril,
    daysPresentMay,
  } = req.body

  if (lrn && from && to && gradeLevel) {
    const newAttendance = new Attendances({
      lrn,
      academicYear: { from, to },
      gradeLevel,
    })
    try {
      const getExistingAttendances = await Attendances.find({
        $and: [{ lrn: req.body.lrn }, { gradeLevel: req.body.gradeLevel }],
        deletedAt: { $exists: false },
      })
      const getExistingStudent = await Students.find({
        lrn,
        deletedAt: { $exists: false },
      })
      if (getExistingStudent.length !== 0) {
        if (getExistingAttendances.length === 0) {
          const createAttendance = await newAttendance.save()
          //create days of school
          const newDaysOfSchool = new DaysOfSchool({
            lrn,
            attendanceId: createAttendance?._id?.toString(),
            daysOfSchoolJune,
            daysOfSchoolJuly,
            daysOfSchoolAugust,
            daysOfSchoolSeptember,
            daysOfSchoolOctober,
            daysOfSchoolNovember,
            daysOfSchoolDecember,
            daysOfSchoolJanuary,
            daysOfSchoolFebruary,
            daysOfSchoolMarch,
            daysOfSchoolApril,
            daysOfSchoolMay,
          })
          const newDaysPresent = new DaysPresent({
            lrn,
            attendanceId: createAttendance?._id?.toString(),
            daysPresentJune,
            daysPresentJuly,
            daysPresentAugust,
            daysPresentSeptember,
            daysPresentOctober,
            daysPresentNovember,
            daysPresentDecember,
            daysPresentJanuary,
            daysPresentFebruary,
            daysPresentMarch,
            daysPresentApril,
            daysPresentMay,
          })
          try {
            const getExistingDaysOfSchool = await DaysOfSchool.find({
              $and: [
                { lrn },
                { attendanceId: createAttendance?._id?.toString() },
              ],
              deletedAt: { $exists: false },
            })
            const getExistingDaysPresent = await DaysPresent.find({
              $and: [
                { lrn },
                { attendanceId: createAttendance?._id?.toString() },
              ],
              deletedAt: { $exists: false },
            })
            if (
              getExistingDaysOfSchool.length === 0 &&
              getExistingDaysPresent.length === 0
            ) {
              const createDaysOfSchool = await newDaysOfSchool.save()
              const createDaysPresent = await newDaysPresent.save()
              res.json({
                Attendance: createAttendance,
                DaysOfSchool: createDaysOfSchool,
                DaysPresent: createDaysPresent,
              })
            } else {
              res
                .status(400)
                .json('Days of School and Days present already exists')
            }
          } catch (err: any) {
            const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED
            res.status(500).json(message)
          }
        } else {
          res.status(400).json('Attendance already exists')
        }
      } else {
        res.status(400).json('LRN does not exist')
      }
    } catch (err: any) {
      const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED
      res.status(500).json(message)
    }
  } else {
    res.status(400).json(REQUIRED_VALUE_EMPTY)
  }
}

module.exports = {
  createAttendanceRecord,
}
