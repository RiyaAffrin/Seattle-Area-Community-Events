// imports pg to connect PostgreSQL
import pg from 'pg'
// imports dotenv to read .env
import dotenv from 'dotenv'

// loads .env into process.env
dotenv.config()

// connection settings from .env
const config = {
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
    ssl: {
      // required by Render
      rejectUnauthorized: false
    }
}

// creates pool, shared with other files
export const pool = new pg.Pool(config)