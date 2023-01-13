import mongoose from 'mongoose'
const { Schema } = mongoose

const daysOfSchool = new Schema({
  studentId: {
    type: Schema.Types.ObjectId,
    ref: 'Students',
  },
  lrn: {
    type: String,
    minlength: 12,
    maxlength: 12,
  },
  attendanceId: {
    type: Schema.Types.ObjectId,
    ref: 'Attendances',
    unique: true,
  },
  daysOfSchoolJune: Number,
  daysOfSchoolJuly: Number,
  daysOfSchoolAugust: Number,
  daysOfSchoolSeptember: Number,
  daysOfSchoolOctober: Number,
  daysOfSchoolNovember: Number,
  daysOfSchoolDecember: Number,
  daysOfSchoolJanuary: Number,
  daysOfSchoolFebruary: Number,
  daysOfSchoolMarch: Number,
  daysOfSchoolApril: Number,
  daysOfSchoolMay: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
  deletedAt: Date,
})

module.exports = mongoose.model('DaysOfSchool', daysOfSchool)
