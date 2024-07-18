import React from 'react';
import { useState, useContext } from 'react';
import axios from "axios"; 
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import AuthContext from '../context/AuthContext';



export default function Login() {

    const auth = useContext(AuthContext);
    // console.log(auth.isLoggedIn);
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        UserName: "",
        Password: "",
    });

    const {UserName, Password} = credentials;

    const handleChange = (e) => {
        e.preventDefault();
        const {name, value} = e.target;
        setCredentials({...credentials, [name]: value});
    };

    const login = async (e) => {
        e.preventDefault();
        auth.login(credentials);
        setCredentials({
            UserName: "",
            Password: "",
          })
          navigate("/profile");
    };
    
    const logout = (e) => {
        e.preventDefault();
        auth.logout(credentials);
    };



  return (
    <div>
        <div className="container col-sm-6 offset-md-3" id="login"> 
        <div className="mb-3"><h4> To login enter your username and password: </h4></div>
            
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
            <div className="mt-3">
                Not a user yet? <a href="/register">Register here. </a>
            </div>
        </div>
    </div>
  )
};
