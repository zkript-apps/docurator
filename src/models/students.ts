import mongoose from 'mongoose'
const { Schema } = mongoose

const students = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    default: null,
  },
  studentClaimedAt: Date,
  claimedBy: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
  },
  accessClaimedAt: Date,
  lrn: {
    type: String,
    unique: true,
    minlength: 12,
    maxlength: 12,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  middleName: String,
  statusOfApplicant: {
    type: String,
    enum: ['Freshmen', 'Transferee', 'Returnee', 'Shifter', 'Continuer'],
    required: true,
  },
  schoolName: String,
  dateOfBirth: Date,
  placeOfBirthProvince: String,
  placeOfBirthTown: String,
  placeOfBirthBarangay: String,
  age: Number,
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Prefer not to say', null],
  },
  civilStatus: {
    type: String,
    enum: ['Single', 'Married', 'Divorced', 'Widowed', null],
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: String,
  mothersName: String,
  mothersOccupation: String,
  fathersName: String,
  fathersOccupation: String,
  guardiansName: String,
  guardiansOccupation: String,
  guardiansPhoneNumber: String,
  houseNumber: String,
  street: String,
  barangay: String,
  town: String,
  province: String,
  zipCode: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
  deletedAt: Date,
})

module.exports = mongoose.model('Students', students)
