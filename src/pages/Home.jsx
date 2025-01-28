import React from "react";
import myImage from "../assets/images/eventpic.avif";

const Home = () => (
  <div style={{ backgroundColor: "#f5f5dc", marginTop: "0px" }}>
    <h2 style={{ color: "#003366" }}>Welcome to the Event Management System</h2>
    <p>Explore our features and manage your events effectively.</p>
    <img
      src={myImage}
      alt="Welcome"
      style={{
        width: "100%",
        height: "20%",
        display: "block",
        margin: "0 auto",
      }}
    />
  </div>
);

export default Home;
