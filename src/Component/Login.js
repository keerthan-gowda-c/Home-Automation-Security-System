import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {

  const [userid, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault(); 
    if (!userid || !password) {
      setErrorMessage('Please fill all fields');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost/secureiot.php',
        new URLSearchParams({
          tag: "login",
          userid: userid,
          password: password,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      if (response.data && response.data.error === 0) {
        sessionStorage.setItem('user', JSON.stringify(response.data));
        alert("Login successful");
        navigate('/AdminDashboard');
      } else {
        setErrorMessage(response.data.message || "Invalid credentials");
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div style={{
      background: 'linear-gradient(to right, #00b4d8, #0077b6)', // Gradient background
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <div className="card p-4 shadow" style={{ width: "100%", maxWidth: "400px", borderRadius: "10px", backgroundColor: "#fff", opacity: 0.95 }}>
        <h3 className="text-center mb-4">Login</h3>

        {/* Error Message */}
        {errorMessage && <div className="alert alert-danger mb-3">{errorMessage}</div>}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">User ID</label>
            <input
              type="text"
              className="form-control"
              value={userid}
              onChange={(e) => setUserId(e.target.value)}
              required
              placeholder="Enter your User ID"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
