import React, { useState, useEffect, lazy, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const Home = lazy(() => import("./pages/Home"));
const EventList = lazy(() => import("./pages/EventList"));
const CreateEditEvent = lazy(() => import("./pages/CreateEditEvent"));
const UserProfile = lazy(() => import("./pages/UserProfile"));
const EventForm = lazy(() => import("./components/EventForm"));
const Login = lazy(() => import("./pages/Login"));

function App() {
  const [events, setEvents] = useState([]); // State to hold the list of events
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State for authenticating
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

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
      {isAuthenticated && <Navbar onLogout={handleLogout} />}
      {/* suspense wrapper */}
      <Suspense fallback={<div>Loading...</div>}>
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
          <Route
            path="/user-profile"
            element={
              isAuthenticated ? (
                <UserProfile />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
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
          <Route
            path="*"
            element={
              <Navigate to={isAuthenticated ? "/home" : "/login"} replace />
            }
          />
        </Routes>
      </Suspense>
      {isAuthenticated && <Footer />}
    </>
  );
}

export default App;
