import mongoose from 'mongoose'
const { Schema } = mongoose

const goodMoralCertificates = new Schema({
  lastName: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
    required: true,
  },
  studentId: {
    type: Schema.Types.ObjectId,
    ref: 'Students',
  },
  lrn: {
    type: String,
    minlength: 12,
    maxlength: 12,
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
