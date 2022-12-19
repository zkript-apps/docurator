import Form138 from '../../models/form138'
import {
  UNKNOWN_ERROR_OCCURRED,
  REQUIRED_VALUE_EMPTY,
  RECORD_DOES_NOT_EXIST,
} from '../../utils/constants'
import isEmpty from 'lodash/isEmpty'

const getAllForm138 = async (req, res) => {
  try {
    const form138Counts = await Form138.find({
      deletedAt: { $exists: false },
    }).countDocuments()
    const getAllForm138 = await Form138.find({
      deletedAt: { $exists: false },
    }).sort({ createdAt: -1 })
    res.json({
      items: getAllForm138,
      count: form138Counts,
    })
  } catch (err: any) {
    const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED
    res.status(500).json(message)
  }
}

const addForm138 = async (req, res) => {
  const {
    studentId,
    lrn,
    academicYear,
    narrativeReportFirstGrading,
    narrativeReportSecondGrading,
    narrativeReportThirdGrading,
    narrativeReportFourthGrading,

    parentsSignatureFirstGrading,
    parentsSignatureSecondGrading,
    parentsSignatureThirdGrading,
    parentsSignatureFourthGrading,

    subjectRecords,
    attendanceId,
    teacher,
    principal,
    promotedTo,

    certificateOfTranferDate,
    certificateOfTranferTeacher,
    certificateOfTranferPrincipal,

    CancellationOfEligibilityAdmittedIn,
    CancellationOfEligibilityGrade,
    CancellationOfEligibilityDate,
  } = req.body

  if (lrn && academicYear && attendanceId && teacher && principal) {
    const newForm138 = new Form138({
      studentId,
      lrn,
      academicYear,
      narrativeReportFirstGrading,
      narrativeReportSecondGrading,
      narrativeReportThirdGrading,
      narrativeReportFourthGrading,

      parentsSignatureFirstGrading,
      parentsSignatureSecondGrading,
      parentsSignatureThirdGrading,
      parentsSignatureFourthGrading,

      subjectRecords,
      attendanceId,
      teacher,
      principal,
      promotedTo,

      certificateOfTranferDate,
      certificateOfTranferTeacher,
      certificateOfTranferPrincipal,

      CancellationOfEligibilityAdmittedIn,
      CancellationOfEligibilityGrade,
      CancellationOfEligibilityDate,
    })
    try {
      const getExistingForm138 = await Form138.find({
        _id: req.params.id,
        deletedAt: { $exists: false },
      })
      if (getExistingForm138.length === 0) {
        const createForm138 = await newForm138.save()
        res.json(createForm138)
      } else {
        res.status(400).json('Form 138/Report Card already exists')
      }
    } catch (err: any) {
      const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED
      res.status(500).json(message)
    }
  } else {
    res.status(400).json(REQUIRED_VALUE_EMPTY)
  }
}

const updateForm138 = async (req, res) => {
  const getForm138 = await Form138.find({
    _id: req.params.id,
    deletedAt: { $exists: true },
  })
  const condition = req.body
  if (getForm138.length === 0) {
    if (!isEmpty(condition)) {
      try {
        const updateForm138 = await Form138.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
            updatedAt: Date.now(),
          },
          { new: true }
        )
        res.json(updateForm138)
      } catch (err: any) {
        const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED
        res.status(500).json(message)
      }
    } else {
      res.status(500).json(RECORD_DOES_NOT_EXIST)
    }
  } else {
    res.status(400).json('Form138 is already deleted')
  }
}

const deleteForm138 = async (req, res) => {
  try {
    const getForm138 = await Form138.find({
      _id: req.params.id,
      deletedAt: {
        $exists: false,
      },
    })
    if (getForm138.length > 0) {
      const deleteForm138 = await Form138.findByIdAndUpdate(req.params.id, {
        $set: {
          deletedAt: Date.now(),
        },
      })
      res.json(deleteForm138)
    } else {
      throw new Error('Form138 is already deleted')
    }
  } catch (err: any) {
    const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED
    res.status(500).json(message)
  }
}

module.exports = {
  getAllForm138,
  addForm138,
  updateForm138,
  deleteForm138,
}
