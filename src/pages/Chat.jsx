import { useState } from "react";
import "../App.css";

export default function Chat({ token }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const ask = async () => {
    const res = await fetch("https://ifhe-ai-backend.onrender.com/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ question }),
    });

    const data = await res.json();
    setAnswer(data.answer);
  };

  return (
  <div className="chat-container">
    <h2>Ask IFHE Assistant</h2>

    <div className="chat-box">
      {answer && <div className="message ai">{answer}</div>}
    </div>

    <div className="input-row">
      <input
        type="text"
        placeholder="Ask your question..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <button onClick={ask}>Ask</button>
    </div>
  </div>
);


}
