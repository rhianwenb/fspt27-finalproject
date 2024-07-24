import React from 'react'
import '../styles/PropertyPopup.css'
// import home from '../assets/home.png'

export default function PropertyPopup( {store}) {
    console.log(store)

    // get review information based on propertyID

    // get username info (necessary?) 

    // go to review / property page

    return (
        <div className="popup">
        <div className="popup-header">
            <h2>{store.name}</h2>
        </div>
        <div className="popup-body">
            <div className="rating">
                ★★★★☆
            </div>
            <div className="tags">
                <div className="tag">Noisy</div>
                <div className="tag">Family Friendly</div>
                <div className="tag">Secure</div>
            </div>
            <div className="buttons">
                <a className="button">See review</a> 
                <a className="button">See property</a>
            </div>
            <div className="username">
                Username
            </div>
        </div>
    </div>
    )
}