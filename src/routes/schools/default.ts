import Schools from '../../models/schools'
import {
  UNKNOWN_ERROR_OCCURRED,
  RECORD_EXISTS,
  REQUIRED_VALUE_EMPTY,
  RECORD_DOES_NOT_EXIST,
} from '../../utils/constants'
import isEmpty from 'lodash/isEmpty'

const getAllSchools = async (req, res) => {
  try {
    const schoolsCounts = await Schools.find().countDocuments()
    const getAllSchools = await Schools.find({
      deletedAt: { $exists: false },
    }).sort({ createdAt: -1 })
    res.json({
      items: getAllSchools,
      count: schoolsCounts,
    })
  } catch (err: any) {
    const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED
    res.status(500).json(message)
  }
}

const addSchools = async (req, res) => {
  const {
    schoolName,
    email,
    phoneNumber,
    schoolStreet,
    schoolBarangay,
    schoolMunicipality,
    schoolProvince,
    schoolZipCode,
  } = req.body

  if (schoolName && email && phoneNumber) {
    const newSchools = new Schools({
      schoolName,
      email,
      phoneNumber,
      schoolStreet,
      schoolBarangay,
      schoolMunicipality,
      schoolProvince,
      schoolZipCode,
    })

    try {
      const getExistingSchools = await Schools.find({
        _id: req.params.id,
        deletedAt: { $exists: false },
      })
      if (getExistingSchools.length === 0) {
        const createSchools = await newSchools.save()
        res.json(createSchools)
      } else {
        res.status(400).json('School already exists')
      }
    } catch (err: any) {
      const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED
      res.status(500).json(message)
    }
  } else {
    res.status(400).json(REQUIRED_VALUE_EMPTY)
  }
}

const updateSchools = async (req, res) => {
  const getSchools = await Schools.find({
    _id: req.params.id,
    deletedAt: { $exists: true },
  })
  const condition = req.body
  if (getSchools.length === 0) {
    if (!isEmpty(condition)) {
      try {
        const updateSchools = await Schools.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
            updatedAt: Date.now(),
          },
          { new: true }
        )
        res.json(updateSchools)
      } catch (err: any) {
        const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED
        res.status(500).json(message)
      }
    } else {
      res.status(500).json(RECORD_DOES_NOT_EXIST)
    }
  } else {
    res.status(400).json('School is already deleted')
  }
}

const deleteSchools = async (req, res) => {
  try {
    const getSchools = await Schools.find({
      _id: req.params.id,
      deletedAt: {
        $exists: false,
      },
    })
    if (getSchools.length > 0) {
      const deleteSchools = await Schools.findByIdAndUpdate(req.params.id, {
        $set: {
          deletedAt: Date.now(),
        },
      })
      res.json(deleteSchools)
    } else {
      throw new Error('School is already deleted')
    }
  } catch (err: any) {
    const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED
    res.status(500).json(message)
  }
}

module.exports = {
  getAllSchools,
  addSchools,
  updateSchools,
  deleteSchools,
}
