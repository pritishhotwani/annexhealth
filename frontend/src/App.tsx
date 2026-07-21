import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Goals from "./pages/Goals";
import DailyLog from "./pages/DailyLog";

import Chat from "./pages/Chat";
import BloodReport from "./pages/BloodReport/BloodReport";
import Progress from "./pages/Progress/Progress";

import Onboarding from "./pages/Onboarding";

function App() {

  const [profileCompleted, setProfileCompleted] =
    useState(false);

  useEffect(() => {

    setProfileCompleted(
      localStorage.getItem("annexProfileCompleted") === "true"
    );

  }, []);

  if (!profileCompleted) {
  return <Onboarding />;
  }
  return (
    <Routes>

      <Route element={<MainLayout />}>

        <Route path="/" element={<Home />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/chat" element={<Chat />} />

        <Route
          path="/blood-report"
          element={<BloodReport />}
        />

        <Route
          path="/progress"
          element={<Progress />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/goals"
          element={<Goals />}
        />

        <Route
          path="/daily-log"
          element={<DailyLog />}
        />

      </Route>

    </Routes>
  );
}

export default App;