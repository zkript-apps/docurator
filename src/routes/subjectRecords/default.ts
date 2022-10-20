import SubjectRecords from '../../models/subjectRecords'
import {
  UNKNOWN_ERROR_OCCURRED,
  RECORD_EXISTS,
  REQUIRED_VALUE_EMPTY,
  RECORD_DOES_NOT_EXIST,
  RECORD_ALREADY_DELETED,
} from '../../utils/constants'
import isEmpty from 'lodash/isEmpty'

const getAllSubjectRecords = async (req, res) => {
  try {
    const subjectRecordCounts = await SubjectRecords.find().countDocuments()
    const getAllSubjectRecords = await SubjectRecords.find().sort({
      createdAt: -1,
    })
    res.json({
      items: getAllSubjectRecords,
      count: subjectRecordCounts,
    })
  } catch (err: any) {
    const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED
    res.status(500).json(message)
  }
}

const addSubjectRecords = async (req, res) => {
  const {
    studentId,
    subjectName,
    subjectCode,
    firstGrading,
    secondGrading,
    thirdGrading,
    fourthGrading,
    finalGrade,
    remarks,
    gradeLevel,
    academicYear,
  } = req.body

  if (studentId && subjectName && gradeLevel) {
    const newSubjectRecord = new SubjectRecords({
      studentId,
      subjectName,
      subjectCode,
      firstGrading,
      secondGrading,
      thirdGrading,
      fourthGrading,
      finalGrade,
      remarks,
      gradeLevel,
      academicYear,
    })

    try {
      const getExistingSubjectRecords = await SubjectRecords.find({
        $and: [{ subjectName }, { gradeLevel }],
        deletedAt: { $exists: false },
      })
      if (getExistingSubjectRecords.length === 0) {
        const createSubjectRecord = await newSubjectRecord.save()
        res.json(createSubjectRecord)
      } else {
        res.status(400).json('Subject record already exists')
      }
    } catch (err: any) {
      const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED
      res.status(500).json(message)
    }
  } else {
    res.status(400).json(REQUIRED_VALUE_EMPTY)
  }
}

const updateSubjectRecord = async (req, res) => {
  const getSubjectRecords = await SubjectRecords.find({
    _id: req.params.id,
    deletedAt: { $exists: true },
  })
  const condition = req.body
  if (getSubjectRecords.length === 0) {
    if (!isEmpty(condition)) {
      try {
        const updateSubjectRecord = await SubjectRecords.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
            updatedAt: Date.now(),
          },
          { new: true }
        )
        res.json(updateSubjectRecord)
      } catch (err: any) {
        const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED
        res.status(500).json(message)
      }
    } else {
      res.status(500).json(RECORD_DOES_NOT_EXIST)
    }
  } else {
    res.status(400).json(RECORD_ALREADY_DELETED)
  }
}

const deleteSubjectRecord = async (req, res) => {
  try {
    const getSubjectRecords = await SubjectRecords.find({
      _id: req.params.id,
      deletedAt: {
        $exists: false,
      },
    })
    if (getSubjectRecords.length > 0) {
      const deleteSubjectRecord = await SubjectRecords.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            deletedAt: Date.now(),
          },
        }
      )
      res.json(deleteSubjectRecord)
    } else {
      throw new Error(RECORD_ALREADY_DELETED)
    }
  } catch (err: any) {
    const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED
    res.status(500).json(message)
  }
}

module.exports = {
  getAllSubjectRecords,
  addSubjectRecords,
  updateSubjectRecord,
  deleteSubjectRecord,
}
