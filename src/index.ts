import express, { Application } from 'express'
import { port, origins } from './config'
import routes from './routes'
import './utils/mongodb'

const app: Application = express()
app.use(express.json())
routes(app)

app.listen(port, () => {
  console.log(`🚀 SERVER is running at ${port}`)
})
