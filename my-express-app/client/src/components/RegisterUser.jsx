import React from 'react';
import axios from "axios"; 
import '../styles/RegisterUser.css'
import { useState, useEffect } from 'react';

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

    const handleUserChange = (e) => {
        const {name, value} = e.target;
        setNewUser((user) => ({ ...user, [name]: value}));
    }

    const handleUserSubmit = (e) => {
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
        }
        catch (error) {
            console.log(error.resopnse.data);
        };
    };

  return (
    <div> 
        <div><h1></h1></div>
        

        <div className="container col-md-8 offset-md-2" id="registeruser">
        <div className="mb-3"><h4>Enter your details below to create an account:</h4></div>
            <div className="row ">

                <form>
                <div className="form-box"> 

                  <div className="row mb-3">

                  <div className="col">
                    <label className="form-label">First Name</label>
                    <input type="text" placeholder="First name" className="form-control"
                    name="FirstName" value={newUser.FirstName} onChange={handleUserChange}/>
                  </div>  
                  <div className="col">
                    <label className="form-label">Last Name</label>
                    <input type="text" placeholder="Last name" className="form-control"
                    name="LastName" value={newUser.LastName} onChange={handleUserChange}/>
                  </div>  
                  </div>
                  
                  <div className="row mb-3">
                  <div className="col">  
                    <label className="form-label">Username</label>
                    <input type="text" placeholder="Create a username" className="form-control"
                    name="UserName" value={newUser.UserName} onChange={handleUserChange}/>
                  </div>
                  <div className="col">  
                    <label className="form-label">Age</label>
                    <input type="text" placeholder="Age" className="form-control"
                    name="Age" value={newUser.Age} onChange={handleUserChange}/>
                  </div>  
                  </div>
                  
                  <div className="row mb-3">  
                  <div className="col">  
                    <label className="form-label">Email Address</label>
                    <input type="text" placeholder="Enter your email" className="form-control"
                    name="EmailAddress" value={newUser.EmailAddress} onChange={handleUserChange}/>
                  </div>
                  <div className="col"> 
                    <label className="form-label">Password</label>
                    <input type="password" placeholder="Enter a secure password" className="form-control"
                    name="Password" value={newUser.Password} onChange={handleUserChange}/>
                  </div>
                  </div>

                  <div className="row mb-6">
                  <div className="col">  
                    <label className="form-label me-4">Are you a tenant or a landlord?</label>
                    <label className="form-label me-2">Tenant</label>
                    <input type="radio" className="form-check-input me-4"
                    name="Type" value="Tenant" checked={newUser.Type === "Tenant"} onChange={handleUserChange}></input>

                    <label className="form-label me-2">Landlord</label>
                    <input type="radio" className="form-check-input"
                    name="Type" value="Landlord" checked={newUser.Type === "Landlord"} onChange={handleUserChange}></input>

                    <div className="d-flex gap-2 justify-content-center mt-3">  
                        <button type="submit" className="btn btn-outline-dark ml-2" 
                        onClick={handleUserSubmit}>Submit</button>
                    </div> 

                  </div>  
                  </div>
 
                </div>  
                
                </form>

             
            </div>
        </div>
        
    </div>
  )
};
