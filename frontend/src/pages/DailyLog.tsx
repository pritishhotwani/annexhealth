import Card from "../components/Card";
import Button from "../components/Button";

function DailyLog() {
  return (
    <div className="page">
      <h1 className="section-title">Daily Log</h1>

      <Card title="Today's Health">

        <label>Sleep (hours)</label>
        <input className="input" type="number" />

        <label>Water (litres)</label>
        <input className="input" type="number" />

        <label>Exercise (minutes)</label>
        <input className="input" type="number" />

        <label>Mood</label>
        <select className="input">
          <option>Excellent</option>
          <option>Good</option>
          <option>Okay</option>
          <option>Bad</option>
        </select>

      </Card>

      <br />

      <Button text="Save Today's Log" />
    </div>
  );
}

export default DailyLog;