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
  schoolName: String,
  isVerified: Boolean,
  userType: {
    type: String,
    enum: ['Admin', 'User'],
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
