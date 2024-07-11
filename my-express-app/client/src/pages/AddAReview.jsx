import React, { useState } from 'react'
import NavBar from '../components/NavBar'
import "../styles/AddAReview.css"

export default function AddAReview() {
  const [step,setStep] = useState(1);

  let stars = [1,1,0,0,0]

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
        <form>
          <div id="stars" style={{gridArea:"1/1/span 1/span 4"}}>
              {stars.map((s,index)=>(
                <svg className={s===1&&"orangeStar"} version="1.0" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                width="30px" height="30px" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve">
                  <path fill="#d9d9d9" d="M62.799,23.737c-0.47-1.399-1.681-2.419-3.139-2.642l-16.969-2.593L35.069,2.265
                  C34.419,0.881,33.03,0,31.504,0c-1.527,0-2.915,0.881-3.565,2.265l-7.623,16.238L3.347,21.096c-1.458,0.223-2.669,1.242-3.138,2.642
                  c-0.469,1.4-0.115,2.942,0.916,4l12.392,12.707l-2.935,17.977c-0.242,1.488,0.389,2.984,1.62,3.854
                  c1.23,0.87,2.854,0.958,4.177,0.228l15.126-8.365l15.126,8.365c0.597,0.33,1.254,0.492,1.908,0.492c0.796,0,1.592-0.242,2.269-0.72
                  c1.231-0.869,1.861-2.365,1.619-3.854l-2.935-17.977l12.393-12.707C62.914,26.68,63.268,25.138,62.799,23.737z"/>
             </svg>
              ))}
          </div>
          <textarea style={{gridArea:"2/2/span 2/span 2"}}></textarea>
        </form>
      }

      

      <div id="stepsAddReview">
        <div className="activeStep" onClick={()=>setStep(1)}></div> <div className={step>1&&"activeStep"}></div> <div className={step>2&&"activeStep"}></div> <div className={step>3&&"activeStep"}></div> <div className={step>4&&"activeStep"}></div>
      </div>

        <NavBar />

    </div>
  )
}
