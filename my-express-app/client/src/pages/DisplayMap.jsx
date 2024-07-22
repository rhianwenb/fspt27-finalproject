import React, {useState, useEffect, useCallback} from 'react';
import {APIProvider, Map,  AdvancedMarker, Pin, useMap} from '@vis.gl/react-google-maps';
import axios from 'axios'

import NavBar from '../components/NavBar'
import PropertyPopup from  '../components/PropertyPopup'


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

    function handleClick(p){ 
        // https://developers.google.com/codelabs/maps-platform/maps-platform-101-react-js#0    
        console.log('click!')

    }



    return (
        <>
        {/* MORE INFORMATION */}
        <button type="submit" 
                    className = "btn btn-lg" 
                    data-bs-toggle="modal" 
                    data-bs-target="#staticBackdrop"> How to use NextTenant </button>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body">
                          More information
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick = {()=>goToLogin()}>Login</button>
                        </div>
                    </div>
                </div>
            </div>

        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY} onLoad={() => console.log('Maps API has loaded.')}>
          <Map style={{width: '100%', height: '60vh'}}
              defaultCenter={{lat: 51.5, lng: -0.12}}
              defaultZoom={11}
              gestureHandling={'greedy'}
              disableDefaultUI={true}
              mapId='DEMO_MAP_ID'
              >
              {markers && markers.map(p =>(
                  <AdvancedMarker
                      key = {p.key} 
                      position = {p.location}
                      clickable={true}
                      onClick={()=>{setPopupInfo(p), handleClick}} 
                      >
                      <Pin background={'#3580D2'} glyphColor={'#3580D2'} borderColor={'#3580D2'} /> 
                      </AdvancedMarker>
              ))
              }
          </Map>
        </APIProvider>
        
        <div>
          {popupInfo && (<PropertyPopup store={popupInfo} style={{ position: 'absolute', top: 0, left: 0, width: '200px' }} />)}
        </div> 

        <div>
          <NavBar />
        </div>
        </>
  )
}

