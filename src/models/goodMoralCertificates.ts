import mongoose from 'mongoose'
const { Schema } = mongoose

const goodMoralCertificates = new Schema({
  lastName: String,
  firstName: String,
  middleName: String,
  lrn: {
    type: String,
    minlength: 12,
    maxlength: 12,
  },
  schoolName: String,
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
  signedBy: String,
  postion: String,
  dateGiven: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
  deletedAt: Date,
})

module.exports = mongoose.model('GoodMoralCertificates', goodMoralCertificates)
