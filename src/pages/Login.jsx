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
