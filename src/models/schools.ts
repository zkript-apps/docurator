import mongoose from 'mongoose'
const { Schema } = mongoose

const schools = new Schema({
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  schoolStreet: String,
  schoolBarangay: String,
  schoolMunicipality: String,
  schoolProvince: String,
  schoolZipCode: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
  deletedAt: Date,
})

export default mongoose.model('Schools', schools)
