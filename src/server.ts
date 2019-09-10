import 'dotenv/config'
import 'reflect-metadata'
import { createConnection } from 'typeorm'
import validateEnv from './utils/validateEnv'
import ormConfig from './config/ormconfig'
import App from './app'
import postsController from './routes/posts/post.controller'

// dotenv validation
validateEnv();
(async () => {
  try {
    // Connect to Database before listening to the main PORT
    await createConnection(ormConfig)
    console.log(`Connected to Database: ${process.env.POSTGRES_HOST}`)
  } finally {
    const app = new App([new postsController()])
    app.listen()
  }
})()
