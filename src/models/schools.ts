import mongoose from 'mongoose'
const { Schema } = mongoose

const schools = new Schema({
  schoolName: {
    type: String,
    required: true,
  },
  schoolEmail: {
    type: String,
    required: true,
  },
  schoolPhoneNumber: {
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
