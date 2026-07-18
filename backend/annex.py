from database import (
    get_profile,
    get_goals,
    get_today_log,
    get_chat_history,
    save_chat,
    get_all_logs,
    calculate_health_score,
    get_health_improvement,
    get_days_logged,
    get_health_score_history
)

from ai import ask_annex


def annex_chat(message: str):

    profile = get_profile()

    if profile is None:
        return "No health profile found. Please complete your profile first."

    goals = get_goals()
    today = get_today_log()
    history = get_chat_history()

    prompt = f"""
You are Annex Health AI.

You are an intelligent healthcare assistant.

You are NOT a doctor.

Never diagnose diseases.

Recommend consulting a healthcare professional for serious symptoms.

====================================================
USER PROFILE
====================================================

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
"""

    if goals:

        prompt += f"""

====================================================
HEALTH GOALS
====================================================

Water Goal: {goals[0]} L/day
Sleep Goal: {goals[1]} hours/day
Exercise Goal: {goals[2]} minutes/day
"""

    else:

        prompt += """

====================================================
HEALTH GOALS
====================================================

No health goals have been set.
"""

    if today:

        prompt += f"""

====================================================
TODAY'S HEALTH LOG
====================================================

Sleep: {today[0]} hours
Water: {today[1]} L
Exercise: {today[2]} minutes
Mood: {today[3]}
"""

    else:

        prompt += """

====================================================
TODAY'S HEALTH LOG
====================================================

No health log has been recorded today.
"""

    prompt += """

====================================================
PREVIOUS CONVERSATION
====================================================

"""

    for role, msg in history:
        prompt += f"{role}: {msg}\n"

    prompt += f"""

====================================================
USER QUESTION
====================================================

{message}

====================================================
INSTRUCTIONS
====================================================

- Use the user's profile.
- Use today's health log.
- Compare today's health log with their goals.
- Use previous conversation for context.
- Ask follow-up questions if needed.
- Keep answers simple.
- Never diagnose diseases.
"""

    reply = ask_annex(prompt)

    save_chat("User", message)
    save_chat("Annex", reply)

    return reply


def generate_health_report():

    profile = get_profile()
    goals = get_goals()
    logs = get_all_logs()

    score = calculate_health_score()
    improvement = get_health_improvement()
    days_logged = get_days_logged()
    score_history = get_health_score_history()

    if profile is None:
        return "No profile found."

    if days_logged < 20:
        return (
            f"Only {days_logged} daily logs available. "
            "At least 20 daily logs are required to generate an AI Health Report."
        )

    prompt = f"""
You are Annex Health AI.

Generate a professional personalised health report.

====================================================
PROFILE
====================================================

Name: {profile[0]}
Age: {profile[1]}
Gender: {profile[2]}
Height: {profile[3]} cm
Weight: {profile[4]} kg

Medical Conditions:
{profile[5]}

Medications:
{profile[6]}

Allergies:
{profile[7]}
"""

    if goals:

        prompt += f"""

====================================================
HEALTH GOALS
====================================================

Water Goal: {goals[0]} L/day
Sleep Goal: {goals[1]} hours/day
Exercise Goal: {goals[2]} minutes/day
"""

    prompt += f"""

====================================================
HEALTH STATISTICS
====================================================

Current Health Score: {score}/100

Health Improvement: {improvement}%

Days Logged: {days_logged}
"""

    prompt += """

====================================================
HEALTH SCORE HISTORY
====================================================
"""

    for item in score_history:

        prompt += f"""
{item['date']} : {item['score']}/100
"""

    prompt += """

====================================================
DAILY HEALTH LOGS
====================================================
"""

    for log in logs:

        prompt += f"""
Date: {log[0]}

Sleep: {log[1]} hours

Water: {log[2]} L

Exercise: {log[3]} minutes

Mood: {log[4]}

"""

    prompt += """

Write a professional report using the following sections.

# Overall Health Score

Mention the user's current health score.

# Health Improvement

State the exact improvement percentage provided.

Example:

"Your health has improved by 18.4% over the recorded period."

Then explain WHICH habits contributed the most.

For example:

- Better sleep consistency
- Increased water intake
- More regular exercise
- Improved mood

Also mention any area that has not improved much.

# Sleep Analysis

# Hydration Analysis

# Exercise Analysis

# Mood Trends

# Positive Habits

# Areas That Need Improvement

# Personalised Recommendations

Provide 5 practical recommendations.

For each recommendation include:

• Why it matters.

• What the user should do.

• The expected benefit if followed consistently.

# Overall Summary

Summarise the user's health journey in 3-5 sentences.

Mention:

- Current Health Score
- Health Improvement Percentage
- Strongest Healthy Habit
- Biggest Area for Improvement

End with an encouraging sentence.

# Conclusion

Use simple language.

Be encouraging.

Never diagnose diseases.

Recommend consulting a healthcare professional if symptoms sound serious.
"""

    return ask_annex(prompt)