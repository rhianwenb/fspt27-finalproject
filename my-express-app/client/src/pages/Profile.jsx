import React from 'react';
import axios from 'axios';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import RegisterUser from './RegisterUser.jsx';
import Login from '../components/Login.jsx';
import AuthContext from '../context/AuthContext.js';


export default function Profile() {


  const auth = useContext(AuthContext);


    // request private data
    // const userProfile = async () => {
    //   try {
    //     const { data } = await axios("/api/users/profile", {
    //       headers: {
    //         authorization: "Bearer " + localStorage.getItem("token"),
    //       },
    //     });
    //     setData(data.message);
    //   }
    //   catch (err) {
    //     console.log(err);
    //     setData(err.message);
    //   }
    //  };

    // // GET user data
    // const userData = async () => {
    //   const id = auth.userId;
    //   try {
    //     const {data} = await axios(`api/users/${id}`, {
    //       headers: {
    //         authorization: "Bearer " + localStorage.getItem("token"),
    //       },
    //     });
    //   }
    //   catch (err) {
    //     console.log(err);
    //     setData(err.message);
    //   }
    // }
   
  return (


    <div>
        
        { !auth.isLoggedIn && <Login/> }
        
        { auth.isLoggedIn && <div>
          
        <div>
        <div className="container mt-4 mb-4 p-4 d-flex justify-content-center"> 
          <div className="card p-4"> 
            <div className=" image d-flex flex-column justify-content-center align-items-center"> 
              <button className="btn btn-secondary"> 
                <img src="https://static.vecteezy.com/system/resources/previews/024/183/502/original/male-avatar-portrait-of-a-young-man-with-a-beard-illustration-of-male-character-in-modern-color-style-vector.jpg" 
                 className="rounded" height="100" width="100" />
              </button> 
            <span className="name mt-3">{auth.userData.FirstName}   {auth.userData.LastName}</span> 
            <span className="idd">@{auth.userData.UserName}</span> 
            <div className="d-flex flex-row justify-content-center align-items-center gap-2"> 
              <span className="idd1">{auth.userData.EmailAddress}</span> 
              <span><i className="fa fa-copy"></i></span> 
            </div> 
          <div className="d-flex flex-row justify-content-center align-items-center mt-3"> 
            <span className="number">Age: {auth.userData.Age}</span> </div> 
          <div className=" px-2 rounded mt-4 date "> <span className="join">Joined May, 2021</span> </div> 
          </div> 
        </div>
        </div>

        </div>

          <button className="btn btn-outline-dark mt-8 ml-2 " onClick={auth.logout}>
            Log Out
          </button>
          </div>}
        <NavBar />
    </div>

  )
}
