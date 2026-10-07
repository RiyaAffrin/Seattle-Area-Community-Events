import React, { useState, useEffect } from 'react'
import EventsAPI from '../services/EventsAPI'

const Events = () => {
  const [events, setEvents] = useState([])

  useEffect(() => {
    (async () => {
      const data = await EventsAPI.getAllEvents()
      setEvents(data)
    })()
  }, [])

  return (
    <div>
      <h2>All Events</h2>
      <ul>
        {events.map(event => (
          <li key={event.id}>
            <strong>{event.title}</strong> — {event.event_date}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Events