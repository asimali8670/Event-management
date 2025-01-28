import React, { useEffect, useState } from "react";
import styled from "styled-components";

// Styled Components
const Container = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
`;

const Info = styled.p`
  font-size: 1.2rem;
  color: #555;
  margin: 10px 0;
`;

const UserProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data from localStorage
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  if (!user) {
    return <div>No user logged in</div>;
  }

  return (
    <Container style={{ backgroundColor: "#f5f5dc" }}>
      <Title>User Profile</Title>
      <Info>Email: {user.email}</Info>
      <Info>Password: {user.password}</Info>
    </Container>
  );
};

export default UserProfile;
