import { useState } from "react";
import { chat } from "../services/api";
import HealthCard from "../components/HealthCard";
import styles from "./Home.module.css";

declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

interface Message {
  sender: "user" | "annex";
  text: string;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage(customMessage?: string) {
    const message = customMessage ?? input;

    if (!message.trim()) return;

    const userMessage: Message = {
      sender: "user",
      text: message,
    };

    setMessages((prev) => [...prev, userMessage]);

    setInput("");

    setLoading(true);

    try {
      const reply = await chat(message);

      setMessages((prev) => [
        ...prev,
        {
          sender: "annex",
          text: reply,
        },
      ]);

      // Speak AI response
      const speech = new SpeechSynthesisUtterance(reply);
      speech.lang = "en-US";
      speech.rate = 1;
      speech.pitch = 1;
      speechSynthesis.speak(speech);

    } catch {
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

  function startListening() {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition isn't supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";

    recognition.start();

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;

      setInput(transcript);

      sendMessage(transcript);
    };
  }

  return (
    <div className={styles.page}>
      {/* Dashboard Cards */}

      <div className={styles.dashboard}>

        <HealthCard
          title="Health Score"
          value="87"
          subtitle="Excellent"
        />

        <HealthCard
          title="Sleep"
          value="7.6 hrs"
          subtitle="Today"
        />

        <HealthCard
          title="Water"
          value="2.1 L"
          subtitle="Goal 3L"
        />

        <HealthCard
          title="Next Medicine"
          value="2:00 PM"
          subtitle="Vitamin D"
        />

      </div>

      {/* Chat */}

      <div className={styles.chat}>

        {messages.length === 0 && (
          <>
            <h2>Hello 👋</h2>

            <p>
              I'm Annex Health. How can I help you today?
            </p>

            <div className={styles.quick}>

              <button
                onClick={() => sendMessage("I have a headache")}
              >
                🤕 Headache
              </button>

              <button
                onClick={() => sendMessage("I feel sick")}
              >
                🤒 Feeling Sick
              </button>

              <button
                onClick={() => sendMessage("Give me today's health advice")}
              >
                💙 Health Advice
              </button>

              <button
                onClick={() => sendMessage("Summarise my health")}
              >
                📊 Health Summary
              </button>

            </div>
          </>
        )}

        {messages.map((msg, index) => (
          <div
            key={index}
            className={
              msg.sender === "user"
                ? styles.user
                : styles.bot
            }
          >
            {msg.text}
          </div>
        ))}

        {loading && (
          <div className={styles.bot}>
            Annex is thinking...
          </div>
        )}

      </div>

      {/* Input */}

      <div className={styles.bottom}>

        <div className={styles.inputRow}>

          <button
            className={styles.voice}
            onClick={startListening}
          >
            🎤
          </button>

          <input
            className={styles.input}
            placeholder="Ask Annex anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
          />

          <button
            className={styles.send}
            onClick={() => sendMessage()}
          >
            Send
          </button>

        </div>

        <p className={styles.disclaimer}>
          Annex Health is AI and can make mistakes.
        </p>

      </div>

    </div>
  );
}