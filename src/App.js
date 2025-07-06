import React, { useEffect, useState } from "react";
import Login from "./components/Login";
import TaskList from "./components/TaskList";
import { getUsername } from "./utils/localStorage";

function App() {
  const [username, setUsername] = useState(getUsername());

  useEffect(() => {
    setUsername(getUsername());
  }, []);

  return (
    <div className="app-container">
      <h1>Personal Task Tracker</h1>
      {!username ? (
        <Login onLogin={setUsername} />
      ) : (
        <TaskList username={username} />
      )}
    </div>
  );
}

export default App;