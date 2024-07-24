import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../styles/PropertyPopup.css'
// import home from '../assets/home.png'

export default function PropertyPopup( {store}) {

    useEffect(() => {
        getReview(store.key)
      }, [store.key]);
    // console.log(store)
    const navigate = useNavigate();

    // get review information based on propertyID
    const [reviewInfo, setReviewInfo] = useState({})
    const [numberOfReviews, setNumberOfReviews] = useState(0)

    async function getReview(id){
        // console.log('getting review info')
        try {
            const result = await axios.get(`/api/reviews/property/${id}`)
            console.log(result.data[0])
            setReviewInfo(result.data[0])
            setNumberOfReviews(result.data.length)
        } catch(e){
            console.log(e)
        }
    }


    return (
        <div className="popup">
        <div className="popup-header">
            <h2>{store.name}</h2>
        </div>
        <div className="popup-body">
            <div className="rating">
                ★★★★☆ ({numberOfReviews})
            </div>
            <div className="tags">
                <em>"{reviewInfo.Comments}"</em>
            </div>
        </div>
        <div className= "popup-footer">
            <div><button className="button" onClick={()=> navigate(`/property/${store.key}`)}>See all reviews</button></div>    
        </div>
    </div>
    )
}