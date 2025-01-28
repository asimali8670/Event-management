import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEventsError,
  fetchEventsStart,
  fetchEventsSuccess,
} from "../redux/slices/eventsSlice";
import axios from "axios";
import EventCard from "../components/EventCard";
import styled from "styled-components";

// Styled Components
const Container = styled.div`
  padding: 20px;
  backgroundcolor: #f5f5dc;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;

  &:focus {
    border-color: #3498db;
    outline: none;
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #003366;
  margin-bottom: 20px;
`;

const EventListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 1rem;
`;

const EventList = ({ eventList = [], setSearchQuery }) => {
  const dispatch = useDispatch();
  const { events, loading, error } = useSelector((state) => state.events);

  useEffect(() => {
    const fetchEvents = async () => {
      dispatch(fetchEventsStart());
      try {
        const response = await axios.get("http://localhost:5000/events");
        dispatch(fetchEventsSuccess(response.data));
      } catch (err) {
        dispatch(fetchEventsError(err.message));
      }
    };

    fetchEvents();
  }, [dispatch]);

  const displayedEvents = eventList.length > 0 ? eventList : events;

  if (loading) return <p>Loading events...</p>;
  if (error) return <ErrorMessage>Error loading events: {error}</ErrorMessage>;

  return (
    <Container style={{ backgroundColor: "#f5f5dc" }}>
      <SearchInput
        type="text"
        placeholder="Search events..."
        onChange={(e) => setSearchQuery(e.target.value)} // Update search query
      />
      <Title>Event List</Title>
      {displayedEvents.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <EventListContainer>
          {displayedEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </EventListContainer>
      )}
    </Container>
  );
};

export default EventList;
