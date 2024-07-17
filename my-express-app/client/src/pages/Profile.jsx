import React from 'react';
import axios from 'axios';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import RegisterUser from './RegisterUser.jsx';
import Login from '../components/Login.jsx';
import AuthContext from '../context/AuthContext.js';


export default function Profile() {

  const [userReviews, setUserReviews] = useState();
  const auth = useContext(AuthContext);

  const getUserReviews = async () => {
    try {
      const { data } = await axios(`/api/reviews/user/${auth.userData.UserID}`, {
        method: "GET",
      });
      setUserReviews(data);
      console.log(data.message);
    }
    catch (err) {
      console.log(err.message);
    };
  };

   
  return (


    <div>
        
        { !auth.isLoggedIn && <Login/> }
        
        { auth.isLoggedIn && <div>
          
          
        <div>
        <div className="container mt-4 mb-4 p-4 justify-content-center" id="profile"> 
          <div className="card p-5 bg-light"> 

          {/* main profile data */}
            <div id="btn-profile" className="image d-flex flex-column justify-content-center align-items-center"> 
              <button className="btn btn-secondary btn-lg "> 
                <img src="https://static.vecteezy.com/system/resources/previews/024/183/502/original/male-avatar-portrait-of-a-young-man-with-a-beard-illustration-of-male-character-in-modern-color-style-vector.jpg" 
                 className="rounded-circle" height="150" width="150" />
              </button> 
            <span id="card-title" className="name mt-3"><h4> {auth.userData.FirstName}   {auth.userData.LastName} </h4></span> 
            <span className="idd">@{auth.userData.UserName}</span> 
              
            <div className="d-flex flex-row justify-content-center align-items-center mt-3"> 
              <span className="info1">{auth.userData.Type}</span> 
            </div> 
            </div> 

          {/* user reviews */}
          <div id="user-reviews" className="row mt-4"> 

            <span className="">{userReviews}</span> 
          </div> 
          


          </div>
        </div>
        </div>

              <button id="btn-logout" className="btn btn-secondary mt-8 ml-2" onClick={auth.logout}>
                Log Out
              </button>
          
          </div>}
        <NavBar />
    </div>

  )
}

//  d-flex 