import React from 'react';
import { useState } from 'react';
import axios from "axios"; 
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

export default function Login() {

    const [credentials, setCredentials] = useState({
        UserName: "",
        Password: "",
    });

    const {UserName, Password} = credentials;

    const handleChange = (e) => {
        const {name, value} = e.target;
        setCredentials({...credentials, [name]: value});
    };

    const login = async (e) => {
        e.preventDefault();
        try {
          const { data } = await axios("/api/users/login", {
            method: "POST",
            data: credentials
          });
          localStorage.setItem("token", data.token);
          console.log(data.message);
          setCredentials({
            UserName: "",
            Password: "",
          })
        }
        catch (error) {
          console.log(error);
        }   
      };

      const logout = () => {
        e.preventDefault();
        localStorage.removeItem("token");
        console.log("Logout successful");
      };

  return (
    <div>
        <div className="container col-sm-6 offset-md-3" id="login"> 
        <div className="mb-3"><h4> Login: Enter username or email address </h4></div>
            
            <div className="col-md">
                <form>
                    <div className="form-box">
                    <div className="row mb-3">
                        <div className="col">
                        <label className="form-label">Username</label>
                            <input className="form-control"
                            name="UserName" value={UserName}
                            placeholder="Username " type="text"
                            onChange={handleChange}/>
                        </div>
                    </div>
                    {/* <div className="row mb-3">
                        <div className="col">
                        <label className="form-label">Email Address</label>
                            <input className="form-control"
                            name="EmailAddress" value={EmailAddress}
                            placeholder="Email address " type="text"
                            onChange={handleChange}/>
                        </div>
                    </div>     */}
                    <div className="row mb-3">                        
                        <div className="col">
                        <label className="form-label">Password</label>
                            <input className="form-control"
                            name="Password" value={Password}
                            placeholder="Password " type="password"
                            onChange={handleChange}/>
                        </div>
                    </div>    
                        <div className="d-flex gap-2 justify-content-center mt-3">
                            <button className="btn btn-outline-dark ml-2" onClick={login}>
                                Log In
                            </button>
                            <button className="btn btn-outline-dark ml-2" onClick={logout}>
                                Log Out
                            </button>
                        </div>
                    </div>

                </form>
            </div>        
        </div>
    </div>
  )
};
