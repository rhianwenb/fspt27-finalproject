import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import NavBar from '../components/NavBar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Questions from '../components/Questions'

import "../styles/Property.css"

export default function Property() {
    const id = useParams().id;
    const navigate = useNavigate();

    const [averageReview, setAverageReview] = useState(50);
    const [reviews, setReviews] = useState();
    const [commentsDisplay, setCommentsDisplay] = useState("Questions");

    function getReviews(){
      axios.get(`/api/reviews/property/${id}`)
      .then(response=>{
        setReviews(response.data)
        console.log(response.data)
      })
      .catch(err=>{
        console.log(err)
    })
  }


    function getAverageRating(){
      //Loop through all objects in an array, and get Rating 1
      if(reviews){
        let ratings = reviews.map(item=>item.Rating1);

      let average = ratings.reduce((a,b)=>a+b) / ratings.length

      setAverageReview((average*100)/5);
      }
      
  }


  useEffect(()=>{
    getAverageRating()
  }, [reviews])
    

     

    function formatDate(strDate){
      let date = new Date(strDate);

      let months = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
      ];

      return `${months[date.getMonth()]} ${date.getFullYear()}`
  }

    

    useEffect(()=>{
      getReviews()
    }, [])

  return (
    <div id="Property">
        <h2>Property</h2>
        { reviews && 
          <h3>{reviews[0].FormattedAddress}</h3>}

        <div style={{textAlign:"left"}}>
            <p>Average Review</p>

            <div className='bg' 
            style={averageReview>=50?
              {backgroundImage:`linear-gradient(to right, #FF6600 ${averageReview}%, #d9d9d9 ${100-averageReview}%`}:
              {backgroundImage:`linear-gradient(to left, #d9d9d9 ${100-averageReview}%, #FF6600 ${averageReview}%`}
            }
            ></div>


        </div>

          <p style={{textAlign:"left", marginTop:"45px"}}>Reviews</p>
        {reviews && 
          reviews.map(r=>(
            <div key={r.ReviewID} className='review'>
              <div>
                <p style={{margin:"0"}}>From {r.UserName}</p>
                <p style={{fontSize:"0.8em", color:"#aaaaaa", margin:"8px 0"}}>{formatDate(r.MovingIn)} - {formatDate(r.MovingOut)}</p>
                

                  <div className='bg' 
                  style={r.Rating1>=3?
                  {backgroundImage:`linear-gradient(to right, #FF6600 ${r.Rating1*20}%, #d9d9d9 ${100-(r.Rating1*20)}%`, width:"100px", height:"20px"}:
                  {backgroundImage:`linear-gradient(to left, #d9d9d9 ${100-(r.Rating1*20)}%, #FF6600 ${(r.Rating1*20)}%`}
                  }
                  ></div>

                  <button onClick={()=>navigate(`/review/${r.ReviewID}`)}>See review</button>
              </div>

              <p style={{margin:"0"}}>{r.Comments}</p>
              
            </div>
          ))
        }

        {commentsDisplay==="Questions" &&
          <Questions id={id} />
        }
        

        <div style={{height:"200px"}}></div>
        


        <NavBar />
    </div>
  )
}
