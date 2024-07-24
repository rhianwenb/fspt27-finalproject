import React from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext.js';
import Login from '../components/Login.jsx';
import '../styles/Header.css'

export default function Header() {

    const auth = useContext(AuthContext);
    const navigate = useNavigate();

  return (
    <div className="header">
        <container className="flex-container"> 
            { !auth.isLoggedIn && 
            <button 
                style={{fontSize:"1em"}} 
                onClick={() => navigate("/profile")}>
                <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#3580D2"><path d="M481-120v-60h299v-600H481v-60h299q24 0 42 18t18 42v600q0 24-18 42t-42 18H481Zm-55-185-43-43 102-102H120v-60h363L381-612l43-43 176 176-174 174Z"/></svg>
            </button>
            }

            { auth.isLoggedIn &&
            <button 
                style={{width:"fit-content"}} 
                onClick={auth.logout}>
                <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#3580D2"><path d="M180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h299v60H180v600h299v60H180Zm486-185-43-43 102-102H360v-60h363L621-612l43-43 176 176-174 174Z"/></svg>  
            </button>
            }
        
        </container>

    </div>
  )
}
