import React, { useEffect, useMemo, useState, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEventsError,
  fetchEventsStart,
  fetchEventsSuccess,
} from "../redux/slices/eventsSlice";
import axios from "axios";
import styled from "styled-components";

// Lazy load EventCard
const EventCard = lazy(() => import("../components/EventCard"));

// Styled Components
const Container = styled.div`
  padding: 20px;
  background-color: #f5f5dc;
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
  const [searchTerm, setSearchTerm] = useState("");

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

  // Debounced search query
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setSearchQuery(searchTerm);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, setSearchQuery]);

  // Memoize filtered events
  const displayedEvents = useMemo(() => {
    return eventList.length > 0 ? eventList : events;
  }, [eventList, events]);

  if (loading) return <p>Loading events...</p>;
  if (error) return <ErrorMessage>Error loading events: {error}</ErrorMessage>;

  return (
    <Container>
      <SearchInput
        type="text"
        placeholder="Search events..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Title>Event List</Title>
      {displayedEvents.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <EventListContainer>
          <Suspense fallback={<p>Loading events...</p>}>
            {displayedEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </Suspense>
        </EventListContainer>
      )}
    </Container>
  );
};

export default EventList;
