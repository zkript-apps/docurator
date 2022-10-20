import mongoose from 'mongoose'
const { Schema } = mongoose

const schoolDays = new Schema({
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
  academicYear: {
    from: String,
    to: String,
    required: true,
  },
  gradeLevel: {
    type: String,
    enum: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    required: true,
  },
  daysOfSchool: {
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
  },
  daysPresent: {
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
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
  deletedAt: Date,
})

module.exports = mongoose.model('SchoolDays', schoolDays)
