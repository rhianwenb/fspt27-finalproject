import React, { useEffect, useState } from 'react'

import "../styles/Review.css"
import axios from 'axios'
import { useParams } from 'react-router-dom'

import NavBar from "../components/NavBar"

export default function Review() {

    useEffect(()=>{
        getReview(),
        loopInRatings()
    }, [])

    
    
    let sampleProperty = {
        AddressLine1 : "",
        City : ""
    }

    let sampleUser = {
        UserName : ""
    }

    let sampleReview = {
        sampleProperty,
        sampleUser,
        ReviewDate:"",
        Rating1 : null,
        Rating2 : null,
        Rating3 : null,
        Rating4 : null,
        Rating5 : null,
        Rating6 : null,
        Rating7 : null,
        Comments : ""
    }

    const [review, setReview] = useState(sampleReview);

    const id = useParams().id;

    function getReview (){
        

        axios.get(`/api/reviews/review/${id}`)
        .then( response => {
            setReview(response.data[0])
        })
        .catch(err=>{
            console.log(err)
        })
    }

    //Pseudo code for ratings
    //Create a function that creates an array for each function with the name and the rating from the object
    //Use effect for all ratings


    const [ratings,setRatings]= useState({
        general:[],
        noise:[],
        security:[],
        neighbours:[],
        landlord:[],
        amenities:[],
        commonareas:[]
    })

    

    function loopInRatings(){

        let newRating = {...ratings};
        let index = 1;

        for(let key in newRating){
            let num = review[`Rating`+index];

            newRating[key] = [];

            for(let i = 0;i<5;i++){
                i>=num? newRating[key].push(0) : newRating[key].push(1)
            }

            index++;
        }

        setRatings(newRating)

    }

    // function test(){
    //     ratings.general.map((s)=>{
    //         conso
    //     })
    // }

    

  return (
    <div>
        <h2>{review.AddressLine1} - {review.City}</h2>

        <p>From <span style={{color:" #4DBEFF", cursor:"pointer"}}>{review.UserName}</span></p>
        <p>On the {review.ReviewDate}</p>

        
        <div className='callout'>
            { ratings.general[0] &&
                
            ratings.general.map((s,index)=>(
                <svg key={index} version="1.0" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" className={s===1?"FillStar":"EmptyStar"}
                    width="30px" height="30px" viewBox="0 0 64 64" enableBackground="new 0 0 64 64" xmlSpace="preserve" >
                <path fill="#d9d9d9" d="M62.799,23.737c-0.47-1.399-1.681-2.419-3.139-2.642l-16.969-2.593L35.069,2.265
                      C34.419,0.881,33.03,0,31.504,0c-1.527,0-2.915,0.881-3.565,2.265l-7.623,16.238L3.347,21.096c-1.458,0.223-2.669,1.242-3.138,2.642
                      c-0.469,1.4-0.115,2.942,0.916,4l12.392,12.707l-2.935,17.977c-0.242,1.488,0.389,2.984,1.62,3.854
                      c1.23,0.87,2.854,0.958,4.177,0.228l15.126-8.365l15.126,8.365c0.597,0.33,1.254,0.492,1.908,0.492c0.796,0,1.592-0.242,2.269-0.72
                      c1.231-0.869,1.861-2.365,1.619-3.854l-2.935-17.977l12.393-12.707C62.914,26.68,63.268,25.138,62.799,23.737z"/>
                </svg>
            ))}
            

        <p>{review.Comments}</p>
        </div>

        <p>Noise</p>
        <div className='specificRatings'>{ratings.noise[0] &&
            ratings.noise.map((s,index)=>(
                <div className={s===1?"FillCircle":"EmptyCircle"} key={index}></div>
            ))
        } </div>

        <p>Security</p>
        <div className='specificRatings'>{ratings.security[0] &&
            ratings.security.map((s,index)=>(
                <div className={s===1?"FillCircle":"EmptyCircle"} key={index}></div>
            ))
        } </div>

        <p>Neighbours</p>
        <div className='specificRatings'>{ratings.neighbours[0] &&
            ratings.neighbours.map((s,index)=>(
                <div className={s===1?"FillCircle":"EmptyCircle"} key={index}></div>
            ))
        } </div>

        <p>Landlord</p>
        <div className='specificRatings'>{ratings.landlord[0] &&
            ratings.landlord.map((s,index)=>(
                <div className={s===1?"FillCircle":"EmptyCircle"} key={index}></div>
            ))
        } </div>

        <p>Amenities</p>
        <div className='specificRatings'>{ratings.amenities[0] &&
            ratings.amenities.map((s,index)=>(
                <div className={s===1?"FillCircle":"EmptyCircle"} key={index}></div>
            ))
        } </div>

        <p>Common Areas</p>
        <div className='specificRatings'>{ratings.commonareas[0] &&
            ratings.commonareas.map((s,index)=>(
                <div className={s===1?"FillCircle":"EmptyCircle"} key={index}></div>
            ))
        } </div>

        <button className='buttonReview'>Send message to <span style={{fontWeight:"bold"}}>{review.UserName}</span></button>

        <div style={{height:"200px"}}></div>
        
        <NavBar />
        
    </div>
  )
}
