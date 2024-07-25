import React from 'react'
import { useContext } from 'react';
import AddReviewContext from '../../context/AddReviewContext';

export default function Step3({changeStep}) {

  let {reviewInfo,setReviewInfo} = useContext(AddReviewContext)
  let functionPostReview = useContext(AddReviewContext).postReview

  function handleChange(event){
        let {name, value} = event.target;

        let newReview = {...reviewInfo};
        newReview[name]=Number(value);

        setReviewInfo(newReview)
  }

  return (

    <div id="step3">

        <div>
            <p className='info'>Rate based on your experience</p>
            <p className='info'>Very bad</p>
            <p className='info'>Bad</p>
            <p className='info'>Neutral</p>
            <p className='info'>Good</p>
            <p className='info'>Very good</p>


            <p>Noise</p>
            <input type="radio" name='Rating2' value="1" onChange={(event)=>handleChange(event)} />
            <input type="radio" name='Rating2' value="2" onChange={(event)=>handleChange(event)} />
            <input type="radio" name='Rating2' value="3" onChange={(event)=>handleChange(event)} />
            <input type="radio" name='Rating2' value="4" onChange={(event)=>handleChange(event)} />
            <input type="radio" name='Rating2' value="5" onChange={(event)=>handleChange(event)} />

            <p>Security</p>
            <input type="radio" name='Rating3' value="1" onChange={(event)=>handleChange(event)}  />
            <input type="radio" name='Rating3' value="2" onChange={(event)=>handleChange(event)}  />
            <input type="radio" name='Rating3' value="3" onChange={(event)=>handleChange(event)}  />
            <input type="radio" name='Rating3' value="4" onChange={(event)=>handleChange(event)}  />
            <input type="radio" name='Rating3' value="5" onChange={(event)=>handleChange(event)}  />

            <p>Neighbors</p>
            <input type="radio" name='Rating4' value="1" onChange={(event)=>handleChange(event)}  />
            <input type="radio" name='Rating4' value="2" onChange={(event)=>handleChange(event)}  />
            <input type="radio" name='Rating4' value="3" onChange={(event)=>handleChange(event)}  />
            <input type="radio" name='Rating4' value="4" onChange={(event)=>handleChange(event)}  />
            <input type="radio" name='Rating4' value="5" onChange={(event)=>handleChange(event)}  />

            <p>Landlord</p>
            <input type="radio" name='Rating5' value="1" onChange={(event)=>handleChange(event)}  />
            <input type="radio" name='Rating5' value="2" onChange={(event)=>handleChange(event)}  />
            <input type="radio" name='Rating5' value="3" onChange={(event)=>handleChange(event)}  />
            <input type="radio" name='Rating5' value="4" onChange={(event)=>handleChange(event)}  />
            <input type="radio" name='Rating5' value="5" onChange={(event)=>handleChange(event)}  />

            <p>Amenities</p>
            <input type="radio" name='Rating6' value="1" onChange={(event)=>handleChange(event)}  />
            <input type="radio" name='Rating6' value="2" onChange={(event)=>handleChange(event)}  />
            <input type="radio" name='Rating6' value="3" onChange={(event)=>handleChange(event)}  />
            <input type="radio" name='Rating6' value="4" onChange={(event)=>handleChange(event)}  />
            <input type="radio" name='Rating6' value="5" onChange={(event)=>handleChange(event)}  />

            <p>Common areas</p>
            <input type="radio" name='Rating7' value="1" onChange={(event)=>handleChange(event)}  />
            <input type="radio" name='Rating7' value="2" onChange={(event)=>handleChange(event)}  />
            <input type="radio" name='Rating7' value="3" onChange={(event)=>handleChange(event)}  />
            <input type="radio" name='Rating7' value="4" onChange={(event)=>handleChange(event)}  />
            <input type="radio" name='Rating7' value="5" onChange={(event)=>handleChange(event)}  />
        </div>

        <aside style={{ marginTop:"20px", width:"100%"}}><button style={{width:"fit-content",margin:"auto"}}
              onClick={()=>functionPostReview()}
            >Submit my review</button></aside>



        <div style={{height:"200px"}}></div>
    </div>
  )
}
