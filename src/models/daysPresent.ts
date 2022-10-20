import mongoose from 'mongoose'
const { Schema } = mongoose

const daysPresent = new Schema({
  studentId: {
    type: Schema.Types.ObjectId,
    ref: 'Students',
    unique: true,
  },
  lrn: {
    type: String,
    unique: true,
    minlength: 12,
    maxlength: 12,
  },
  attendanceId: {
    type: Schema.Types.ObjectId,
    ref: 'Attendances',
    unique: true,
  },
  june: Number,
  july: Number,
  august: Number,
  september: Number,
  october: Number,
  november: Number,
  december: Number,
  january: Number,
  february: Number,
  march: Number,
  april: Number,
  may: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
  deletedAt: Date,
})

module.exports = mongoose.model('DaysPresent', daysPresent)
