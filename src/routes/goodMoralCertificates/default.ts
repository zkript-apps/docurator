import GoodMoralCertificates from '../../models/goodMoralCertificates'
import Students from '../../models/students'
import {
  UNKNOWN_ERROR_OCCURRED,
  REQUIRED_VALUE_EMPTY,
} from '../../utils/constants'
import isEmpty from 'lodash/isEmpty'

const getAllGoodMoralCertificates = async (req, res) => {
  try {
    const goodMoralCertificatesCounts = await GoodMoralCertificates.find({
      deletedAt: { $exists: false },
    }).countDocuments()
    const getAllGoodMoralCertificates = await GoodMoralCertificates.find({
      deletedAt: { $exists: false },
    })
      .sort({ createdAt: -1 })
      .populate([
        {
          path: 'studentId',
          model: 'Students',
          populate: {
            path: 'userId',
            model: 'Users',
          },
        },
      ])
    res.json({
      items: getAllGoodMoralCertificates,
      count: goodMoralCertificatesCounts,
    })
  } catch (err: any) {
    const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED
    res.status(500).json(message)
  }
}

const addGoodMoralCertificates = async (req, res) => {
  const {
    lrn,
    lastName,
    firstName,
    middleName,
    schoolName,
    academicYear,
    signedBy,
    position,
    dateGiven,
    gradeLevel,
  } = req.body

  if (
    lastName &&
    firstName &&
    middleName &&
    schoolName &&
    academicYear &&
    signedBy &&
    position &&
    dateGiven &&
    gradeLevel
  ) {
    const getExistingStudent = await Students.findOne({
      lrn,
      deletedAt: { $exists: false },
    })
    const newGoodMoralCertificate = new GoodMoralCertificates({
      studentId: getExistingStudent._id,
      lrn,
      lastName,
      firstName,
      middleName,
      schoolName,
      academicYear,
      signedBy,
      position,
      dateGiven,
      gradeLevel,
    })

    try {
      if (getExistingStudent.length !== 0) {
        const createGoodMoralCertificate = await newGoodMoralCertificate.save()
        res.json(createGoodMoralCertificate)
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

const updateGoodMoralCertificate = async (req, res) => {
  const getGoodMoralCertificate = await GoodMoralCertificates.find({
    _id: req.params.id,
    deletedAt: { $exists: true },
  })
  const condition = req.body
  if (getGoodMoralCertificate.length === 0) {
    if (!isEmpty(condition)) {
      try {
        const updateGoodMoralCertificate =
          await GoodMoralCertificates.findByIdAndUpdate(
            req.params.id,
            {
              $set: req.body,
              updatedAt: Date.now(),
            },
            { new: true }
          )
        res.json(updateGoodMoralCertificate)
      } catch (err: any) {
        const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED
        res.status(500).json(message)
      }
    } else {
      res.status(500).json('Good Moral Certificate cannot be found')
    }
  } else {
    res.status(400).json('Good Moral Certificate does not exist')
  }
}

const deleteGoodMoralCertificate = async (req, res) => {
  try {
    const getGoodMoralCertificate = await GoodMoralCertificates.find({
      _id: req.params.id,
      deletedAt: {
        $exists: false,
      },
    })
    if (getGoodMoralCertificate.length > 0) {
      const deleteGoodMoralCertificate =
        await GoodMoralCertificates.findByIdAndUpdate(req.params.id, {
          $set: {
            deletedAt: Date.now(),
          },
        })
      res.json(deleteGoodMoralCertificate)
    } else {
      throw new Error('Good Moral Certficate is already deleted')
    }
  } catch (err: any) {
    const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED
    res.status(500).json(message)
  }
}

module.exports = {
  getAllGoodMoralCertificates,
  addGoodMoralCertificates,
  updateGoodMoralCertificate,
  deleteGoodMoralCertificate,
}
