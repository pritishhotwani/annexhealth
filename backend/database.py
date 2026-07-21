import sqlite3
from datetime import date, datetime

DATABASE = "health.db"


def get_connection():
    return sqlite3.connect(DATABASE)




    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS profile (

        id INTEGER PRIMARY KEY,

        name TEXT,
        age INTEGER,
        gender TEXT,

        height REAL,
        weight REAL,

        conditions TEXT,
        medications TEXT,
        allergies TEXT
    )
    """)
def create_tables():

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS profile (

        id INTEGER PRIMARY KEY,

        name TEXT,
        age INTEGER,
        gender TEXT,

        height REAL,
        weight REAL,

        conditions TEXT,
        medications TEXT,
        allergies TEXT

    )
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS goals (

        id INTEGER PRIMARY KEY,

        water REAL,
        sleep REAL,
        exercise INTEGER

    )
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS daily_logs (

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        date TEXT,

        sleep REAL,
        water REAL,
        exercise INTEGER,

        mood TEXT

    )
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS chat_history (

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        role TEXT,
        message TEXT,
        timestamp TEXT

    )
    """)

    conn.commit()
    conn.close()

# ---------------- PROFILE ----------------

def save_profile(profile):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
    INSERT OR REPLACE INTO profile
    (
        id,
        name,
        age,
        gender,
        height,
        weight,
        conditions,
        medications,
        allergies
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    """,
    (
        1,
        profile.name,
        profile.age,
        profile.gender,
        profile.height,
        profile.weight,
        ",".join(profile.conditions),
        ",".join(profile.medications),
        ",".join(profile.allergies)
    ))

    conn.commit()
    conn.close()


def get_profile():

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
    SELECT
        name,
        age,
        gender,
        height,
        weight,
        conditions,
        medications,
        allergies
    FROM profile
    WHERE id = 1
    """)

    profile = cursor.fetchone()

    conn.close()

    return profile


# ---------------- GOALS ----------------

def save_goals(goal):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
    INSERT OR REPLACE INTO goals
    (
        id,
        water,
        sleep,
        exercise
    )
    VALUES (?, ?, ?, ?)
    """,
    (
        1,
        goal.water,
        goal.sleep,
        goal.exercise
    ))

    conn.commit()
    conn.close()


def get_goals():

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
    SELECT
        water,
        sleep,
        exercise
    FROM goals
    WHERE id = 1
    """)

    goals = cursor.fetchone()

    conn.close()

    return goals


# ---------------- DAILY LOG ----------------

def save_daily_log(log):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
    INSERT INTO daily_logs
    (
        date,
        sleep,
        water,
        exercise,
        mood
    )
    VALUES (?, ?, ?, ?, ?)
    """,
    (
        str(date.today()),
        log.sleep,
        log.water,
        log.exercise,
        log.mood
    ))

    conn.commit()
    conn.close()


def get_today_log():

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
    SELECT
        sleep,
        water,
        exercise,
        mood
    FROM daily_logs
    WHERE date = ?
    ORDER BY id DESC
    LIMIT 1
    """, (str(date.today()),))

    log = cursor.fetchone()

    conn.close()

    return log


# ---------------- CHAT HISTORY ----------------

def save_chat(role, message):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
    INSERT INTO chat_history
    (
        role,
        message,
        timestamp
    )
    VALUES (?, ?, ?)
    """,
    (
        role,
        message,
        datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    ))

    conn.commit()
    conn.close()


def get_chat_history(limit=10):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
    SELECT
        role,
        message
    FROM chat_history
    ORDER BY id DESC
    LIMIT ?
    """, (limit,))

    history = cursor.fetchall()

    conn.close()

    history.reverse()

    return history
def get_days_logged():

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
    SELECT COUNT(DISTINCT date)
    FROM daily_logs
    """)

    days = cursor.fetchone()[0]

    conn.close()

    return days
def get_progress_data():

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
    SELECT
        date,
        sleep,
        water,
        exercise
    FROM daily_logs
    ORDER BY date
    """)

    rows = cursor.fetchall()

    conn.close()

    progress = []

    for row in rows:

        progress.append({

            "date": row[0],

            "sleep": row[1],

            "water": row[2],

            "exercise": row[3]

        })

    return progress

def get_all_logs():

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
    SELECT
        date,
        sleep,
        water,
        exercise,
        mood
    FROM daily_logs
    ORDER BY date
    """)

    logs = cursor.fetchall()

    conn.close()

    return logs

def calculate_health_score():

    goals = get_goals()
    today = get_today_log()

    if goals is None or today is None:
        return 0

    sleep_goal = goals[1]
    water_goal = goals[0]
    exercise_goal = goals[2]

    if sleep_goal == 0 or water_goal == 0 or exercise_goal == 0:
        return 0

def get_health_score_history():

    goals = get_goals()

    if goals is None:
        return []

    water_goal = goals[0]
    sleep_goal = goals[1]
    exercise_goal = goals[2]

    if water_goal == 0 or sleep_goal == 0 or exercise_goal == 0:
        return []

    water_goal = goals[0]
    sleep_goal = goals[1]
    exercise_goal = goals[2]

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
    SELECT
        date,
        sleep,
        water,
        exercise
    FROM daily_logs
    ORDER BY date
    """)

    rows = cursor.fetchall()

    conn.close()

    history = []

    for row in rows:

        score = (
            min((row[1] / sleep_goal) * 40, 40)
            +
            min((row[2] / water_goal) * 30, 30)
            +
            min((row[3] / exercise_goal) * 30, 30)
        )

        history.append({

            "date": row[0],

            "score": round(score, 1)

        })

    return history

def get_health_improvement():

    history = get_health_score_history()

    if len(history) < 2:
        return 0

    first = history[0]["score"]
    latest = history[-1]["score"]

    if first == 0:
        return 0

    improvement = ((latest - first) / first) * 100

    return round(improvement, 1)

def reset_user_data():

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("DELETE FROM daily_logs")
    cursor.execute("DELETE FROM goals")
    cursor.execute("DELETE FROM profile")

    conn.commit()
    conn.close()