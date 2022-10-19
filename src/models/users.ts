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
  isVerified: Boolean,
  userType: {
    type: String,
    enum: ['Admin', 'Staff'],
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

export default mongoose.model('User', users)
