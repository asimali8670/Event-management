import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import styled from "styled-components";

// Styled components
const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f6f9;
`;

const LoginCard = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 20px;
  text-align: center;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;

  &:focus {
    border-color: #3498db;
    outline: none;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #2980b9;
  }
`;

const ForgotPasswordLink = styled.a`
  display: block;
  margin-top: 15px;
  text-align: center;
  color: #3498db;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const generateDummyToken = () => {
  return `dummy-token-${Math.random().toString(36).substr(2, 9)}`; // Generate a simpler token
};

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (redirect) {
      // Triggered when redirect is set to true, causing a redirect to home
      setIsAuthenticated(true);
    }
  }, [redirect, setIsAuthenticated]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!email || !password) {
      setError("All fields are required!");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Invalid email format!");
      return;
    }

    setError(""); // Clear previous error messages

    try {
      // Fetch user data from the server
      const response = await axios.get("http://localhost:5000/users");
      const user = response.data.find(
        (user) => user.email === email && user.password === password
      );

      if (user) {
        console.log("Login successful!");
        const token = generateDummyToken();
        localStorage.setItem("token", token); // Store token
        setIsAuthenticated(true);
        setRedirect(true);
        setEmail(""); // Clear email input
        setPassword(""); // Clear password input
      } else {
        setError("Invalid credentials!");
      }
    } catch (error) {
      setError("Network error. Please try again!");
    }
  };

  if (redirect) {
    return <Navigate to="/home" replace />;
  }

  return (
    <LoginWrapper style={{ backgroundColor: "#f5f5dc" }}>
      <LoginCard>
        <Title style={{ color: "#003366" }}>Login</Title>
        {error && <p>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div>
            <label>Email</label>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(""); // Clear error when the user starts typing
              }}
            />
          </div>

          <div>
            <label>Password</label>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(""); // Clear error when the user starts typing
              }}
            />
          </div>

          <Button type="submit">Login</Button>
        </form>

        <ForgotPasswordLink href="#">Forgot password?</ForgotPasswordLink>
      </LoginCard>
    </LoginWrapper>
  );
};

export default Login;
