import mongoose from 'mongoose'
import { mongoURL } from '../config'

mongoose
  .connect(mongoURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => console.log('🚀 MONGODB is running'))
  .catch((err) => console.log('❌ MONGODB error: ' + err))
