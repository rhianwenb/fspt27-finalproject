import React from 'react'

export default function Step3({changeStep}) {
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
            <input type="radio" name='noise' />
            <input type="radio" name='noise' />
            <input type="radio" name='noise' />
            <input type="radio" name='noise' />
            <input type="radio" name='noise' />

            <p>Security</p>
            <input type="radio" name='security' />
            <input type="radio" name='security' />
            <input type="radio" name='security' />
            <input type="radio" name='security' />
            <input type="radio" name='security' />

            <p>Neighbors</p>
            <input type="radio" name='neighbors' />
            <input type="radio" name='neighbors' />
            <input type="radio" name='neighbors' />
            <input type="radio" name='neighbors' />
            <input type="radio" name='neighbors' />

            <p>Landlord</p>
            <input type="radio" name='landlord' />
            <input type="radio" name='landlord' />
            <input type="radio" name='landlord' />
            <input type="radio" name='landlord' />
            <input type="radio" name='landlord' />

            <p>Amenities</p>
            <input type="radio" name='amenities' />
            <input type="radio" name='amenities' />
            <input type="radio" name='amenities' />
            <input type="radio" name='amenities' />
            <input type="radio" name='amenities' />

            <p>Common areas</p>
            <input type="radio" name='commonareas' />
            <input type="radio" name='commonareas' />
            <input type="radio" name='commonareas' />
            <input type="radio" name='commonareas' />
            <input type="radio" name='commonareas' />
        </div>

        <aside style={{ marginTop:"20px", width:"100%"}}><button style={{width:"fit-content",margin:"auto"}}
              onClick={(event)=>changeStep(event)}
            >Submit my review</button></aside>
    </div>
  )
}
