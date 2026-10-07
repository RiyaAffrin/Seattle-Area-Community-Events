const BASE_URL = '/api/events'

async function getAllEvents() {
  const res = await fetch(BASE_URL)
  return res.json()
}

async function getEventsByLocation(locationId) {
  const res = await fetch(`${BASE_URL}/location/${locationId}`)
  return res.json()
}

export default { getAllEvents, getEventsByLocation }