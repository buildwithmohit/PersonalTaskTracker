import React, { useState } from "react";
import { saveUsername } from "../utils/localStorage";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) return;
    saveUsername(username);
    onLogin(username);
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
      </label>
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;