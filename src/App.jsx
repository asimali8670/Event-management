import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import EventList from "./pages/EventList";
import EventDetails from "./pages/EventDetails";
import CreateEditEvent from "./pages/CreateEditEvent";
import UserProfile from "./pages/UserProfile";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import EventForm from "./components/EventForm"; 
import Login from "./pages/login";

function App() {
  const [events, setEvents] = useState([]); // State to hold the list of events
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State for authentication
  const [searchQuery, setSearchQuery] = useState("");

  // Check if the user is authenticated when the app loads
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  // Function to add an event to the list
  const addEvent = (newEvent) => {
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Display Navbar only if authenticated */}
      {isAuthenticated && <Navbar onLogout={handleLogout} />}
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/login" replace />
            ) : (
              <Login setIsAuthenticated={setIsAuthenticated} />
            )
          }
        />

        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/home" replace />
            ) : (
              <Login setIsAuthenticated={setIsAuthenticated} />
            )
          }
        />

        {/* Home Route */}
        <Route
          path="/home"
          element={
            isAuthenticated ? <Home /> : <Navigate to="/login" replace />
          }
        />

        <Route
          path="/events"
          element={
            isAuthenticated ? (
              <EventList
                events={filteredEvents}
                setSearchQuery={setSearchQuery}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Event Details page */}
        <Route
          path="/events/:id"
          element={
            isAuthenticated ? (
              <EventDetails events={events} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Create/Edit Event page */}
        <Route
          path="/create-edit-event"
          element={
            isAuthenticated ? (
              <CreateEditEvent />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* User Profile page */}
        <Route
          path="/user-profile"
          element={
            isAuthenticated ? <UserProfile /> : <Navigate to="/login" replace />
          }
        />

        {/* Event Form page to add events */}
        <Route
          path="/create-event"
          element={
            isAuthenticated ? (
              <EventForm addEvent={addEvent} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Redirect unknown routes to login */}
        <Route
          path="*"
          element={
            <Navigate to={isAuthenticated ? "/home" : "/login"} replace />
          }
        />
      </Routes>
      {/* Display Footer only if authenticated */}
      {isAuthenticated && <Footer />}
    </>
  );
}

export default App;
