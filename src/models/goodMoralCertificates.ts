import mongoose from 'mongoose'
const { Schema } = mongoose

const goodMoralCertificates = new Schema({
  studentId: {
    type: Schema.Types.ObjectId,
    ref: 'Students',
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
  lrn: {
    type: String,
    minlength: 12,
    maxlength: 12,
  },
  gradeLevel: {
    type: String,
    enum: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    required: true,
  },
  schoolName: {
    type: String,
    required: true,
  },
  academicYear: {
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
  },
  signedBy: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  dateGiven: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
  deletedAt: Date,
})

module.exports = mongoose.model('GoodMoralCertificates', goodMoralCertificates)
