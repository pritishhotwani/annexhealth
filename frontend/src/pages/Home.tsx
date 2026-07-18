import { useState } from "react";
import { chat } from "../services/api";

interface Message {
  sender: "user" | "annex";
  text: string;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim()) return;

    const userMessage: Message = {
      sender: "user",
      text: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const reply = await chat(userMessage.text);

      setMessages((prev) => [
        ...prev,
        {
          sender: "annex",
          text: reply,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "annex",
          text: "Unable to contact the server.",
        },
      ]);
    }

    setLoading(false);
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Annex Health</h1>

      <div
        style={{
          border: "1px solid #ddd",
          height: 400,
          overflowY: "auto",
          padding: 20,
          marginBottom: 20,
        }}
      >
        {messages.map((msg, index) => (
          <p key={index}>
            <strong>{msg.sender === "user" ? "You" : "Annex"}:</strong>{" "}
            {msg.text}
          </p>
        ))}

        {loading && <p>Annex is thinking...</p>}
      </div>

      <input
        style={{ width: "80%", padding: 12 }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask Annex anything..."
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            sendMessage();
          }
        }}
      />

      <button
        style={{
          marginLeft: 10,
          padding: "12px 20px",
        }}
        onClick={sendMessage}
      >
        Send
      </button>
    </div>
  );
}