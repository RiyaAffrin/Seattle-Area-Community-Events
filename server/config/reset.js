// imports db connection
import { pool } from './database.js'

async function resetTables() {
  try {
    // drops old tables, safe to re-run
    await pool.query(`DROP TABLE IF EXISTS events;`)
    await pool.query(`DROP TABLE IF EXISTS locations;`)

    // creates locations table
    await pool.query(`
      CREATE TABLE locations (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        image TEXT
      );
    `)

    // creates events table, linked to locations
    await pool.query(`
      CREATE TABLE events (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        event_date DATE,
        location_id INTEGER REFERENCES locations(id)
      );
    `)

    console.log("✅ Tables created successfully")
  } catch (err) {
    console.error("❌ Error creating tables:", err.message)
  } finally {
    pool.end()
  }
}

resetTables()