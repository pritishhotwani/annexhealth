import Card from "../components/Card";
import Button from "../components/Button";

function Profile() {
  return (
    <div className="page">
      <h1 className="section-title">Profile</h1>

      <Card title="Personal Information">

        <label>Name</label>
        <input
          className="input"
          type="text"
          placeholder="Enter your name"
        />

        <label>Age</label>
        <input
          className="input"
          type="number"
          placeholder="Enter your age"
        />

        <label>Gender</label>
        <select className="input">
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
          <option>Prefer not to say</option>
        </select>

        <label>Height (cm)</label>
        <input
          className="input"
          type="number"
          placeholder="170"
        />

        <label>Weight (kg)</label>
        <input
          className="input"
          type="number"
          placeholder="65"
        />

      </Card>

      <br />

      <Card title="Medical Information">

        <label>Medical Conditions</label>
        <textarea
          className="input"
          rows={3}
          placeholder="Diabetes, Asthma..."
        />

        <label>Current Medications</label>
        <textarea
          className="input"
          rows={3}
          placeholder="List medications..."
        />

        <label>Allergies</label>
        <textarea
          className="input"
          rows={3}
          placeholder="Peanuts, Penicillin..."
        />

      </Card>

      <br />

      <Button text="Save Profile" />

    </div>
  );
}

export default Profile;