import mongoose from 'mongoose'
const { Schema } = mongoose

const attendances = new Schema({
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
  deletedAt: Date,
})

module.exports = mongoose.model('Attendances', attendances)
