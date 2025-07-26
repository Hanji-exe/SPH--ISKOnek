import React, { useState } from "react";

function RegisterForm({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [userType, setUserType] = useState("user");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    // Check if user already exists
    // TODO: Replace with your real AWS API Gateway endpoint
    const res = await fetch(
      `https://your-api-id.execute-api.region.amazonaws.com/prod/users?email=${email}`
    );
    const users = await res.json();
    if (users.length > 0) {
      setError("User already exists");
      return;
    }
    // Register new user
    const newUser = {
      email,
      password,
      name,
      userType,
      profile: {}
    };
    // TODO: Replace with your real AWS API Gateway endpoint
    await fetch("https://your-api-id.execute-api.region.amazonaws.com/prod/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser)
    });
    onRegister(newUser);
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Register</h2>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Full Name"
        required
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
        required
      />
      <select
        value={userType}
        onChange={(e) => setUserType(e.target.value)}
      >
        <option value="user">Student/User</option>
        <option value="organization">Organization</option>
      </select>
      <button type="submit">Register</button>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </form>
  );
}

export default RegisterForm; 