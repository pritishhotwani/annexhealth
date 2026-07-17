from pydantic import BaseModel


class Profile(BaseModel):
    name: str
    age: int
    gender: str
    height: float
    weight: float

    conditions: list[str]
    medications: list[str]
    allergies: list[str]


class ChatRequest(BaseModel):
    message: str


class Goal(BaseModel):
    water: float
    sleep: float
    exercise: int


class DailyLog(BaseModel):
    sleep: float
    water: float
    exercise: int
    mood: str