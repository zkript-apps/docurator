import mongoose from 'mongoose'
const { Schema } = mongoose

const claimAccess = new Schema({
  studentId: {
    type: Schema.Types.ObjectId,
    ref: 'Students',
  },
  lrn: String,
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
  },
  accessClaimedAt: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
  deletedAt: Date,
})

module.exports = mongoose.model('ClaimAccess', claimAccess)
