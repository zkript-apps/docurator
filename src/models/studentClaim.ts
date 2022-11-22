import mongoose from 'mongoose'
const { Schema } = mongoose

const studentsClaimRecords = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
  },
  form137Id: {
    type: Schema.Types.ObjectId,
    ref: 'Form137',
  },
  claimedAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
  deletedAt: Date,
})

export default mongoose.model('StudentsClaimRecords', studentsClaimRecords)
