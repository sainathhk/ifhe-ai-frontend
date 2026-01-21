/*

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { useState } from "react";

import "../App.css";

export default function Login({ setToken, setRole }) {
  const [loading, setLoading] = useState(false);

  const login = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const provider = new GoogleAuthProvider();

      // 1️⃣ Firebase popup login
      const result = await signInWithPopup(auth, provider);

      // 2️⃣ Get Firebase ID token
      const token = await result.user.getIdToken();

      // 3️⃣ Call backend to verify + get role
      const res = await fetch("https://ifhe-ai-backend.onrender.com/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Unauthorized");
      }

      const data = await res.json();

      // 4️⃣ Save to app state
      setToken(token);
      setRole(data.role);

      console.log("Login success:", data);

    } catch (err) {
      console.error("Login failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="login-container">
    <button onClick={login} disabled={loading}>
      {loading ? "Logging in..." : "Login with Google"}
    </button>
  </div>
);

}



*/


import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { useState } from "react";

import "../App.css";

export default function Login({ setToken, setRole }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async () => {
    if (loading) return;
    setLoading(true);
    setError("");

    try {
      const provider = new GoogleAuthProvider();

      // 1️⃣ Firebase popup login
      const result = await signInWithPopup(auth, provider);

      const email = result.user.email;

      // (Optional frontend domain check – UX improvement)
      if (!email.endsWith("@ifheindia.org")) {
        throw new Error("Only IFHE email IDs are allowed.");
      }

      // 2️⃣ Get Firebase ID token
      const token = await result.user.getIdToken();

      // 3️⃣ Call backend
      const res = await fetch("https://ifhe-ai-backend.onrender.com/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Access denied. Unauthorized email domain.");
      }

      const data = await res.json();

      // 4️⃣ Save to app state
      setToken(token);
      setRole(data.role);

    } catch (err) {
      console.error(err);

      if (err.message.includes("IFHE")) {
        setError("❌ Please login using your IFHE email ID (@ifheindia.org)");
      } else {
        setError("❌ Login failed. You are not authorized to access this app.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Welcome to IFHE AI Portal</h1>
        <p className="subtitle">
          Access restricted to IFHE students & faculty
        </p>

        <button className="login-btn" onClick={login} disabled={loading}>
          {loading ? "Signing in..." : "Login with Google"}
        </button>

        {error && <p className="error-text">{error}</p>}

        <p className="hint">
          Use your official <b>@ifheindia.org</b> email
        </p>
      </div>
    </div>
  );
}
