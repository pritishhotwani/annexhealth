import { useState } from "react";

import styles from "./Onboarding.module.css";


export default function Onboarding() {

 

  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({

    firstName: "",
    lastName: "",

    dob: "",
    gender: "",

    height: "",
    weight: "",

    conditions: "",
    allergies: "",
    medicines: "",

    sleep: "",
    water: "",
    exercise: "",

    supplements: "",
    smoking: "",
    alcohol: "",

    healthGoal: ""

  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLSelectElement |
      HTMLTextAreaElement
    >
  ) {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });

  }

  function nextStep() {

    setStep(2);

  }

  async function finishSetup() {

    const age =
      new Date().getFullYear() -
      new Date(formData.dob).getFullYear();

    const profile = {

      name:
        `${formData.firstName} ${formData.lastName}`,

      age,

      gender: formData.gender,

      height: Number(formData.height),

      weight: Number(formData.weight),

      conditions:
        formData.conditions
          .split(",")
          .map(item => item.trim())
          .filter(Boolean),

      medications:
        formData.medicines
          .split(",")
          .map(item => item.trim())
          .filter(Boolean),

      allergies:
        formData.allergies
          .split(",")
          .map(item => item.trim())
          .filter(Boolean)

    };

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/profile",
        {

          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(profile)

        }
      );

      if (!response.ok) {

        throw new Error();

      }

      localStorage.setItem(
            "annex-health-profile",
            JSON.stringify(formData)
        );

        localStorage.setItem(
            "annexProfileCompleted",
            "true"
        );

window.location.href = "/dashboard";

    }

    catch (error) {

      console.error(error);

      alert(
        "Unable to save your profile."
      );

    }

  }

  return (
    <div className={styles.page}>

  <div className={styles.card}>

    <div className={styles.header}>

      <h1>Create Your Health Profile</h1>

      <p>
        Complete your profile to receive personalised health guidance.
      </p>

    </div>

    <div className={styles.progressContainer}>

      <div className={styles.progressBar}>

        <div
          className={styles.progress}
          style={{
            width: step === 1 ? "50%" : "100%"
          }}
        />

      </div>

      <span>

        Step {step} of 2

      </span>

    </div>

    {step === 1 && (

      <>

        <h2>Personal Information</h2>

        <div className={styles.grid}>

          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
          />

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
          />

          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
          />

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >

            <option value="">Gender</option>

            <option>Male</option>

            <option>Female</option>

            <option>Other</option>

            <option>Prefer not to say</option>

          </select>

          <input
            type="number"
            name="height"
            placeholder="Height (cm)"
            value={formData.height}
            onChange={handleChange}
          />

          <input
            type="number"
            name="weight"
            placeholder="Weight (kg)"
            value={formData.weight}
            onChange={handleChange}
          />

        </div>

        <h2>Medical Information</h2>

        <textarea
          name="conditions"
          placeholder="Medical Conditions (Asthma, Diabetes, etc.)"
          value={formData.conditions}
          onChange={handleChange}
        />

        <textarea
          name="allergies"
          placeholder="Allergies"
          value={formData.allergies}
          onChange={handleChange}
        />

        <textarea
          name="medicines"
          placeholder="Current Medicines"
          value={formData.medicines}
          onChange={handleChange}
        />

        <button
          className={styles.primaryButton}
          onClick={nextStep}
        >

          Continue

        </button>

      </>

    )}
        {step === 2 && (

      <>

        <h2>Daily Lifestyle</h2>

        <div className={styles.grid}>

          <input
            type="number"
            name="sleep"
            placeholder="Average Sleep (Hours)"
            value={formData.sleep}
            onChange={handleChange}
          />

          <input
            type="number"
            step="0.1"
            name="water"
            placeholder="Water Intake (Litres)"
            value={formData.water}
            onChange={handleChange}
          />

          <select
            name="exercise"
            value={formData.exercise}
            onChange={handleChange}
          >

            <option value="">
              Exercise Frequency
            </option>

            <option>None</option>

            <option>1–2 Days / Week</option>

            <option>3–5 Days / Week</option>

            <option>Daily</option>

          </select>

          <input
            type="text"
            name="supplements"
            placeholder="Supplements (Optional)"
            value={formData.supplements}
            onChange={handleChange}
          />

          <select
            name="smoking"
            value={formData.smoking}
            onChange={handleChange}
          >

            <option value="">
              Smoking
            </option>

            <option>No</option>

            <option>Occasionally</option>

            <option>Regularly</option>

          </select>

          <select
            name="alcohol"
            value={formData.alcohol}
            onChange={handleChange}
          >

            <option value="">
              Alcohol
            </option>

            <option>No</option>

            <option>Occasionally</option>

            <option>Regularly</option>

          </select>

        </div>

        <h2>Health Goal</h2>

        <select
          name="healthGoal"
          value={formData.healthGoal}
          onChange={handleChange}
        >

          <option value="">
            Select Your Main Goal
          </option>

          <option>
            Improve Sleep
          </option>

          <option>
            Weight Management
          </option>

          <option>
            Increase Fitness
          </option>

          <option>
            Stress Management
          </option>

          <option>
            General Wellness
          </option>

          <option>
            Manage Existing Condition
          </option>

        </select>

        <div className={styles.buttonRow}>

          <button
            className={styles.secondaryButton}
            onClick={() => setStep(1)}
          >

            Back

          </button>

          <button
            className={styles.primaryButton}
            onClick={finishSetup}
          >

            Finish Setup

          </button>

        </div>

      </>

    )}

  </div>

</div>

);

}