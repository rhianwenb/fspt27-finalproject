import React from 'react';
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import RegisterUser from './RegisterUser.jsx';
import Login from '../components/Login.jsx';
import AuthContext from '../context/AuthContext.js';


export default function Profile() {

  const [userReviews, setUserReviews] = useState();
  const [userProfile, setUserProfile] = useState({
    FirstName: "first name",
    LastName: "last name",
    UserName: "username",
    Type: " "
  });


  const auth = useContext(AuthContext);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("userid");
    const fetchUserProfile = async () => {
      if (loggedInUser) {
        try {
          const res = await axios.get(`/api/users/${loggedInUser}`);
          setUserProfile(res.data[0]);
        } catch (err) {
          console.error(err);
        }
      };
    };
    fetchUserProfile();
    console.log(userProfile);
  }, []);


  const getUserReviews = async () => {
    const loggedInUser = localStorage.getItem("userid");
    try {
      const { data } = await axios(`/api/reviews/user/${loggedInUser}`, {
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

    <body onload={userProfile}></body>
        
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
            <span id="card-title" className="name mt-3"><h4> {userProfile.FirstName}   {userProfile.LastName} </h4></span> 
            <span className="idd">@{userProfile.UserName}</span> 
              
            <div className="d-flex flex-row justify-content-center align-items-center mt-3"> 
              <span className="info1">{userProfile.Type}</span> 
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