// imports db connection
import { pool } from './database.js'

// our 4 locations
const locations = [
  { name: "Seattle", description: "The region's main hub for events and culture.", image: "" },
  { name: "Tacoma", description: "A city with its own active community events scene.", image: "" },
  { name: "Bellevue", description: "Eastside city known for markets and gardens.", image: "" },
  { name: "Olympia", description: "Washington's state capital, home to local festivals.", image: "" },
]

// our events, matched to a location by name
const events = [
  { title: "Georgetown Art Attack!", description: "Monthly art walk through Georgetown's galleries and studios.", event_date: "2026-10-10", locationName: "Seattle" },
  { title: "TurkFest", description: "Free Turkish cultural festival at Seattle Center Armory.", event_date: "2026-10-10", locationName: "Seattle" },
  { title: "Indigenous Peoples' Day", description: "Celebration at Daybreak Star Indian Cultural Center.", event_date: "2026-10-12", locationName: "Seattle" },
  { title: "Lake City Community Art Walk", description: "Neighborhood art walk featuring local artists.", event_date: "2026-10-15", locationName: "Seattle" },
  { title: "Fauntleroy Fall Festival", description: "Community fall festival in West Seattle.", event_date: "2026-10-18", locationName: "Seattle" },
  { title: "Emerald City Outdoor Makers Market", description: "Outdoor market featuring local makers and artists.", event_date: "2026-10-23", locationName: "Seattle" },
  { title: "Northgate Trunk or Treat", description: "Family-friendly Halloween trunk-or-treat event.", event_date: "2026-10-30", locationName: "Seattle" },
  { title: "Fremont Troll Celebration", description: "Halloween celebration at the famous Fremont Troll.", event_date: "2026-10-31", locationName: "Seattle" },

  { title: "Free Entry: Tacoma Art Museum", description: "Free admission day at Tacoma Art Museum.", event_date: "2026-10-01", locationName: "Tacoma" },
  { title: "Free Family Movies", description: "Free movie screening at the Blue Mouse Theatre.", event_date: "2026-10-03", locationName: "Tacoma" },
  { title: "Tacoma Greek Festival", description: "Annual Greek food and culture festival in Tacoma.", event_date: "2026-10-09", locationName: "Tacoma" },
  { title: "Free Movie at The Grand Cinema", description: "Free screening at Tacoma's independent theater.", event_date: "2026-10-17", locationName: "Tacoma" },

  { title: "Kelsey Creek Farm Fair", description: "Farm fair with tractors, pumpkins, and live music.", event_date: "2026-10-03", locationName: "Bellevue" },
  { title: "Bellevue Jazz & Blues Music Series", description: "Live jazz and blues performances across downtown Bellevue; most shows free, some headliners ticketed.", event_date: "2026-10-07", locationName: "Bellevue" },
  { title: "Eastside Alchemy Halloween Market", description: "Halloween-themed market event on the Eastside.", event_date: "2026-10-31", locationName: "Bellevue" },
  { title: "Bellevue Botanical Gardens", description: "Free daily admission to the gardens.", event_date: "2026-10-01", locationName: "Bellevue" },

  { title: "Olympia Farmers Market", description: "Free admission, one of the largest markets in Washington.", event_date: "2026-10-01", locationName: "Olympia" },
  { title: "Lattin's Fall Festival", description: "Free entry pumpkin patch fun at Lattin's Country Cider Mill.", event_date: "2026-10-03", locationName: "Olympia" },
  { title: "SUP Witches of Olympia Festival", description: "Halloween-themed paddleboard festival at Swantown Marina.", event_date: "2026-10-10", locationName: "Olympia" },
  { title: "Harvest Celebration", description: "Fall celebration at Olympia Farmers Market with apple tasting and trick-or-treating.", event_date: "2026-10-26", locationName: "Olympia" },
]

async function seedDatabase() {
  try {
    // stores each location's name and generated id, so events can link to them
    const locationIds = {}

    // inserts each location, saves its auto-generated id
    for (const location of locations) {
      const result = await pool.query(
        `INSERT INTO locations (name, description, image) VALUES ($1, $2, $3) RETURNING id`,
        [location.name, location.description, location.image]
      )
      locationIds[location.name] = result.rows[0].id
    }

    // inserts each event, linked to its location's id
    for (const event of events) {
      await pool.query(
        `INSERT INTO events (title, description, event_date, location_id) VALUES ($1, $2, $3, $4)`,
        [event.title, event.description, event.event_date, locationIds[event.locationName]]
      )
    }

    console.log("✅ Seeded locations and events")
  } catch (err) {
    console.error("❌ Error seeding data:", err.message)
  } finally {
    pool.end()
  }
}

seedDatabase()