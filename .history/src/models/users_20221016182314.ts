import mongoose from 'mongoose'
const { Schema } = mongoose

const users = new Schema({
  email: String,
  password: String,
  userType: {
    type: String,
    enum: ['Admin', 'User'],
  },
  phoneNumber: {
    type: String,
    required: true,
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
