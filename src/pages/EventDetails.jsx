
import React from 'react';
import { useParams } from 'react-router-dom';

const EventDetails = ({ events }) => {
  const { id } = useParams(); // Get the id from URL parameters

  // Ensure the event list exists and contains events
  const event = events ? events.find((event) => event.id === id) : null;

  if (!event) {
    return <p>Event not found.</p>;
  }

  return (
    <div>
      <h2>Event Details</h2>
      <h3>{event.name}</h3>
      <p><strong>Date:</strong> {event.date}</p>
      <p><strong>Location:</strong> {event.location}</p>
      {/* Add more details here as needed */}
    </div>
  );
};

export default EventDetails;
