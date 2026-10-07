import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import LocationsAPI from '../services/LocationsAPI'
import EventsAPI from '../services/EventsAPI'
import '../css/LocationEvents.css'

const LocationEvents = () => {
  const { id } = useParams()
  const [location, setLocation] = useState({})
  const [events, setEvents] = useState([])

  useEffect(() => {
    (async () => {
      const locationData = await LocationsAPI.getLocationById(id)
      setLocation(locationData)

      const eventsData = await EventsAPI.getEventsByLocation(id)
      setEvents(eventsData)
    })()
  }, [id])

  return (
    <div className='location-events'>
      <header>
        <div className='location-image'>
          <img src={location.image} alt={location.name} />
        </div>
        <div className='location-info'>
          <h2>{location.name}</h2>
          <p>{location.description}</p>
        </div>
      </header>

      <main>
        {events && events.length > 0 ? (
          events.map(event => (
            <div key={event.id} className='event-card'>
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <p>
                <strong>Date:</strong>{' '}
                {new Date(event.event_date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
            </div>
          ))
        ) : (
          <h2>No events scheduled at this location yet!</h2>
        )}
      </main>
    </div>
  )
}

export default LocationEvents