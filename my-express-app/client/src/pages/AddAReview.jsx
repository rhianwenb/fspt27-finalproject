import React, { useState } from 'react'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar'
import "../styles/AddAReview.css"
import axios from "axios"

import AddReviewContext from '../context/AddReviewContext';
import NavContext from '../context/NavContext';

import Step2 from '../components/FormSteps/Step2';
import Step3 from '../components/FormSteps/Step3';

import AddressForm from '../components/AddressForm'
import AuthContext from '../context/AuthContext';

export default function AddAReview() {
  const [step,setStep] = useState(1);
  const currentPage = useContext(NavContext).currentPage;
  const setCurrentPage = useContext(NavContext).setCurrentPage;
  const navigate = useNavigate();

  const currentUser=useContext(AuthContext).currentUser;
  
  const [reviewInfo,setReviewInfo] = useState({
    ReviewDate:new Date().toISOString().slice(0,10),
    Rating1:1,
    Rating2:3,
    Rating3:3,
    Rating4:3,
    Rating5:3,
    Rating6:3,
    Rating7:3,
    Comments:"",
    MovingIn:"",
    MovingOut:""
  })


  

  function handleNextStep (event){
    event.preventDefault();

    setStep(step+1);
  }

  async function postReview (){
    //Get user's id
    let UserID = currentUser.UserID;
    //Get property's id
    //Axios post with all info
    let sampleUserID = 1;
    let samplePropertyID = 1;

    try {

      const {ReviewDate, Rating1, Rating2, Rating3, Rating4, Rating5, Rating6, Rating7, Comments, MovingIn, MovingOut} = reviewInfo;

      console.log(MovingIn,MovingOut)

      await axios.post("/api/reviews/",{
        UserID,
        PropertyID:samplePropertyID,
        ReviewDate, Rating1, Rating2, Rating3, 
        Rating4, Rating5, Rating6, Rating7, Comments, MovingIn, MovingOut
      })

      setCurrentPage("Search");
      navigate("/");


    } catch(e){
      console.log(e.message)
    }
  }



  return (
    <div id="addareview">
      <h2>Add a review</h2>


      <AddReviewContext.Provider value={{reviewInfo,setReviewInfo,postReview}}>

      {step===1 && 
        <>
          <h3>Basic information</h3>
          <AddressForm handleNextStep = {handleNextStep}/>
          {/* <form>
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

          </form> */}
        </>
      }

      {step===2 && 
        <Step2 changeStep={handleNextStep}/>
      }

      {step===3 &&
        <Step3 changeStep={handleNextStep} />
      }
      </AddReviewContext.Provider>

      

      <div id="stepsAddReview">
        <div className="activeStep" onClick={()=>setStep(1)} ></div> 
        <div className={step>1?"activeStep":""} onClick={()=>setStep(2)}></div> 
        <div className={step>2?"activeStep":""} onClick={()=>setStep(3)} ></div> 
      </div>

        <NavBar />

    </div>
  )
}
