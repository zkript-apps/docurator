import mongoose from 'mongoose'
const { Schema } = mongoose

const students = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    unique: true,
  },
  lrn: {
    type: String,
    unique: true,
    minlength: 12,
    maxlength: 12,
    required: true,
  },
  statusOfApplicant: {
    type: String,
    enum: ['Freshmen', 'Transferee', 'Returnee', 'Shifter', 'Continuer'],
    required: true,
  },
  schoolName: String,
  dateOfBirth: Date,
  age: Number,
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Prefer not to say'],
  },
  civilStatus: {
    type: String,
    enum: ['Single', 'Married', 'Divorced', 'Widowed'],
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  mothersName: String,
  mothersOccupation: String,
  fathersName: String,
  fathersOccupation: String,
  guardiansName: String,
  guardiansMobileNumber: String,
  houseNumber: String,
  street: String,
  barangay: String,
  municipality: String,
  province: String,
  zipCode: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
  deletedAt: Date,
})

module.exports = mongoose.model('Students', students)
