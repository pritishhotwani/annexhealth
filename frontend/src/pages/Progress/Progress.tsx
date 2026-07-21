import { useEffect, useState } from "react";
import styles from "./Progress.module.css";

import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from "recharts";

interface ProgressData {

    date: string;

    sleep: number;

    water: number;

    exercise: number;

}

interface HealthScore {

    score: number;

    improvement: number;

    history: {
        date: string;
        score: number;
    }[];

}

export default function Progress() {

    const [progress, setProgress] = useState<ProgressData[]>([]);

    const [score, setScore] = useState<HealthScore | null>(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadData();

    }, []);

    async function loadData() {

        try {

            const progressResponse = await fetch(
                "http://127.0.0.1:8000/progress"
            );

            const progressData = await progressResponse.json();

            setProgress(progressData);

            const scoreResponse = await fetch(
                "http://127.0.0.1:8000/health-score"
            );

            const scoreData = await scoreResponse.json();

            setScore(scoreData);

        }

        catch {

            console.log("Unable to load progress.");

        }

        setLoading(false);

    }

    if (loading) {

        return (

            <div className={styles.loading}>

                Loading health insights...

            </div>

        );

    }

    return (

        <div className={styles.page}>

            <div className={styles.container}>

                <header className={styles.header}>

                    <div>

                        <h1>

                            Health Insights

                        </h1>

                        <p>

                            Your health trends over time.

                        </p>

                    </div>

                </header>

                <section className={styles.cards}>

                    <div className={styles.card}>

                        <h2>

                            Health Score

                        </h2>

                        <h1>

                            {score?.score}/100

                        </h1>

                    </div>

                    <div className={styles.card}>

                        <h2>

                            Improvement

                        </h2>

                        <h1>

                            {score?.improvement}%

                        </h1>

                    </div>

                    <div className={styles.card}>

                        <h2>

                            Days Logged

                        </h2>

                        <h1>

                            {progress.length}

                        </h1>

                    </div>

                </section>

                <section className={styles.chartCard}>

                    <h2>

                        Sleep Trend

                    </h2>

                    <ResponsiveContainer
                        width="100%"
                        height={300}
                    >

                        <LineChart
                            data={progress}
                        >

                            <CartesianGrid strokeDasharray="3 3" />

                            <XAxis dataKey="date" />

                            <YAxis />

                            <Tooltip />

                            <Line
                                dataKey="sleep"
                                stroke="#2D6CDF"
                                strokeWidth={3}
                            />

                        </LineChart>

                    </ResponsiveContainer>

                </section>
                <section className={styles.chartCard}>

                    <h2>

                        Water Intake

                    </h2>

                    <ResponsiveContainer
                        width="100%"
                        height={300}
                    >

                        <LineChart
                            data={progress}
                        >

                            <CartesianGrid strokeDasharray="3 3" />

                            <XAxis dataKey="date" />

                            <YAxis />

                            <Tooltip />

                            <Line
                                dataKey="water"
                                stroke="#00A3FF"
                                strokeWidth={3}
                            />

                        </LineChart>

                    </ResponsiveContainer>

                </section>

                <section className={styles.chartCard}>

                    <h2>

                        Exercise

                    </h2>

                    <ResponsiveContainer
                        width="100%"
                        height={300}
                    >

                        <LineChart
                            data={progress}
                        >

                            <CartesianGrid strokeDasharray="3 3" />

                            <XAxis dataKey="date" />

                            <YAxis />

                            <Tooltip />

                            <Line
                                dataKey="exercise"
                                stroke="#3CB371"
                                strokeWidth={3}
                            />

                        </LineChart>

                    </ResponsiveContainer>

                </section>

                <section className={styles.chartCard}>

                    <h2>

                        Health Score History

                    </h2>

                    <ResponsiveContainer
                        width="100%"
                        height={300}
                    >

                        <LineChart
                            data={score?.history || []}
                        >

                            <CartesianGrid strokeDasharray="3 3" />

                            <XAxis dataKey="date" />

                            <YAxis domain={[0, 100]} />

                            <Tooltip />

                            <Line
                                dataKey="score"
                                stroke="#7C3AED"
                                strokeWidth={3}
                            />

                        </LineChart>

                    </ResponsiveContainer>

                </section>

            </div>

        </div>

    );

}