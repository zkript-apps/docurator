import BirthCertificates from '../../models/birthCertificates'
import {
  UNKNOWN_ERROR_OCCURRED,
  RECORD_EXISTS,
  REQUIRED_VALUE_EMPTY,
  RECORD_DOES_NOT_EXIST,
} from '../../utils/constants'
import isEmpty from 'lodash/isEmpty'

const getAllBirthCertificates = async (req, res) => {
  try {
    const birthCertificatesCounts =
      await BirthCertificates.find().countDocuments()
    const getAllBirthCertificate = await BirthCertificates.find({
      deletedAt: { $exists: false },
    })
      .sort({ createdAt: -1 })
      .populate([
        {
          path: 'studentId',
          model: 'Students',
        },
      ])
    res.json({
      items: getAllBirthCertificate,
      count: birthCertificatesCounts,
    })
  } catch (err: any) {
    const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED
    res.status(500).json(message)
  }
}

const addBirthCertificate = async (req, res) => {
  const {
    studentId,
    placeOfBirthProvince,
    placeOfBirthMunicipality,
    placeOfBirthNameOfHospital,
    placeOfBirthIsInsideCityLimits,

    mothersAddressProvince,
    mothersAddressMunicipality,
    mothersAddressHouseNumber,
    mothersAddressStreet,
    mothersAddressIsInsideCityLimits,
    mothersAddressIsOnAFarm,

    childsLastName,
    childsFirstName,
    childsMiddleName,
    childsSex,
    childsTypeOfBirth,
    childsTypeOfBirthEtc,
    childsPosition,
    childPositionEtc,
    childsDateOfBirth,

    fathersLastName,
    fathersFirstName,
    fathersMiddleName,
    fathersReligion,
    fathersNationality,
    fathersRace,
    fathersAgeTimeOfBirth,
    fathersPlaceOfBirth,
    fathersUsualOccupation,
    fathersKindOfIndustry,

    mothersLastName,
    mothersFirstName,
    mothersMiddleName,
    mothersReligion,
    mothersNationality,
    mothersRace,
    mothersAgeAtTimeOfBirth,
    mothersPlaceOfBirth,
    mothersPreviousDeliveries,
    mothersNumberOfAliveChildren,
    mothersNumberOfChildremBornAliveButNowDead,
    mothersNumberOfDeadChildren,

    informantsFullName,
    informantsAddress,

    mothersMailingAddressHouseNumber,
    mothersMailingAddressStreet,
    mothersMailingAddressMunicipality,
    mothersMailingAddressProvince,

    birthAttendantsFullName,
    birthAttendantsAddress,
    birthAttendantsDateSigned,
    birthAttendantsTitle,
    birthAttendantsotherTitle,

    receivedByFullName,
    receivedByTitleOrPosition,
    dateReceived,

    givenNameFromSupplementalReport,
    givenNameSupplied,
    lengthOfPregnancy,

    weightAtBirthPound,
    weightAtBirthOunce,

    parentsMarriageDate,
    parentsMarriageMunicipality,
    parentsMarriageProvince,

    preparedByFullName,
    preparedByTitleOrPosition,
    datePrepared,

    birthReferenceNumberFirst,
    birthReferenceNumberSecond,
    birthReferenceNumberLast,
  } = req.body

  if (studentId) {
    const newBirthCertificate = new BirthCertificates({
      studentId,
      placeOfBirthProvince,
      placeOfBirthMunicipality,
      placeOfBirthNameOfHospital,
      placeOfBirthIsInsideCityLimits,

      mothersAddressProvince,
      mothersAddressMunicipality,
      mothersAddressHouseNumber,
      mothersAddressStreet,
      mothersAddressIsInsideCityLimits,
      mothersAddressIsOnAFarm,

      childsLastName,
      childsFirstName,
      childsMiddleName,
      childsSex,
      childsTypeOfBirth,
      childsTypeOfBirthEtc,
      childsPosition,
      childPositionEtc,
      childsDateOfBirth,

      fathersLastName,
      fathersFirstName,
      fathersMiddleName,
      fathersReligion,
      fathersNationality,
      fathersRace,
      fathersAgeTimeOfBirth,
      fathersPlaceOfBirth,
      fathersUsualOccupation,
      fathersKindOfIndustry,

      mothersLastName,
      mothersFirstName,
      mothersMiddleName,
      mothersReligion,
      mothersNationality,
      mothersRace,
      mothersAgeAtTimeOfBirth,
      mothersPlaceOfBirth,
      mothersPreviousDeliveries,
      mothersNumberOfAliveChildren,
      mothersNumberOfChildremBornAliveButNowDead,
      mothersNumberOfDeadChildren,

      informantsFullName,
      informantsAddress,

      mothersMailingAddressHouseNumber,
      mothersMailingAddressStreet,
      mothersMailingAddressMunicipality,
      mothersMailingAddressProvince,

      birthAttendantsFullName,
      birthAttendantsAddress,
      birthAttendantsDateSigned,
      birthAttendantsTitle,
      birthAttendantsotherTitle,

      receivedByFullName,
      receivedByTitleOrPosition,
      dateReceived,

      givenNameFromSupplementalReport,
      givenNameSupplied,
      lengthOfPregnancy,

      weightAtBirthPound,
      weightAtBirthOunce,

      parentsMarriageDate,
      parentsMarriageMunicipality,
      parentsMarriageProvince,

      preparedByFullName,
      preparedByTitleOrPosition,
      datePrepared,

      birthReferenceNumberFirst,
      birthReferenceNumberSecond,
      birthReferenceNumberLast,
    })

    try {
      const getExistingBirthCertificate = await BirthCertificates.find({
        studentId,
        deletedAt: { $exists: false },
      })
      if (getExistingBirthCertificate.length === 0) {
        const createBirthCertificate = await newBirthCertificate.save()
        res.json(createBirthCertificate)
      } else {
        res.status(400).json(RECORD_EXISTS)
      }
    } catch (err: any) {
      const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED
      res.status(500).json(message)
    }
  } else {
    res.status(400).json(REQUIRED_VALUE_EMPTY)
  }
}

const updateBirthCertificate = async (req, res) => {
  const getBirthCertificate = await BirthCertificates.find({
    _id: req.params.id,
    deletedAt: { $exists: true },
  })
  const condition = req.body
  if (getBirthCertificate.length === 0) {
    if (!isEmpty(condition)) {
      try {
        const updateBirthCertificate =
          await BirthCertificates.findByIdAndUpdate(
            req.params.id,
            {
              $set: req.body,
              updatedAt: Date.now(),
            },
            { new: true }
          )
        res.json(updateBirthCertificate)
      } catch (err: any) {
        const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED
        res.status(500).json(message)
      }
    } else {
      res.status(500).json(RECORD_DOES_NOT_EXIST)
    }
  } else {
    res.status(400).json('Record is already deleted')
  }
}

const deleteBirthCertificate = async (req, res) => {
  try {
    const getBirthCertificate = await BirthCertificates.find({
      _id: req.params.id,
      deletedAt: {
        $exists: false,
      },
    })
    if (getBirthCertificate.length > 0) {
      const deleteBirthCertificate = await BirthCertificates.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            deletedAt: Date.now(),
          },
        }
      )
      res.json(deleteBirthCertificate)
    } else {
      throw new Error('Record is already deleted')
    }
  } catch (err: any) {
    const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED
    res.status(500).json(message)
  }
}

module.exports = {
  getAllBirthCertificates,
  addBirthCertificate,
  updateBirthCertificate,
  deleteBirthCertificate,
}
