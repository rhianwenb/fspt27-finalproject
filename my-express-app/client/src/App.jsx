import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Message } from 'rsuite';
import AuthContext from './context/AuthContext.js';
import NavBar from './components/NavBar'
import RegisterUser from './pages/RegisterUser.jsx';
import Login from './components/Login.jsx';
import './App.css'




import DisplayMap from './pages/DisplayMap'
import AddAReview from './pages/AddAReview'
import Profile from './pages/Profile';
import NavContext from './context/NavContext';
import EditUser from './components/EditUser.jsx';
import Review from './pages/Review.jsx';
import Property from './pages/Property.jsx';




function App() {

  const [currentPage, setCurrentPage] = useState("displayonmap");
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [currentUser, setCurrentUser] = useState();

  console.log(currentUser, isLoggedIn);

  
  useEffect(() => {
    const loggedInUser = localStorage.getItem("userid");
    const fetchUserProfile = async () => {
      if (loggedInUser) {
        try {
          const res = await axios.get(`/api/users/${loggedInUser}`);
          setCurrentUser(res.data[0]);
        } catch (err) {
          console.error(err);
        }
      };
    };
    fetchUserProfile();
  }, []);
  

  const login = async (credentials) => {
    try {
      const { data } = await axios("/api/users/login", {
        method: "POST",
        data: credentials
      });
      localStorage.setItem("userid", JSON.stringify(data.existingUser.UserID));
      localStorage.setItem("token", data.token);
      setIsLoggedIn(true);
      setCurrentUser(data.existingUser);
      console.log(data.message);
    }
    catch (error) {
      console.log(error);
      <Message type="warning">
      <strong>User Not Found!</strong> Please register at the link below.
      </Message>
    }   
  };

  const logout = () => {
    localStorage.removeItem("userid");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setCurrentUser({});
    console.log("Logout successful");
  };



  const authObject = {isLoggedIn, currentUser, login, logout};


  return (
    <>

        <h1 style={{margin:"5px auto"}}>NextTenant</h1>

      <NavContext.Provider value={{currentPage, setCurrentPage}}>
      <AuthContext.Provider value={authObject}>

        <Router>
          <Routes>

            <Route path="/" element={<DisplayMap />}/>
            <Route path="/addareview" element={<AddAReview />}/>
            <Route path="/profile" element={<Profile />}/>   
            <Route path="/edituser" element={<EditUser/>} />      
            <Route path="/review/:id" element={<Review />} />
            <Route path="/register" element={<RegisterUser />}/> 
            <Route path="/property/:id" element={<Property />} />    

          </Routes>
        </Router>
        
      </AuthContext.Provider>   
      </NavContext.Provider>
        
      
    </>
  )
}

export default App
