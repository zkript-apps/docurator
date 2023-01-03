import mongoose from 'mongoose'
const { Schema } = mongoose

const daysPresent = new Schema({
  studentId: {
    type: Schema.Types.ObjectId,
    ref: 'Students',
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
  daysPresentJune: Number,
  daysPresentJuly: Number,
  daysPresentAugust: Number,
  daysPresentSeptember: Number,
  daysPresentOctober: Number,
  daysPresentNovember: Number,
  daysPresentDecember: Number,
  daysPresentJanuary: Number,
  daysPresentFebruary: Number,
  daysPresentMarch: Number,
  daysPresentApril: Number,
  mdaysPresentMay: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
  deletedAt: Date,
})

module.exports = mongoose.model('DaysPresent', daysPresent)
