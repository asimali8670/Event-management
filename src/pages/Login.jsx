import React, { useState, useEffect, useCallback, lazy, Suspense } from "react";
import axios from "axios";
import styled from "styled-components";

// Lazy load Navigate
const Navigate = lazy(() =>
  import("react-router-dom").then((mod) => ({ default: mod.Navigate }))
);

// Styled components
const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5dc;
`;

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center; /* Center the logo */
  width: 100%;
  margin-bottom: 30px;
`;

const LogoTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: rgb(102, 0, 0);
  text-shadow: 2px 2px 5px rgba(18, 214, 185, 0.44);
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
  color: #003366;
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
  return `dummy-token-${Math.random().toString(36).substr(2, 9)}`;
};

const Login = ({ setIsAuthenticated }) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (redirect) {
      setIsAuthenticated(true);
    }
  }, [redirect, setIsAuthenticated]);

  // Using callback to prevent re-creation of function
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (!credentials.email || !credentials.password) {
        setError("All fields are required!");
        return;
      }

      if (!/^\S+@\S+\.\S+$/.test(credentials.email)) {
        setError("Invalid email format!");
        return;
      }

      setError(""); // Clear previous error messages

      try {
        const response = await axios.get("http://localhost:5000/users");
        const user = response.data.find(
          (user) =>
            user.email === credentials.email &&
            user.password === credentials.password
        );

        if (user) {
          console.log("Login successful!");
          const token = generateDummyToken();
          localStorage.setItem("token", token);
          setIsAuthenticated(true);
          setRedirect(true);
          setCredentials({ email: "", password: "" });
        } else {
          setError("Invalid credentials!");
        }
      } catch (error) {
        setError("Network error. Please try again!");
      }
    },
    [credentials, setIsAuthenticated]
  );

  if (redirect) {
    return (
      <Suspense fallback={<p>Redirecting...</p>}>
        <Navigate to="/home" replace />
      </Suspense>
    );
  }

  return (
    <LoginWrapper>
      <LogoWrapper>
        <LogoTitle>EventSphere</LogoTitle>
      </LogoWrapper>
      <LoginCard>
        <Title>Login</Title>
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div>
            <label>Email</label>
            <Input
              type="email"
              placeholder="Enter your email"
              value={credentials.email}
              onChange={(e) =>
                setCredentials((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </div>

          <div>
            <label>Password</label>
            <Input
              type="password"
              placeholder="Enter your password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
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
