import React, {useEffect, useState, useContext} from 'react'
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
            // console.log(result.data[0])
            setReviewInfo(result.data[0])
            setNumberOfReviews(result.data.length)
            getAverageRating(result.data)
        } catch(e){
            console.log(e)
        }
    }

    // Get average reviews
    const [averageReview, setAverageReview] = useState(50);

    function getAverageRating(review){
      //Loop through all objects in an array, and get Rating 1
    //   console.log(review)
      let ratings = review.map(item=>item.Rating1);
      let average = ratings.reduce((a,b)=>a+b) / ratings.length

      setAverageReview((average*100)/5);
  }



    return (

        <div className="popup">
            <div className="popup-header">
                <h2>{store.name}</h2>
            </div>
            <div className="popup-body">
                {/* <div className='sm' style={ averageReview >= 50 ?
                        { backgroundImage: `linear-gradient(to right, #FF6600 ${averageReview}%, #d9d9d9 ${100 - averageReview}%` } :
                        { backgroundImage: `linear-gradient(to left, #d9d9d9 ${100 - averageReview}%, #FF6600 ${averageReview}%` }}>
                            
                </div>
                <p style={{ textAlign:'right'}}>({numberOfReviews})</p> */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
    <div className='sm' style={ averageReview >= 50 ?
            { backgroundImage: `linear-gradient(to right, #FF6600 ${averageReview}%, #d9d9d9 ${100 - averageReview}%)` } :
            { backgroundImage: `linear-gradient(to left, #d9d9d9 ${100 - averageReview}%, #FF6600 ${averageReview}%)`, flexGrow: 1 }
            }>
    </div>
    <p style={{ textAlign: 'left', marginTop:'18px', marginRight:'10px', color:'#aaaaaa'}}><em>({numberOfReviews})</em></p>
</div>
                <div className="tags">
                <em>"{reviewInfo.Comments}"</em>
                </div>
            </div>
            <div className="popup-footer">
                <div><button className="button" onClick={() => navigate(`/property/${store.key}`)}>See all reviews</button></div>
            </div>
        </div>
    )
}