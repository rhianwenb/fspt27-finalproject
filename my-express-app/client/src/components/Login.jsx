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
        if (auth.login(credentials)) { 
            setCredentials({
                UserName: "",
                Password: "",
              });
              navigate("/profile");
        }
        else if (auth.error) {
        alert("User Not Found! Please register at the link below.")
        };
    };
    
    const logout = (e) => {
        e.preventDefault();
        auth.logout(credentials);
    };



  return (
    <div id="login">
        <br></br>
         
        <div className="mb-3"><h2> Login </h2></div>
        <div className="mb-3"><h3> Enter username and password </h3></div>
            
            <div>
                <form>

                        <label style={{gridArea:"1/ 1 / span 1 /span 6"}}>
                            <p>Username</p>
                            <input 
                            type="text"
                            name="UserName" 
                            value={UserName}
                            placeholder="Username " 
                            onChange={handleChange}/>
                        </label>
     
                        <label style={{gridArea:"2/ 1 / span 1 /span 6"}}>
                            <p>Password</p>
                            <input 
                            type="password"
                            name="Password" 
                            value={Password}
                            placeholder="Password " 
                            onChange={handleChange}/>
                        </label>    
           
                        <div style={{gridArea:"5/1/span 1/span 4", marginTop:"20px"}}>
                            <button 
                                style={{width:"fit-content"}} 
                                onClick={login}>
                                    Log In
                            </button>
                            <button 
                                style={{width:"fit-content"}} 
                                onClick={() => navigate("/register")}>
                                    Register
                            </button>
                        </div>

                    {/* </div> */}

                </form>
            </div>        
            <br></br>
            {/* <div className="mt-3" id="linktoregister">
                Not a user yet? <a href="/register"> Register here </a>
            </div> */}
       
    </div>
  )
};
