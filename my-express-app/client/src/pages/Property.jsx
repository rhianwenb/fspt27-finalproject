import React from 'react'
import NavBar from '../components/NavBar'

import "../styles/Property.css"

export default function Property() {

    let sampleRatings = [5,4,3,2,5,4]

    function getAverageRating(){
        let average = sampleRatings.reduce((a,b)=>a+b) / sampleRatings.length
        console.log(average)
    }

    getAverageRating()

  return (
    <div id="Property">
        <h2>Property</h2>
        <h3>Address</h3>

        <div style={{textAlign:"left"}}>
            <p>Average Review</p>

            <div id="averageRating">
            <svg width="600" height="400">
  <mask id="svgmask2">
    <polygon fill="#ffffff" points="100,10 40,198 190,78 10,78 160,198"></polygon>
  </mask>
  <image xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="https://images.unsplash.com/photo-1721002309163-9daa008925a7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzOXx8fGVufDB8fHx8fA%3D%3D" mask="url(#svgmask2)"></image>
</svg>
            </div>
        </div>
        


        <NavBar />
    </div>
  )
}
