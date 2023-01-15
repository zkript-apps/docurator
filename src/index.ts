import express, { Application } from 'express'
import cors from 'cors'
import { port, origins } from './config'
import routes from './routes'
import './utils/mongodb'

const app: Application = express()
app.use(express.json())
app.use(cors())
routes(app)
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  next()
})

app.listen(port, () => {
  console.log(`🚀 SERVER is running at ${port}`)
})
