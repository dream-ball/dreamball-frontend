import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css'
import { server } from "../../utils/utils";

export default function Login() {
  const [formData, setFormData] = useState({ mail_id: "", password: "" });
  const [message, setMessage] = useState("");
  server.pathname = "/api/login";
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear any previous messages

    try {
      const response = await fetch(server, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      // Check if the response status is OK (status 200-299)
      if (!response.ok) {
        setMessage("Failed to log in. Please check your credentials.");
        return;
      }

      const data = await response.json();

      // Handle server-side validation failure
      if (data.status !== "success") {
        setMessage(data.msg);
        return;
      }

      // Store the auth token in localStorage and redirect to /matches
      localStorage.setItem("auth_token", data.auth_token);
      navigate("/matches"); // Use React Router's navigate
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Welcome Back</h1>
        <p>Please login to your account</p>
        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <input
              type="text"
              name="mail_id"
              value={formData.mail_id}
              onChange={handleChange}
              placeholder="Username"
              required
            />
          </div>
          <div className="input-field">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
          </div>
          {message && <div className="msg"><span>{message}</span></div>}
          <button type="submit" className="login-button">
            Sign In
          </button>
          <div className="options">
            <a href='/'>Forgot Password?</a>
            <a href='/'>Create Account</a>
          </div>
        </form>
      </div>
    </div>
  );
}
