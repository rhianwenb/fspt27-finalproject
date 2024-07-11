import React, { useState } from 'react'
import NavBar from '../components/NavBar'
import "../styles/AddAReview.css"

import Step2 from '../components/FormSteps/Step2';

export default function AddAReview() {
  const [step,setStep] = useState(1);
  

  

  function handleNextStep (event){
    event.preventDefault();

    setStep(step+1);
  }




  return (
    <div id="addareview">
      <h2>Add a review</h2>

      {step===1 && 
        <>
          <h3>Basic informations</h3>

          <form>
            <label style={{gridArea:"1/1/span 1/span 1"}}>
              <p>Number*</p>
              <input type='number'/>
            </label>

            <label style={{gridArea:"1/2/span 1/span 3"}}>
              <p>Street Name*</p>
              <input type='text'/>
            </label>

            <label style={{gridArea:"2/1/span 1/span 4"}}>
              <p>More adress info</p>
              <input type='text'/>
            </label>

            <label style={{gridArea:"3/1/span 1/span 2"}}>
              <p>City/Town*</p>
              <input type='text'/>
            </label>

            <label style={{gridArea:"3/3/span 1/span 2"}}>
              <p>Post Code*</p>
              <input type='number'/>
            </label>
            
            <div style={{gridArea:"4/1/span 1/span 4", marginTop:"20px"}}><button style={{width:"fit-content"}}
              onClick={(event)=>handleNextStep(event)}
            >Next step</button></div>

          </form>
        </>
      }

      {step===2 && 
        <Step2 changeStep={handleNextStep}/>
      }

      

      <div id="stepsAddReview">
        <div className="activeStep" onClick={()=>setStep(1)}></div> 
        <div className={step>1&&"activeStep"} onClick={()=>setStep(2)}></div> 
        <div className={step>2&&"activeStep"} ></div> 
        <div className={step>3&&"activeStep"}></div> 
        <div className={step>4&&"activeStep"}></div>
      </div>

        <NavBar />

    </div>
  )
}
