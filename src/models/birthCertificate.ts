import mongoose from 'mongoose'
const { Schema } = mongoose

const birthCertificate = new Schema({
  studentId: {
    type: Schema.Types.ObjectId,
    ref: 'Students',
  },
  placeOfBirth: {
    province: String,
    municipality: String,
    nameOfHospital: String,
    isInsideCityLimits: Boolean,
  },
  mothersAddress: {
    province: String,
    municipality: String,
    houseNumber: String,
    street: Number,
    isInsideCityLimits: Boolean,
    isOnAFarm: Boolean,
  },
  child: {
    lastName: String,
    firstName: String,
    middleName: String,
    sex: {
      type: String,
      enum: ['F', 'M'],
    },
    typeOfBirth: {
      type: String,
      enum: ['Single', 'Twin', 'Triplet', 'etc'],
    },
    typeOfBirthEtc: String,
    childPosition: {
      type: String,
      enum: ['1st', '2nd', '3rd', 'etc'],
    },
    childPositionEtc: String,
    dateOfBirth: Date,
  },

  father: {
    lastName: String,
    firstName: String,
    middleName: String,
    religion: String,
    nationality: String,
    race: String,
    timeOfBirthAge: Number,
    placeOfBirth: String,
    usualOccupation: String,
    kindOfIndustry: String,
  },
  mother: {
    lastName: String,
    firstName: String,
    middleName: String,
    religion: String,
    nationality: String,
    race: String,
    timeOfBirthAge: Number,
    placeOfBirth: String,
    previousDeliveries: Number,
    numberOfAliveChildren: Number,
    numberOfDeadChildren: Number,
  },
  informant: {
    fullName: String,
    address: String,
  },
  mothersMailingAddress: {
    houseNumber: String,
    street: Number,
    municipality: String,
    province: String,
  },
  birthAttendant: {
    fullName: String,
    address: String,
    dateSigned: String,
    titleOfAttendant: {
      type: String,
      enum: ['M.D.', 'Midwife', 'Nurse', 'others'],
    },
    otherTitle: String,
  },
  receivedAtLocalCivilRegistrarBy: {
    fulleName: String,
    titleOrPosition: String,
    date: Date,
  },
  givenNameFromSupplementalReport: String,
  givenNameSupplied: Date,
  lengthOfPregnancy: Number,
  weightAtBirth: {
    pound: Number,
    ounce: Number,
  },
  parentsMarriage: {
    date: Date,
    municipality: String,
    province: String,
  },
  preparedBy: {
    fullName: String,
    titleOrPosition: String,
    date: Date,
  },
  birthReferenceNumber: {
    first: String,
    second: String,
    last: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
  deletedAt: Date,
})

module.exports = mongoose.model('BirthCertificate', birthCertificate)
