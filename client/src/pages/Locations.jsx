import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import LocationsAPI from '../services/LocationsAPI'
import '../css/Locations.css'

const Locations = () => {
  const [locations, setLocations] = useState([])

  useEffect(() => {
    (async () => {
      const data = await LocationsAPI.getAllLocations()
      setLocations(data)
    })()
  }, [])

  return (
    <div className='available-locations'>
      <h2>Choose a Location</h2>
      <div className='location-grid'>
        {locations.map(location => (
          <Link to={`/locations/${location.id}`} key={location.id} className='location-card'>
            <img src={location.image} alt={location.name} />
            <h3>{location.name}</h3>
            <p>{location.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Locations