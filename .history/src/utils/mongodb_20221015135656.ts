import mongoose from 'mongoose'
import { mongoURL } from '../config'

console.log(mongoURL)
mongoose
  .connect(mongoURL)
  .then(() => console.log('🚀 MONGODB is running'))
  .catch((err) => console.log('❌ MONGODB error: ' + err))
