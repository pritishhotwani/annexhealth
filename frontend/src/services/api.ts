const API =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

async function request(url: string, options?: RequestInit) {
  const response = await fetch(API + url, {
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
}

// =========================
// Dashboard
// =========================

export const getDashboard = () => request("/dashboard");

export const getHealthScore = () => request("/health-score");

export const getProgress = () => request("/progress");

export const getHealthReport = () => request("/health-report");

// =========================
// Chat
// =========================

export const sendChat = async (message: string) => {
  const data = await request("/chat", {
    method: "POST",
    body: JSON.stringify({ message }),
  });

  return data.response;
};

// Alias so Home.tsx can import { chat }
export const chat = sendChat;

// =========================
// Profile
// =========================

export const saveProfile = (profile: unknown) =>
  request("/profile", {
    method: "POST",
    body: JSON.stringify(profile),
  });

// =========================
// Goals
// =========================

export const saveGoals = (goals: unknown) =>
  request("/goals", {
    method: "POST",
    body: JSON.stringify(goals),
  });

// =========================
// Daily Log
// =========================

export const saveDailyLog = (log: unknown) =>
  request("/daily-log", {
    method: "POST",
    body: JSON.stringify(log),
  });

// =========================
// Blood Report
// =========================

export async function analyseBloodReport(file: File) {
  const form = new FormData();

  form.append("file", file);

  const response = await fetch(API + "/analyse-report", {
    method: "POST",
    body: form,
  });

  if (!response.ok) {
    throw new Error("Unable to analyse report.");
  }

  return response.json();
}