import sqlite3

DATABASE = "health.db"


def get_connection():
    return sqlite3.connect(DATABASE)


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

from datetime import date


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