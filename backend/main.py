from fastapi import FastAPI

from annex import annex_chat

from models import ChatRequest, Profile, DailyLog

from models import ChatRequest, Profile, DailyLog, Goal

from database import (
    create_tables,
    save_profile,
    save_daily_log,
    save_goals
)
app = FastAPI(
    title="Annex Health AI",
    version="1.0.0"
)

# Create the database and tables when the server starts
create_tables()


@app.get("/")
def home():
    return {
        "message": "Annex Health AI Backend Running"
    }


@app.post("/chat")
def chat(request: ChatRequest):

    reply = annex_chat(request.message)

    return {
        "response": reply
    }


@app.post("/profile")
def profile(profile: Profile):

    save_profile(profile)

    return {
        "message": "Profile Saved Successfully"
    }
@app.post("/daily-log")
def daily_log(log: DailyLog):

    save_daily_log(log)

    return {
        "message": "Daily Log Saved Successfully"
    }
@app.post("/goals")
def goals(goal: Goal):

    save_goals(goal)

    return {
        "message": "Goals Saved Successfully"
    }