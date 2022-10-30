import mongoose from 'mongoose'
const { Schema } = mongoose

const birthCertificate = new Schema({
  studentId: {
    type: Schema.Types.ObjectId,
    ref: 'Students',
    required: true,
  },
  placeOfBirthProvince: String,
  placeOfBirthMunicipality: String,
  placeOfBirthNameOfHospital: String,
  placeOfBirthIsInsideCityLimits: Boolean,

  mothersAddressProvince: String,
  mothersAddressMunicipality: String,
  mothersAddressHouseNumber: String,
  mothersAddressStreet: Number,
  mothersAddressIsInsideCityLimits: Boolean,
  mothersAddressIsOnAFarm: Boolean,

  childsLastName: String,
  childsFirstName: String,
  childsMiddleName: String,
  childsSex: {
    type: String,
    enum: ['F', 'M'],
  },
  childsTypeOfBirth: {
    type: String,
    enum: ['Single', 'Twin', 'Triplet', 'etc'],
  },
  childsTypeOfBirthEtc: String,
  childsPosition: {
    type: String,
    enum: ['1st', '2nd', '3rd', 'etc'],
  },
  childPositionEtc: String,
  childsDateOfBirth: Date,

  fathersLastName: String,
  fathersFirstName: String,
  fathersMiddleName: String,
  fathersReligion: String,
  fathersNationality: String,
  fathersRace: String,
  fathersAgeTimeOfBirth: Number,
  fathersPlaceOfBirth: String,
  fathersUsualOccupation: String,
  fathersKindOfIndustry: String,

  mothersLastName: String,
  mothersFirstName: String,
  mothersMiddleName: String,
  mothersReligion: String,
  mothersNationality: String,
  mothersRace: String,
  mothersAgeAtTimeOfBirth: Number,
  mothersPlaceOfBirth: String,
  mothersPreviousDeliveries: Number,
  mothersNumberOfAliveChildren: Number,
  mothersNumberOfChildremBornAliveButNowDead: Number,
  mothersNumberOfDeadChildren: Number,

  informantsFullName: String,
  informantsAddress: String,

  mothersMailingAddressHouseNumber: String,
  mothersMailingAddressStreet: Number,
  mothersMailingAddressMunicipality: String,
  mothersMailingAddressProvince: String,

  birthAttendantsFullName: String,
  birthAttendantsAddress: String,
  birthAttendantsDateSigned: String,
  birthAttendantsTitle: {
    type: String,
    enum: ['M.D.', 'Midwife', 'Nurse', 'others'],
  },
  birthAttendantsotherTitle: String,

  receivedByFullName: String,
  receivedByTitleOrPosition: String,
  dateReceived: Date,

  givenNameFromSupplementalReport: String,
  givenNameSupplied: Date,
  lengthOfPregnancy: Number,

  weightAtBirthPound: Number,
  weightAtBirthOunce: Number,

  parentsMarriageDate: Date,
  parentsMarriageMunicipality: String,
  parentsMarriageProvince: String,

  preparedByFullName: String,
  preparedByTitleOrPosition: String,
  datePrepared: Date,

  birthReferenceNumberFirst: String,
  birthReferenceNumberSecond: String,
  birthReferenceNumberLast: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
  deletedAt: Date,
})

module.exports = mongoose.model('BirthCertificate', birthCertificate)
