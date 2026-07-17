import os
import traceback

from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-flash-latest")


def ask_annex(prompt: str):
    try:
        response = model.generate_content(prompt)
        return response.text

    except Exception as e:
        print("\n===== GEMINI ERROR =====")
        traceback.print_exc()
        print("========================\n")
        return str(e)