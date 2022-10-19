import mongoose from 'mongoose'
const { Schema } = mongoose

const eligibility = new Schema({
  studentId: {
    type: Schema.Types.ObjectId,
    ref: 'Students',
    unique: true,
  },
  schoolStudentId: {
    type: String,
    required: true,
    unique: true,
  },
  isEligibleForNextLevel: Boolean,
  gradeLevel: {
    type: String,
    enum: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
  deletedAt: Date,
})

module.exports = mongoose.model('Eligibility', eligibility)
