import { useState } from "react";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import Upload from "./pages/Upload";

import "./App.css";

function App() {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);

  if (!token) {
    return (
      <div className="center-screen">
        <Login setToken={setToken} setRole={setRole} />
      </div>
    );
  }

  return (
    <div className="app-container">
      <Chat token={token} />
      {role === "faculty" && <Upload token={token} />}
    </div>
  );
}

export default App;

