import { useState } from "react";
import styles from "./Profile.module.css";
import { saveProfile } from "../services/api";

export default function Profile() {

  const [profile, setProfile] = useState({
    name:"",
    age:"",
    gender:"",
    height:"",
    weight:"",
    medical_conditions:"",
    medications:"",
    allergies:""
  });

  function update(e:any){

    setProfile({
      ...profile,
      [e.target.name]:e.target.value
    });

  }

  async function submit(){

    try{

      await saveProfile({

        name:profile.name,

        age:Number(profile.age),

        gender:profile.gender,

        height:Number(profile.height),

        weight:Number(profile.weight),

        medical_conditions:profile.medical_conditions,

        medications:profile.medications,

        allergies:profile.allergies

      });

      alert("Profile Saved Successfully");

    }

    catch{

      alert("Unable to save profile");

    }

  }

  return(

<div className={styles.page}>

<h1 className={styles.title}>
Medical Profile
</h1>

<p className={styles.subtitle}>
Complete your medical information so Annex AI can provide personalised guidance.
</p>

<div className={styles.section}>

<h2>Personal Information</h2>

<div className={styles.grid}>

<input className={styles.input} name="name" placeholder="Full Name" onChange={update}/>

<input className={styles.input} name="age" placeholder="Age" onChange={update}/>

<input className={styles.input} name="gender" placeholder="Gender" onChange={update}/>

<input className={styles.input} name="height" placeholder="Height (cm)" onChange={update}/>

<input className={styles.input} name="weight" placeholder="Weight (kg)" onChange={update}/>

</div>

</div>

<div className={styles.section}>

<h2>Medical Information</h2>

<div className={styles.grid}>

<input
className={`${styles.input} ${styles.full}`}
name="medical_conditions"
placeholder="Medical Conditions"
onChange={update}
/>

<input
className={`${styles.input} ${styles.full}`}
name="medications"
placeholder="Current Medications"
onChange={update}
/>

<input
className={`${styles.input} ${styles.full}`}
name="allergies"
placeholder="Allergies"
onChange={update}
/>

</div>

</div>

<div className={styles.section}>

<h2>Blood Report</h2>

<div className={styles.buttons}>

<button className={styles.primary}>
Upload Blood Report
</button>

<button className={styles.secondary}>
Skip for now
</button>

</div>

</div>

<button
className={styles.primary}
onClick={submit}
>

Save Profile

</button>

</div>

);

}