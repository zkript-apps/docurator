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
      schoolId: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        unique: true,
      },
      accessAdded: {
        type: Date,
        default: Date.now,
      },
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
