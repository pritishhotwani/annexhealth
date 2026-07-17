from database import get_profile
from ai import ask_annex


def annex_chat(message: str):

    profile = get_profile()

    if profile is None:
        return "No health profile found. Please complete your profile first."

    prompt = f"""
You are Annex Health AI.

The user profile is:

Name: {profile[0]}
Age: {profile[1]}
Gender: {profile[2]}
Height: {profile[3]} cm
Weight: {profile[4]} kg

Medical Conditions:
{profile[5]}

Current Medications:
{profile[6]}

Allergies:
{profile[7]}

Instructions:

- You are a healthcare assistant.
- Ask follow-up questions before giving advice.
- Never claim to diagnose diseases.
- Recommend consulting a healthcare professional for serious symptoms.
- Give simple and easy-to-understand answers.

User:

{message}
"""

    return ask_annex(prompt)