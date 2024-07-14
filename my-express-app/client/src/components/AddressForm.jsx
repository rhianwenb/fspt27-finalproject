import React, {useState} from 'react'
import axios from "axios"

export default function AddressForm({hanleNextStep}){
    
    const emptyAddress = {
        line1:'',
        line2:'',
        line3:'',
        city:'',
        postcode:'',
    }

    const [address, setAddress] = useState(emptyAddress)
    const [validatedAddress, setValidatedAddress] = useState({});
    const [validAddress, setValidAddress] = useState(false)
    const [postCodeValid, setPostCodeValid] = useState(true) // use this to change styling of input ?

    function handleChange(e){
        const value = e.target.value;
        setAddress({
          ...address,
          [e.target.name]: value
        });
    }

    function handleSubmit(e) {
        e.preventDefault()
        // console.log(address)

        validateAddress(address)

        // if successful -> handleNextStep(e)
        if (validAddress) handleNextStep(e)
    }

    const validateAddress = async (a) => {
        let search = Object.values(a).filter(n => n) // api accepts 1 string for the address
        // let search = [a.line1, a.line2, a.line3, a.city].filter(n=>n)
        console.log(search)

        try {
            const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
            const response = await axios.post(`https://addressvalidation.googleapis.com/v1:validateAddress?key=${API_KEY}`,{
                    address: {
                    regionCode: "GB",
                    addressLines: [search], 
                    // postalCode:a.postcode
                    },
                }
            );
            console.log('RESPONSE:')
            console.log(response.data.result)
            // setValidatedAddress(response.data.result)
            
            if (!response.data.result.address.missingComponentTypes) {
                const formattedAddress = response.data.result.address.formattedAddress   
                // console.log('Formatted address:')
                // console.log(formattedAddress)
                
                const location = response.data.result.geocode.location
                // const [lat, lng] = [location.latitude, location.longitude]
                // console.log('Geolocation:')
                // console.log(lat, lng)

                setValidatedAddress({formattedAddress, location})
                setAddress(emptyAddress)
                setPostCodeValid(true)

            } else {
                console.log('MISSING COMPONENT')
                const missing = response.data.result.address.missingComponentTypes
                console.log()
                if (missing[0] === 'postal_code') {
                    alert('Please double check that you have entered the correct post code')
                    setPostCodeValid(false)
                }
            }

        } catch (error) {
          console.error(error);
          setValidationMessage('Error occurred while validating the address');
        }
      };

      function AddNewProperty(){
        
      }

    return (
        <>
            <form>
            <label style={{gridArea:"1/1/span 1/span 4"}}>
                <p>Address line 1*</p>
                <input 
                    type='text'
                    onChange = {handleChange}
                    placeholder = '32 Wallaby Way'
                    name = 'line1'
                    value = {address.line1} />
            </label>

            <label style={{gridArea:"2/1/span 1/span 4"}}>
                <p>Address line 2</p>
                <input 
                    type='text'
                    onChange = {handleChange}
                    name = 'line2'
                    value = {address.line2}
                    placeholder = 'optional'/>
            </label>

            <label style={{gridArea:"3/1/span 1/span 4"}}>
                <p>Address line 3</p>
                <input 
                    type='text'
                    onChange = {handleChange}
                    name = 'line3'
                    value = {address.line3}
                    placeholder = 'optional'/>
            </label>

            <label style={{gridArea:"4/1/span 1/span 2"}}>
                <p>City/Town</p>
                <input 
                    type='text'
                    onChange = {handleChange}
                    name = 'city'
                    value = {address.city}/>
            </label>

            <label style={{gridArea:"4/3/span 1/span 2"}}>
                <p>Post Code*</p>
                <input 
                    type='text'
                    onChange = {handleChange}
                    name = 'postcode'
                    value = {address.postcode} />
            </label>
            
            <div style={{gridArea:"5/1/span 1/span 4", marginTop:"20px"}}>
                <button 
                    style={{width:"fit-content"}}
                    onClick={handleSubmit}>
                     Validate 
                </button>
            </div>

            </form>
        </>
    )

    
}