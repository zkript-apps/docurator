import mongoose from 'mongoose'
const { Schema } = mongoose

const users = new Schema({
  email: String,
  password: String,
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: String,
  lastName: String,
  middleName: String,
  isVerified: Boolean,
  userType: {
    type: String,
    enum: ['Admin', 'Student'],
  },
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: 'Schools',
  },
  lastLoggedIn: Date,
  lastLoggedOut: Date,
  blockedAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
  deletedAt: Date,
})

export default mongoose.model('Users', users)
