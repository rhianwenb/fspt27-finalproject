import React from 'react';
import { useState, useEffect } from 'react';

export default function RegisterUser() {

    const [newUser, setNewUser] = useState({
        FirstName: "",
        LastName: "",
        UserName: "",
        EmailAddress: "",
        Password: "",
        Age: "",
        Type: ""
    });

    const handleUserChange = (e) => {
        const {name, value} = e.target;
        setNewUser({ ...newUser, [name]: value});
    }

  return (
    <div> 
        <div><h1>Register</h1></div>
        

        <div className="container">
        <div><h3>Enter your details below to create an account:</h3></div>
            <div className="row">
                <form>
                    <label className="form-label">First Name</label>
                    <input type="text" placeholder="First name"></input>

                    <label className="form-label">Last Name</label>
                    <input type="text" placeholder="Last name"></input>

                    <label className="form-label">UserName</label>
                    <input type="text" placeholder="Create a username"></input>

                    <label className="form-label">Email Address</label>
                    <input type="email" placeholder="Enter your email"></input>

                    <label className="form-label">Password</label>
                    <input type="password" placeholder="Enter a secure password"></input>

                    <label className="form-label">Date of Birth</label>
                    <input type="date"></input>

                    <label className="form-label">Tenant</label>
                    <input type="checkbox"></input>

                    <label className="form-label">Landlord</label>
                    <input type="checkbox"></input>

                    <button type="submit">Submit</button>

                </form>
            </div>
        </div>

    </div>
  )
};
