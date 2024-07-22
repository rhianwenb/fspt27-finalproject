import React from 'react';
import axios from "axios"; 
import '../styles/RegisterUser.css'
import { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import { useNavigate } from 'react-router-dom';

export default function RegisterUser() {

    const [newUser, setNewUser] = useState({
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
        setNewUser((user) => ({ ...user, [name]: value}));
    }

    const handleUserSubmit = (e) => {
      e.preventDefault();
        registerUser(newUser);
        setNewUser({    
            FirstName: "",
            LastName: "",
            UserName: "",
            EmailAddress: "",
            Password: "",
            Age: "",
            Type: "",
        });
    };

    const registerUser = async (e) => {
        try {
            const {data} = await axios("api/users/register", {
                method: "POST",
                data: newUser
            });
            console.log("Registration successful");
            navigate("/profile");
        }
        catch (error) {
            console.log(error.resopnse.data);
        };
    };

  return (

    <div id="registeruser"> 
    <br></br>
        <div><h2>Register</h2></div>
        <div className="mb-3"><h3>Enter your details to create an account:</h3></div>

                <form>

                  <label style={{gridArea:"1/1/span 1/span 7"}}>
                      <p> First Name </p>
                    <input 
                    type="text" 
                    placeholder="First name" 
                    name="FirstName" 
                    value={newUser.FirstName} 
                    onChange={handleUserChange}/>
                  </label>           
    
                  <label style={{gridArea:"2/1/span 1/span 7"}}>
                      <p>Last Name</p>
                    <input 
                    type="text" 
                    placeholder="Last name" 
                    name="LastName" 
                    value={newUser.LastName} 
                    onChange={handleUserChange}/>
                  </label>  

                  <label style={{gridArea:"3/1/span 1/span 7"}}>
                      <p>Username</p>
                    <input 
                    type="text" 
                    placeholder="Create a username" 
                    name="UserName" 
                    value={newUser.UserName} 
                    onChange={handleUserChange}/>
                  </label>
                   
                  <label style={{gridArea:"4/1/span 1/span 7"}}>
                      <p>Age</p> 
                    <input 
                    type="text" 
                    placeholder="Age" 
                    name="Age" 
                    value={newUser.Age} 
                    onChange={handleUserChange}/>
                  </label>
                
                  <label style={{gridArea:"5/1/span 1/span 7"}}>
                      <p>Email Address</p>
                    <input 
                    type="text" 
                    placeholder="Enter your email" 
                    name="EmailAddress" 
                    value={newUser.EmailAddress} 
                    onChange={handleUserChange}/>
                  </label>

                  <label style={{gridArea:"6/1/span 1/span 7"}}>
                      <p>Password</p>
                    <input 
                    type="password" 
                    placeholder="Enter a secure password" 
                    name="Password" 
                    value={newUser.Password} 
                    onChange={handleUserChange}/>
                  </label>
           
            
                  <span style={{gridArea:"7/1/span 1/span 7"}} id="radioinput">
                  <label>Are you a tenant or a landlord?</label><br></br>
                  <label>Tenant</label>
                    <input type="radio" 
                    name="Type" value="Tenant" 
                    checked={newUser.Type === "Tenant"} 
                    onChange={handleUserChange}></input>

                  <label>Landlord</label>
                    <input type="radio" 
                    name="Type" value="Landlord" 
                    checked={newUser.Type === "Landlord"} 
                    onChange={handleUserChange}></input>
                  </span>

                  <div style={{gridArea:"8/1/span 1/span 4", marginTop:"20px"}}>  
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
