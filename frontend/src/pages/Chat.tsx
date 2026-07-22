import { useEffect, useRef, useState } from "react";
import styles from "./Chat.module.css";

interface Message {
  sender: "user" | "ai";
  text: string;
}

interface Profile {
  firstName?: string;
  lastName?: string;
  weight?: string;
  sleep?: string;
  water?: string;
  exercise?: string;
}

export default function Chat() {

  const [profile, setProfile] = useState<Profile>({});

  const [messages, setMessages] = useState<Message[]>([
  {
    sender: "ai",
    text:
      "Welcome to Annex Health AI.\n\nYour health profile has been loaded successfully.\n\nHow are you feeling today?",
  },
]);
  const [input, setInput] = useState("");

  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    const saved = localStorage.getItem("annex-health-profile");

    if (saved) {

      setProfile(JSON.parse(saved));

    }

  }, []);

  useEffect(() => {

    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });

  }, [messages]);

  async function sendMessage() {

    if (!input.trim()) return;

    const userMessage = input;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: userMessage,
      },
    ]);

    setInput("");

    setLoading(true);

    try {

      const response = await fetch(`${import.meta.env.VITE_API_URL}/chat`, {
        method: "POST",

        headers: {

          "Content-Type": "application/json",

        },

        body: JSON.stringify({

          message: userMessage,

          profile: profile,

        }),

      });

      const data = await response.json();

      setMessages((prev) => [

        ...prev,

        {

          sender: "ai",

          text: data.response,

        },

      ]);

    } catch {

      setMessages((prev) => [

        ...prev,

        {

          sender: "ai",

          text: "Unable to connect to the AI server.",

        },

      ]);

    }

    setLoading(false);

  }

  return (

    <div className={styles.page}>

      <div className={styles.container}>

        <header className={styles.header}>

          <div>

            <h1>Annex Health AI</h1>

            <p>

              Welcome {profile.firstName || "User"}

            </p>

          </div>

          <div className={styles.actions}>

            <button>

              Analyse Blood Report

            </button>

            <button>

              Health Insights

            </button>

          </div>

        </header>

        <section className={styles.summary}>

          <div>

            <span>Sleep</span>

            <strong>

              {profile.sleep || "--"} hrs

            </strong>

          </div>

          <div>

            <span>Water</span>

            <strong>

              {profile.water || "--"} L

            </strong>

          </div>

          <div>

            <span>Exercise</span>

            <strong>

              {profile.exercise || "--"}

            </strong>

          </div>

          <div>

            <span>Weight</span>

            <strong>

              {profile.weight || "--"} kg

            </strong>

          </div>

        </section>

        <section className={styles.chatBox}>

          {messages.map((message, index) => (

            <div

              key={index}

              className={
                message.sender === "user"
                  ? styles.userMessage
                  : styles.aiMessage
              }

            >

              {message.text}

            </div>

          ))}

          {loading && (

            <div className={styles.aiMessage}>

              Annex is analysing...

            </div>

          )}

          <div ref={bottomRef}></div>

        </section>

        <footer className={styles.inputArea}>

          <input

            placeholder="Describe how you're feeling..."

            value={input}

            onChange={(e) => setInput(e.target.value)}

            onKeyDown={(e) => {

              if (e.key === "Enter") {

                sendMessage();

              }

            }}

          />

          <button onClick={sendMessage}>

            Send

          </button>

        </footer>

      </div>

    </div>

  );

}