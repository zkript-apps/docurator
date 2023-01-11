import Form138 from '../../models/form138'
import Attendances from '../../models/attendances'
import DaysOfSchool from '../../models/daysOfSchool'
import DaysPresent from '../../models/daysPresent'
import Students from '../../models/students'
import Eligibility from '../../models/eligibility'
import {
  RECORD_EXISTS,
  REQUIRED_VALUE_EMPTY,
  UNKNOWN_ERROR_OCCURRED,
} from '../../utils/constants'

const createForm138WithAttendance = async (req, res) => {
  const {
    lrn,
    academicYear: { from, to },
    isFirstGradingSigned,
    isSecondGradingSigned,
    isThirdGradingSigned,
    isFourthGradingSigned,

    subjectRecords,
    teacher,
    principal,
    gradeLevel,
    promotedTo,

    certificateOfTranferDate,
    certificateOfTranferTeacher,
    certificateOfTranferPrincipal,

    CancellationOfEligibilityAdmittedIn,
    CancellationOfEligibilityGrade,
    CancellationOfEligibilityDate,

    //attendance

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

    //eligibility

    isEligibleForNextLevel,
  } = req.body

  if (lrn && teacher && principal && from && to && gradeLevel) {
    const newAttendance = new Attendances({
      lrn,
      academicYear: { from, to },
      gradeLevel,
    })

    try {
      //Create attendance
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
            const getExistingLrn = await Students.findOne({
              lrn,
              deletedAt: { $exists: false },
            })
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

              //Create form138
              const newForm138 = new Form138({
                studentId: getExistingLrn._id,
                lrn,
                academicYear: { from, to },

                isFirstGradingSigned,
                isSecondGradingSigned,
                isThirdGradingSigned,
                isFourthGradingSigned,

                subjectRecords,
                attendanceId: createAttendance?._id?.toString(),
                teacher,
                principal,
                gradeLevel,
                promotedTo,

                certificateOfTranferDate,
                certificateOfTranferTeacher,
                certificateOfTranferPrincipal,

                CancellationOfEligibilityAdmittedIn,
                CancellationOfEligibilityGrade,
                CancellationOfEligibilityDate,
              })
              const getExistingForm138 = await Form138.find({
                _id: req.params.id,
                deletedAt: { $exists: false },
              })
              if (getExistingForm138.length === 0) {
                const createForm138 = await newForm138.save()
              } else {
                res.status(400).json('Form 138/Report Card already exists')
              }

              //create eligiblity
              const newEligibility = new Eligibility({
                studentId: getExistingLrn._id,
                lrn,
                isEligibleForNextLevel,
                gradeLevel,
                academicYear: { from, to },
              })
              const getEligibility = await Eligibility.find({
                $and: [{ isEligibleForNextLevel }, { gradeLevel }],
                deletedAt: { $exists: false },
              })
              if (getEligibility.length === 0) {
                const createEligibility = await newEligibility.save()
              } else {
                res.status(400).json(RECORD_EXISTS)
              }
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
  createForm138WithAttendance,
}
