import GoodMoralCertificates from '../../models/goodMoralCertificates'
import {
  UNKNOWN_ERROR_OCCURRED,
  REQUIRED_VALUE_EMPTY,
} from '../../utils/constants'
import isEmpty from 'lodash/isEmpty'

const getAllGoodMoralCertificates = async (req, res) => {
  try {
    const goodMoralCertificatesCounts =
      await GoodMoralCertificates.find().countDocuments()
    const getAllGoodMoralCertificates = await GoodMoralCertificates.find({
      deletedAt: { $exists: false },
    }).sort({ createdAt: -1 })
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
    firstName,
    lastName,
    middleName,
    lrn,
    schoolName,
    academicYear,
    signedBy,
    position,
    dateGiven,
  } = req.body

  if (
    firstName &&
    lastName &&
    middleName &&
    schoolName &&
    academicYear &&
    signedBy &&
    position &&
    dateGiven
  ) {
    const newGoodMoralCertificate = new GoodMoralCertificates({
      firstName,
      lastName,
      middleName,
      lrn,
      schoolName,
      academicYear,
      signedBy,
      position,
      dateGiven,
    })

    try {
      const createGoodMoralCertificate = await newGoodMoralCertificate.save()
      res.json(createGoodMoralCertificate)
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
