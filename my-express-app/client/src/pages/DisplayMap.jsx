import React, {useState, useEffect, useCallback} from 'react';
import {APIProvider, Map,  AdvancedMarker, Pin, useMap} from '@vis.gl/react-google-maps';
import axios from 'axios'

import NavBar from '../components/NavBar'
import PropertyPopup from  '../components/PropertyPopup'


export default function DisplayMap(){
    useEffect(()=>{
        getMarkers()
    }, [])
    const map = useMap();

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

    function handleClick(p){ 
        // https://developers.google.com/codelabs/maps-platform/maps-platform-101-react-js#0    
        console.log('click!', p)

    }

    // const handleClick = useCallback((ev) => {
    //   console.log('marker clicked:', ev.latLng.toString());
    //   if (!map) return;
    //   if (!ev.latLng) return;
    // }, [map])

    const [popupInfo, setPopupInfo] = useState('')

    return (
        <>
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
                      onClick={()=>setPopupInfo(p)} 
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

