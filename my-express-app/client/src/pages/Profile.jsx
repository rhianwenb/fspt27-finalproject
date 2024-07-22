import React from 'react';
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Login from '../components/Login.jsx';
import EditUser from '../components/EditUser.jsx';
import AuthContext from '../context/AuthContext.js';
import '../styles/Profile.css';


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

  const profilePhotos = {
    1: "/profile-photos/cat-user-1.png",
    2: "/profile-photos/wolf-user-2.png",
    3: "/profile-photos/sea-lion-user-3.png",
    4: "/profile-photos/sloth-user-4.png",
    5: "/profile-photos/puffer-fish-user-5.png",
    6: "/profile-photos/bear-user-6.png",
    7: "/profile-photos/cow-user-7.png",
    8: "/profile-photos/lion-user-8.png",
    9: "/profile-photos/hedgehog-user-9.png"
  };
  
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  useEffect(() => {  
    const getUserReviews = async () => {

      //If the user is logged in
      if(auth.isLoggedIn){

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
      }
    
    };
    getUserReviews();
  }, []);



  return (

    <div>

      <div id="profile">
        
        { !auth.isLoggedIn && <Login/> }       
        { auth.isLoggedIn && <div>
                   
          <div style={{height:"50px"}}></div>

        <div>
          
          {/* main profile data */}
          <div className="card-user"
          style={{gridArea: "2 / 1 / span 2 / span 3"}}>
            <div > 
                <img src={profilePhotos[localStorage.getItem("userid")]} 
                 className="rounded-circle" height="150" width="150" />
            </div>

            <span className="card-title"><h4 style={{color: "#3580D2", fontWeight: "500"}}> {auth?.currentUser?.FirstName}   {auth?.currentUser?.LastName} </h4></span> 
            <span >@{auth?.currentUser?.UserName}  </span> <br></br>
            <span >{auth?.currentUser?.Type}</span> 
           
          </div>

          <div style={{height:"50px"}}></div>
          {/* user reviews */}

          <div className="card-reviews" > 
            <ul className="reviews-list" >
              
            <li className="list-group-item">
              <h5 style={{color: "#3580D2", fontWeight: "500"}}>Your Reviews</h5></li>
              {userReviews?.map(r => (
                <li className="list-group-item" 
                 
                key="user-review"> 
                  ReviewID: {r?.ReviewID} <br></br>
                  <br></br>
                  Comments: {r?.Comments} <br></br>

                </li>
              ))}
            </ul> 
          </div>  

        </div>

              <button className="profile-btn"
                style={{width:"fit-content"}}
                onClick={auth.logout}>
                  Log Out
              </button>
              <button className="profile-btn"
                onClick={() => navigate("/edituser")}
                style={{width:"fit-content"}}>
                  Edit Profile
              </button>
          

      <div style={{height:"200px"}}></div>
          </div>}
        
        <NavBar />

        </div>
    </div>

  )
}

//  d-flex 