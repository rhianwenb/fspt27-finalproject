import React from 'react';
import axios from 'axios';
import { useState, useContext } from 'react';
import NavBar from '../components/NavBar';
import RegisterUser from '../components/RegisterUser.jsx';
import Login from '../components/Login.jsx';
import AuthContext from '../context/AuthContext.js';


export default function Profile() {

  const [data, setData] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const login = async (credentials) => {
    e.preventDefault();
    try {
      const { data } = await axios("/api/users/login", {
        method: "POST",
        data: credentials
      });
      localStorage.setItem("token", data.token);
      setIsLoggedIn(true);
      console.log(data.message);
    }
    catch (error) {
      console.log(error);
    }   
  };

  const logout = () => {
    e.preventDefault();
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    console.log("Logout successful");
  };

    // request private data
    const userProfile = async () => {
      try {
        const { data } = await axios("/api/users/profile", {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        setData(data.message);
      }
      catch (err) {
        console.log(err);
        setData(err.message);
      }
     };


     const authObject = {isLoggedIn, login, logout}

  return (

    <AuthContext.Provider value={authObject}>





    <div>
        
        <Login/>

        <div className="mt-3">
          Not a user yet? <a href="">Register here.</a>
        </div>
        
        <RegisterUser/>
        

        <NavBar />
    </div>
    </AuthContext.Provider>
  )
}
