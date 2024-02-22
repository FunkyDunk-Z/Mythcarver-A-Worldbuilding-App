import 'dotenv/config'
import { connect } from 'mongoose'
import env from './util/validateEnv'
import app from './app'

const database = env.DATABASE.replace('<PASSWORD>', env.DATABASE_PASSWORD)

const connectToDatabase = async function () {
  try {
    await connect(database)
    console.log('Connected to database')
  } catch (error) {
    console.error(error)
  }
}

const port = env.PORT

const startServer = async function () {
  try {
    await connectToDatabase()

    app.listen(port, () => {
      console.log(`App running on port: ${port}`)
    })
  } catch (error) {
    console.error(error)
    console.log("can't connect to database!")
  }
}

startServer()
