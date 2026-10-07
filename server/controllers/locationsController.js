// imports db connection
import { pool } from '../config/database.js'

// gets every location
export async function getAllLocations(req, res) {
  try {
    const result = await pool.query('SELECT * FROM locations')
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// gets one location by id
export async function getLocationById(req, res) {
  try {
    const { id } = req.params
    const result = await pool.query('SELECT * FROM locations WHERE id = $1', [id])
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}