import React from 'react';
import axios from 'axios';
import { useState} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AuthContext from './context/AuthContext.js';
import NavBar from './components/NavBar'
import RegisterUser from './pages/RegisterUser.jsx';
import Login from './components/Login.jsx';
import './App.css'



import Search from './pages/Search'
import DisplayOnMap from './pages/DisplayOnMap'
import AddAReview from './pages/AddAReview'
import Community from './pages/Community'
import Profile from './pages/Profile'
import NavContext from './context/NavContext';



function App() {

  const [currentPage, setCurrentPage] = useState("Search");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  console.log(userData, isLoggedIn);

  const login = async (credentials) => {
    try {
      const { data } = await axios("/api/users/login", {
        method: "POST",
        data: credentials
      });
      localStorage.setItem("token", data.token);
      setIsLoggedIn(true);
      setUserData(data.existingUser)
      console.log(data.message);
    }
    catch (error) {
      console.log(error);
    }   
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserData(null);
    console.log("Logout successful");
  };

  const authObject = {isLoggedIn, userData, login, logout}


  return (
    <>

        <h1 style={{margin:"5px auto"}}>NextTenant</h1>

      <NavContext.Provider value={{currentPage, setCurrentPage}}>
      <AuthContext.Provider value={authObject}>

        <Router>
          <Routes>
            <Route path="/" element={<Search />}/>
            <Route path="/displayonmap" element={<DisplayOnMap />}/>
            <Route path="/addareview" element={<AddAReview />}/>
            <Route path="/community" element={<Community />}/>
            <Route path="/profile" element={<Profile />}/>
            <Route path="/register" element={<RegisterUser />}/>          
          </Routes>
        </Router>
        
      </AuthContext.Provider>   
      </NavContext.Provider>
        
      
    </>
  )
}

export default App
