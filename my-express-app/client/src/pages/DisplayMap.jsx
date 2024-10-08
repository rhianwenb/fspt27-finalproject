import React, {useState, useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';

import {APIProvider, Map,  AdvancedMarker, Pin} from '@vis.gl/react-google-maps';
import axios from 'axios'

import NavBar from '../components/NavBar'
import PropertyPopup from  '../components/PropertyPopup'
import AuthContext from '../context/AuthContext.js';

import coffee from '../assets/coffee.png'
import '../styles/DisplayMap.css'

export default function DisplayMap(){
    useEffect(()=>{
        getMarkers()
    }, [])

    const [markers, setMarkers] = useState([])

    async function getMarkers(){
        try {
          const result = await axios.get('/api/properties/')
          let geocodes = []
          for (let i of result.data){
            let key = i.PropertyID
            let name = i.FormattedAddress
            let location = {'lat': i.Latitude, 'lng': i.Longitude}
            geocodes.push({key, location, name})
          }
          setMarkers(geocodes)
        } catch(e){
          console.log(e)
        }
      }
    
      const [popupInfo, setPopupInfo] = useState('')
      const [popup, setPopup] = useState(false)
      const [popupKey, setPopupKey] = useState(0)

      function handleClick(p){ 
        // https://developers.google.com/codelabs/maps-platform/maps-platform-101-react-js#0            
        setPopupInfo(p)
        popupKey === p.key ? setPopupKey(0) : setPopupKey(p.key)
        popupKey === p.key ? setPopup(!popup) : setPopup(true)
    }

    const navigate = useNavigate();

    // function tipMe(){
    //   console.log('take my money')
    // }
    const auth = useContext(AuthContext);

    function getStarted(){
      //if user logged in
      if (auth.isLoggedIn) {
        navigate('/addareview')
      } else {
          navigate('/profile')
      }
    }

    return (
        <>
        {/* MORE INFORMATION */}
        <div>
          <p>Review your rental property, rate your landlord, find reviewed properties and local information.</p>
          <button className = "button" 
                  data-bs-toggle="modal" 
                  data-bs-target="#staticBackdrop"> Learn more </button> 
            <p></p>         
        </div>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
              <div className="modal-dialog">
                  <div className="modal-content">
                    <button className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    <div className="modal-body">
                      HOW TO RATE A PROPERTY:<br/><br/> 
                      <span style={{fontWeight:'bold'}}>1. Register</span><br/> 
                      Go to your profile page and click on the "Register". All you need is a username, password, email.
                      <br/> 
                      <br/> 
                      <span style={{fontWeight:'bold'}}>2. Review Property</span><br/> 
                      Provide the address of the property you want to review as well as your move-in & move-out dates. <br/>
                      Then answer multiple choice questions and leave a comment.
                      <br/> 
                      <br/> 
                      <span style={{fontWeight:'bold'}}>3. Get Rating</span><br/> 
                      Your rating is added and now others can see it! The property rating is generated automatically based on your answers and previous reviews. 
                      <br/> 
                    </div>
                    <div className="modal-footer">
                        <button className="button" data-bs-dismiss="modal" onClick = {()=> getStarted()}>Get started!</button>
                    </div>
                  </div>
              </div>
            </div>
        <div className="row">
          <div className={popup ? "column left":""}>
            <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY} onLoad={() => console.log('Maps API has loaded.')}>
              <Map style={{width: '90%', height: '58vh', margin:'auto'}}
                  defaultCenter={{lat: 51.5, lng: -0.12}}
                  defaultZoom={12}
                  gestureHandling={'greedy'}
                  disableDefaultUI={true}
                  mapId='DEMO_MAP_ID'
                  >
                  {markers && markers.map(p =>(
                      <AdvancedMarker
                          key = {p.key} 
                          position = {p.location}
                          clickable={true}
                          onClick={()=>{handleClick(p)}} 
                          >
                          <Pin // if the key that you click
                            background={popupKey !== p.key ? '#3580D2' : '#FF6600'} 
                            glyphColor={popupKey !== p.key ? '#3580D2' : '#FF6600'} 
                            borderColor={popupKey !== p.key ? '#3580D2' : '#FF6600'} /> 
                        </AdvancedMarker>
                  ))
                  }
              </Map>
            </APIProvider>

          </div>
          <div className="column right">
            <div>
            {popup && (<PropertyPopup store={popupInfo} />)}
            </div>
          </div>
        </div>
        <div style={{height:'100px'}}>
        </div>
        <div>
          <NavBar />
        </div>
        </>
  )
}

