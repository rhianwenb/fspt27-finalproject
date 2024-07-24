import React from 'react';
import axios from "axios"; 
import '../styles/EditUser.css';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext.js';
import NavBar from '../components/NavBar';
import Profile from '../pages/Profile';



export default function EditUser() {


    const [updatedUser, setUpdatedUser] = useState({
        FirstName: "",
        LastName: "",
        UserName: "",
        EmailAddress: "",
        Password: "",
        Age: "",
        Type: "",
    });

    const navigate = useNavigate();

    const handleUserChange = (e) => {
        const {name, value} = e.target;
        setUpdatedUser((user) => ({ ...user, [name]: value}));
    }

    const handleUserSubmit = (e) => {
      e.preventDefault();
        editUser(updatedUser);
        setUpdatedUser({    
            FirstName: "",
            LastName: "",
            UserName: "",
            EmailAddress: "",
            Password: "",
            Age: "",
            Type: "",
        });
    };

    const editUser = async (e) => {
        try {
            const {data} = await axios(`api/users/${localStorage.getItem("userid")}`, {
                method: "POST",
                data: newUser
            });
            console.log("Update successful");
            navigate("/profile");
        }
        catch (error) {
            console.log(error.response.data);
        };
    };

    const auth = useContext(AuthContext);

  return (

    <div id="registeruser"> 
    
    <div style={{height:"20px"}}></div>
        
        <div className="mb-3"><h3>Update your profile information</h3></div>

                <form>
                <br></br>
                
                  <label style={{gridArea:"1/1/span 1/span 7"}}>
                  <p>You only need to enter the information you want to change!git pus</p>
                    <input 
                    type="text" 
                    placeholder={auth?.currentUser?.FirstName}
                    name="FirstName" 
                    value={updatedUser.FirstName} 
                    onChange={handleUserChange}/>
                  </label>           
    
                  <label style={{gridArea:"2/1/span 1/span 7"}}>
                      {/* <p>Last Name</p> */}
                    <input 
                    type="text" 
                    placeholder={auth?.currentUser?.LastName}
                    name="LastName" 
                    value={updatedUser.LastName} 
                    onChange={handleUserChange}/>
                  </label>  

                  <label style={{gridArea:"3/1/span 1/span 7"}}>
                      {/* <p>Username</p> */}
                    <input 
                    type="text" 
                    placeholder={auth?.currentUser?.UserName}
                    name="UserName" 
                    value={updatedUser.UserName} 
                    onChange={handleUserChange}/>
                  </label>
                   
                  <label style={{gridArea:"4/1/span 1/span 7"}}>
                      {/* <p>Age</p>  */}
                    <input 
                    type="text" 
                    placeholder={auth?.currentUser?.Age}
                    name="Age" 
                    value={updatedUser.Age} 
                    onChange={handleUserChange}/>
                  </label>
                
                  <label style={{gridArea:"5/1/span 1/span 7"}}>
                      {/* <p>Email Address</p> */}
                    <input 
                    type="text" 
                    placeholder={auth?.currentUser?.EmailAddress} 
                    name="EmailAddress" 
                    value={updatedUser.EmailAddress} 
                    onChange={handleUserChange}/>
                  </label>
                  
                  <label style={{gridArea:"6/1/span 1/span 7"}}>
                      {/* <p>Password</p> */}
                    <input 
                    type="password" 
                    placeholder="Enter a secure password" 
                    name="Password" 
                    value={updatedUser.Password} 
                    onChange={handleUserChange}/>
                  </label> 
           
            
                  <div style={{gridArea:"8/1/span 1/span 4", marginTop:"20px"}}>  
                    <button 
                        onClick={() => navigate("/profile")}
                        style={{width:"fit-content"}}>
                        Back to Profile
                    </button>
                    <button 
                      style={{width:"fit-content"}}
                      type="submit" 
                      onClick={handleUserSubmit}>
                        Submit
                    </button>
                  </div>

                </form>

            <div style={{height:"250px"}}></div>

        <NavBar />
    </div>
  )
};
