import 'dotenv/config'
import { createConnection } from 'typeorm'
import * as redis from 'redis'
import validateEnv from './utils/validateEnv'
import ormConfig from './config/ormconfig'
import redisConfig from './config/redisconfig'

// dotenv validation
validateEnv()
;(async () => {
  try {
    /**
     *  Connect to Database and Redis before
     *  listening to the main PORT
     */
    // Database (Postgres/typeORM)
    await createConnection(ormConfig)
    console.log(`Connected to Database: ${process.env.POSTGRES_HOST}`)

    // Redis
    const client = redis.createClient(redisConfig)
    client.on('connect', () => {
      console.log('Connected to Redis')
    })
  } catch (err) {
    console.log(`Error while connecting to the database`, err)
    return err
  }
})()
