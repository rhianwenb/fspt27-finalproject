import React from 'react';
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import RegisterUser from './RegisterUser.jsx';
import Login from '../components/Login.jsx';
import AuthContext from '../context/AuthContext.js';


export default function Profile() {

  const [userReviews, setUserReviews] = useState([{
    ReviewID: "",
    PropertyID: "",
    Comments: ""
  }]);

  const [userProfile, setUserProfile] = useState({
    FirstName: "",
    LastName: "",
    UserName: "",
    Type: ""
  });


  const auth = useContext(AuthContext);

  // useEffect(() => {
  //   const loggedInUser = localStorage.getItem("userid");
  //   const fetchUserProfile = async () => {
  //     if (loggedInUser) {
  //       try {
  //         const res = await axios.get(`/api/users/${loggedInUser}`);
  //         setUserProfile(res.data[0]);
  //       } catch (err) {
  //         console.error(err);
  //       }
  //     };
  //   };
  //   fetchUserProfile();
  // }, []);


  useEffect(() => {  
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
    getUserReviews();
  }, []);


  // console.log(userProfile);
  console.log(userReviews);
   
  return (


    <div>
        
        { !auth.isLoggedIn && <Login/> }
        
        { auth.isLoggedIn && <div>
          
          
        <div>
        <div className="container mt-4 mb-4 p-4 d-flex justify-content-center" id="profile"> 


          <div className="card p-5 bg-light"> 

          {/* main profile data */}
          <div className="row">
            <div id="btn-profile" className="image d-flex flex-column justify-content-center align-items-center"> 
              <button className="btn btn-secondary btn-lg "> 
                <img src="https://static.vecteezy.com/system/resources/previews/024/183/502/original/male-avatar-portrait-of-a-young-man-with-a-beard-illustration-of-male-character-in-modern-color-style-vector.jpg" 
                 className="rounded-circle" height="150" width="150" />
              </button> 
            <span id="card-title" className="name mt-3"><h4> {auth?.currentUser?.FirstName}   {auth?.currentUser?.LastName} </h4></span> 
            <span className="idd">@{auth?.currentUser?.UserName}</span> 
              
            <div className="d-flex flex-row justify-content-center align-items-center mt-3"> 
              <span className="info1">{auth?.currentUser?.Type}</span> 
            </div> 
            </div> 
          </div>

          {/* user reviews */}
          <div className="row">
          <div id="user-reviews " className="row mt-4"> 
            <ul className="list-group" id="reviews-list">
            <li class="list-group-item list-group-item-dark">
              <h5>Your Reviews</h5>
            </li>
              {userReviews.map(r => (
                <li className="list-group-item text-start" id="review" key="review"> 
                  ReviewID: {r.ReviewID} <br></br>
                  Property: {r.AddressLine1} <br></br><br></br>
                  Comments: {r.Comments} <br></br>
                </li>
              ))}
            </ul> 
          </div>  
          </div>

          </div>
        </div>
        </div>

              <button id="btn-logout" className="btn btn-secondary mt-8 ml-2" onClick={auth.logout}>
                Log Out
              </button>
          

      <div style={{height:"200px"}}>
      </div>
          </div>}
        <NavBar />
    </div>

  )
}

//  d-flex 