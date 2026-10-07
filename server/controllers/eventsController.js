// imports db connection
import { pool } from '../config/database.js'

// gets every event
export async function getAllEvents(req, res) {
  try {
    const result = await pool.query('SELECT * FROM events')
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// gets all events for one location
export async function getEventsByLocation(req, res) {
  try {
    const { locationId } = req.params
    const result = await pool.query('SELECT * FROM events WHERE location_id = $1', [locationId])
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}