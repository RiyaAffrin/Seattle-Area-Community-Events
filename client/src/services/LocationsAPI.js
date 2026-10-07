const BASE_URL = '/api/locations'

async function getAllLocations() {
  const res = await fetch(BASE_URL)
  return res.json()
}

async function getLocationById(id) {
  const res = await fetch(`${BASE_URL}/${id}`)
  return res.json()
}

export default { getAllLocations, getLocationById }