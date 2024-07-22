import React, {useState, useEffect} from 'react';
import {APIProvider, Map,  AdvancedMarker, Pin} from '@vis.gl/react-google-maps';
import axios from 'axios'

import NavBar from '../components/NavBar'


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

    function handleClick(id){ 
        // https://developers.google.com/codelabs/maps-platform/maps-platform-101-react-js#0    
        console.log('click!')
    }

    return (
        <>
        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY} onLoad={() => console.log('Maps API has loaded.')}>
        <Map style={{width: '100%', height: '80vh'}}
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
                    // onClick={handleClick(p.name)} 
                    >
                    <Pin background={'#3580D2'} glyphColor={'#3580D2'} borderColor={'#3580D2'} /> 
                    </AdvancedMarker>
            ))
            }
        </Map>

    </APIProvider>    
          <div>
          <NavBar />
        </div>
        </>
    )
}

