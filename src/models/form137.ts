import mongoose from 'mongoose'
const { Schema } = mongoose

const form137 = new Schema({
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
  schoolsWithAccess: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Students',
      unique: true,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
  deletedAt: Date,
})

module.exports = mongoose.model('Form137', form137)
