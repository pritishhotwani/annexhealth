import Card from "../components/Card";
import Button from "../components/Button";

function Goals() {
  return (
    <div className="page">
      <h1 className="section-title">Health Goals</h1>

      <Card title="Daily Goals">
        <label>Water Goal (Litres)</label>
        <input className="input" type="number" placeholder="2.5" />

        <label>Sleep Goal (Hours)</label>
        <input className="input" type="number" placeholder="8" />

        <label>Exercise Goal (Minutes)</label>
        <input className="input" type="number" placeholder="30" />
      </Card>

      <br />

      <Button text="Save Goals" />
    </div>
  );
}

export default Goals;