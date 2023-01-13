import mongoose from 'mongoose'
const { Schema } = mongoose

const schools = new Schema({
  schoolId: String,
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
  curricularOffers: {
    type: String,
    enum: ['Elementary', 'Secondary', 'Elementary to Secondary'],
  },
  schoolClassification: {
    type: String,
    enum: ['Private', 'Public'],
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
