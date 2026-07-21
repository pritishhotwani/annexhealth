import { useState } from "react";
import styles from "./Goals.module.css";
import { saveGoals } from "../services/api";

export default function Goals(){

const [goals,setGoals]=useState({
water:"",
sleep:"",
exercise:""
});

function update(e:any){

setGoals({
...goals,
[e.target.name]:e.target.value
});

}

async function submit() {

  try {

    await saveGoals({

      water: Number(goals.water),
      sleep: Number(goals.sleep),
      exercise: Number(goals.exercise)

    });

    alert("Goals Saved Successfully");

  } catch (error) {

    console.error(error);

    alert("Unable to save goals.");

  }

}

return(

<div className={styles.page}>

<h1 className={styles.title}>Health Goals</h1>

<p className={styles.subtitle}>
Set daily health targets.
</p>

<div className={styles.card}>

<div className={styles.grid}>

<input
className={styles.input}
name="water"
placeholder="Water Goal (L)"
onChange={update}
/>

<input
className={styles.input}
name="sleep"
placeholder="Sleep Goal (Hours)"
onChange={update}
/>

<input
className={styles.input}
name="exercise"
placeholder="Exercise Goal (Minutes)"
onChange={update}
/>

</div>

<button
className={styles.button}
onClick={submit}
>

Save Goals

</button>

</div>

</div>

);

}