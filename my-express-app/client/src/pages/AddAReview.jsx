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
// import AddPropertyContext from '../context/AddPropertyContext';

export default function AddAReview() {
  const [step,setStep] = useState(1);
  const currentPage = useContext(NavContext).currentPage;
  const setCurrentPage = useContext(NavContext).setCurrentPage;
  const navigate = useNavigate();

  const isLoggedIn = useContext(AuthContext).isLoggedIn;
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
    MovingOut:"",
    PropertyID:null
  })

  function handleNextStep (event){
    event.preventDefault();

    setStep(step+1);
  }

  async function postReview (){
    let UserID = currentUser.UserID;


    try {

      const {ReviewDate, Rating1, Rating2, Rating3, Rating4, Rating5, Rating6, Rating7, Comments, MovingIn, MovingOut, PropertyID} = reviewInfo;

      console.log(MovingIn,MovingOut)

      await axios.post("/api/reviews/", {
        UserID,
        PropertyID,
        ReviewDate, Rating1, Rating2, Rating3, 
        Rating4, Rating5, Rating6, Rating7, Comments, MovingIn, MovingOut
      })

      setCurrentPage("Search");
      navigate("/");


    } catch(e){
      console.log(e.message)
    }
  }

  function goToLogin(event){
    event.preventDefault();
    navigate("/profile");
    setCurrentPage("Profile")
  }



  return (
    <div id="addareview">
      <h2>Add a review</h2>


      {isLoggedIn &&
      
      <div>
          <AddReviewContext.Provider value={{reviewInfo,setReviewInfo,postReview}}>

          {step===1 && 
            <>
              <h3>Basic information</h3>
              <AddressForm handleNextStep = {handleNextStep}/>
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
    </div>

      }
      
      {!isLoggedIn &&
        <div style={{marginTop:"100px"}}>
        <p>Please log in to add a review</p>
        <button id="loginToReview" onClick={(event)=>goToLogin(event)}>Log in</button>
        </div>
      }

        <NavBar />

    </div>
  )
}
