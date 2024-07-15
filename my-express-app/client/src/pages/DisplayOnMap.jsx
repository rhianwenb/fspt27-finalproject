import React from 'react'
import NavBar from '../components/NavBar'

import {useState, useMemo, useEffect} from 'react';
import { GoogleMap, useLoadScript , Marker} from "@react-google-maps/api";
import usePlacesAutocomplete, {getGeocode,getLatLng} from "use-places-autocomplete";
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption} from "@reach/combobox";
import "@reach/combobox/styles.css";

export default function DisplayOnMap() {


  const {isLoaded} = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries:["places"]
});

// const center = useMemo(()=>({lat: 51.5, lng: -0.12}), []);
const [center, setCenter] = useState({lat: 51.5, lng: -0.12})
const [selected, setSelected] = useState(null);

const {
    ready,
    value, setValue, // what the user inputs
    suggestions:{status, data}, // autocomplete suggestions
    clearSuggestions, 
} = usePlacesAutocomplete();

const handleSelect = async (address) => {

    setValue(address, false) // false -> don't need to fetch additional data
    clearSuggestions()

    const results = await getGeocode({address})
    const {lat,lng} = await getLatLng(results[0]);

    setSelected({lat,lng})
    setCenter({lat,lng})
}

if (!isLoaded) return <div>Loading...</div>

if (isLoaded)  return (
    <>
      <div className="places-container">
            <Combobox onSelect = {handleSelect}>
                <ComboboxInput 
                    value = {value} 
                    onChange={(e)=>setValue(e.target.value)} 
                    //Fix disabled, it was connected to ready
                    disabled={false} 
                    className="combobox-input"
                    placeholder = "Search for an area"
                />
                <ComboboxPopover>
                    <ComboboxList>
                        {status === "OK" && 
                        data.map(({place_id, description}) =>(
                            <ComboboxOption key = {place_id} value = {description} />
                        ))}
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>
        </div>
  
        <GoogleMap
          zoom={13}
          center={center}
          mapContainerStyle={{ width: '100%', height: '100vh' }}
          >
          {selected && <Marker position={selected} />}
        </GoogleMap>

      <div>DisplayOnMap
        <NavBar />
      </div>
    </>
  )
}
