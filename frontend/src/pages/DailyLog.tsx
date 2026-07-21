import { useState } from "react";
import styles from "./DailyLog.module.css";
import { saveDailyLog } from "../services/api";

export default function DailyLog(){

const [log,setLog]=useState({

sleep:"",
water:"",
exercise:"",
mood:""

});

function update(e:any){

setLog({

...log,
[e.target.name]:e.target.value

});

}

async function submit(){

await saveDailyLog({

sleep:Number(log.sleep),
water:Number(log.water),
exercise:Number(log.exercise),
mood:log.mood

});

alert("Daily Log Saved");

}

return(

<div className={styles.page}>

<h1 className={styles.title}>
Daily Health Log
</h1>

<p className={styles.subtitle}>
Record today's health activity.
</p>

<div className={styles.card}>

<div className={styles.grid}>

<input className={styles.input} name="sleep" placeholder="Hours Slept" onChange={update}/>

<input className={styles.input} name="water" placeholder="Water Intake (L)" onChange={update}/>

<input className={styles.input} name="exercise" placeholder="Exercise (mins)" onChange={update}/>

<input className={styles.input} name="mood" placeholder="Mood" onChange={update}/>

</div>

<button
className={styles.button}
onClick={submit}
>

Save Daily Log

</button>

</div>

</div>

);

}