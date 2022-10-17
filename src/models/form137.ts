const mongoose = require('mongoose')
const { Schema } = mongoose

const form137 = new Schema({
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
  deletedAt: Date,
})

module.exports = mongoose.model('Form137', form137)
