from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from annex import (
    annex_chat,
    generate_health_report
)

from models import (
    ChatRequest,
    Profile,
    DailyLog,
    Goal
)

from database import (
    create_tables,
    save_profile,
    save_daily_log,
    save_goals,
    get_profile,
    get_goals,
    get_today_log,
    get_days_logged,
    get_progress_data,
    calculate_health_score,
    get_health_score_history,
    get_health_improvement
)

app = FastAPI(
    title="Annex Health AI",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

create_tables()


@app.get("/")
def home():

    return {
        "message": "Annex Health AI Backend Running"
    }


# ---------------- CHAT ----------------

@app.post("/chat")
def chat(request: ChatRequest):

    reply = annex_chat(request.message)

    return {
        "response": reply
    }


# ---------------- PROFILE ----------------

@app.post("/profile")
def profile(profile: Profile):

    save_profile(profile)

    return {
        "message": "Profile Saved Successfully"
    }


# ---------------- GOALS ----------------

@app.post("/goals")
def goals(goal: Goal):

    save_goals(goal)

    return {
        "message": "Goals Saved Successfully"
    }


# ---------------- DAILY LOG ----------------

@app.post("/daily-log")
def daily_log(log: DailyLog):

    save_daily_log(log)

    return {
        "message": "Daily Log Saved Successfully"
    }


# ---------------- DASHBOARD ----------------

@app.get("/dashboard")
def dashboard():

    return {

        "profile": get_profile(),

        "goals": get_goals(),

        "today": get_today_log(),

        "days_logged": get_days_logged()
    }


# ---------------- PROGRESS ----------------

@app.get("/progress")
def progress():

    return get_progress_data()


# ---------------- HEALTH SCORE ----------------

@app.get("/health-score")
def health_score():

    return {

        "score": calculate_health_score(),

        "improvement": get_health_improvement(),

        "history": get_health_score_history()

    }


# ---------------- AI HEALTH REPORT ----------------

@app.get("/health-report")
def health_report():

    report = generate_health_report()

    return {

        "report": report

    }