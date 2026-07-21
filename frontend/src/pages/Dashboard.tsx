import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.css";

import {
  getDashboard,
  getHealthScore,
} from "../services/api";

interface DashboardData {
  profile: any;
  goals: any;
  today: any;
  days_logged: number;
}

interface HealthScore {
  score: number;  
  improvement: number;
}

export default function Dashboard() {
  const navigate = useNavigate();

  const [dashboard, setDashboard] =
    useState<DashboardData | null>(null);

  const [score, setScore] =
    useState<HealthScore | null>(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const dashboardData = await getDashboard();
      const scoreData = await getHealthScore();

      setDashboard(dashboardData);
      setScore(scoreData);
    } catch (error) {
      console.error(error);
    }
  }

  const greeting =
    new Date().getHours() < 12
      ? "Good Morning"
      : new Date().getHours() < 18
      ? "Good Afternoon"
      : "Good Evening";

  return (
    <div className={styles.page}>
      <div className={styles.container}>

        <header className={styles.header}>

          <div>

            <h1>

              {greeting}

              {dashboard?.profile
                ? `, ${dashboard.profile[0]}`
                : ""}

            </h1>

            <p>

              Welcome back to Annex Health AI

            </p>

          </div>

        </header>

        <section className={styles.cards}>

          <div className={styles.card}>

            <h3>Health Score</h3>

            <h1>

              {score?.score ?? "--"}/100

            </h1>

          </div>

          <div className={styles.card}>

            <h3>Improvement</h3>

            <h1>

              {score?.improvement ?? 0}%

            </h1>

          </div>

          <div className={styles.card}>

            <h3>Days Logged</h3>

            <h1>

              {dashboard?.days_logged ?? 0}

            </h1>

          </div>

        </section>

        <section className={styles.goals}>

          <h2>Today's Health Summary</h2>

          <div className={styles.goalGrid}>

            <div className={styles.goalCard}>

              <h4>Sleep</h4>

              <p>

                {dashboard?.today
                  ? `${dashboard.today[0]} hrs`
                  : "--"}

              </p>

            </div>

            <div className={styles.goalCard}>

              <h4>Water</h4>

              <p>

                {dashboard?.today
                  ? `${dashboard.today[1]} L`
                  : "--"}

              </p>

            </div>

            <div className={styles.goalCard}>

              <h4>Exercise</h4>

              <p>

                {dashboard?.today
                  ? `${dashboard.today[2]} min`
                  : "--"}

              </p>

            </div>

            <div className={styles.goalCard}>

              <h4>Mood</h4>

              <p>

                {dashboard?.today
                  ? dashboard.today[3]
                  : "--"}

              </p>

            </div>

          </div>

        </section>

        <section className={styles.actions}>

          <h2>Quick Actions</h2>

          <div className={styles.actionGrid}>

            <button
              onClick={() => navigate("/chat")}
            >
              Annex Assistant
            </button>

            <button
              onClick={() => navigate("/blood-report")}
            >
              Blood Report
            </button>

            <button
              onClick={() => navigate("/daily-log")}
            >
              Daily Check-In
            </button>

            <button
              onClick={() => navigate("/progress")}
            >
              Progress
            </button>

          </div>

        </section>

        <section className={styles.recommendation}>

          <h2>Annex Recommendation</h2>

          <p>

            {score?.score
              ? score.score >= 80
                ? "Your health habits are improving. Continue maintaining your sleep, hydration and exercise routine."
                : "Focus on improving your sleep, water intake and daily activity to improve your health score."
              : "Complete today's health log to receive personalised recommendations."}

          </p>

        </section>

      </div>
    </div>
  );
}