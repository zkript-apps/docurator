import mongoose from 'mongoose'
const { Schema } = mongoose

const form137 = new Schema({
  studentId: {
    type: Schema.Types.ObjectId,
    ref: 'Students',
  },
  lrn: {
    type: String,
    minlength: 12,
    maxlength: 12,
  },
  educationLevel: {
    type: String,
    enum: ['Elementary', 'High School'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
  deletedAt: Date,
})

module.exports = mongoose.model('Form137', form137)
