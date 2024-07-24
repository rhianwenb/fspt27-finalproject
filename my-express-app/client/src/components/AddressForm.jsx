import React, {useState} from 'react'
import axios from "axios"

export default function AddressForm({handleNextStep}){
    
    const emptyAddress = {
        line1:'',
        line2:'',
        line3:'',
        city:'',
        postcode:'',
    }

    const [address, setAddress] = useState(emptyAddress)
    const [validatedAddress, setValidatedAddress] = useState({});
    const [postCodeValid, setPostCodeValid] = useState(true) // use this to change styling of input ?

    function handleChange(e){
        const value = e.target.value;
        setAddress({
          ...address,
          [e.target.name]: value
        });
    }

    async function handleSubmit(e) {
        e.preventDefault()
        const validateAddress01 = await validateAddress(address)
        if(validateAddress01){
            addNewProperty(validateAddress01)
            handleNextStep(e)
        }

        // console.log(address)
        // validateAddress(address)
        // if successful -> handleNextStep(e)
        // if (propertyAdded) handleNextStep(e)
    }

    const validateAddress = async (a) => {
        let search = Object.values(a).filter(n => n) // api accepts 1 string for the address
        // console.log(search)

        try {
            const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
            const response = await axios.post(`https://addressvalidation.googleapis.com/v1:validateAddress?key=${API_KEY}`,{
                    address: {
                    regionCode: "GB",
                    addressLines: [search], 
                    },
                }
            );
            console.log('RESPONSE:')
            console.log(response.data.result)
            // setValidatedAddress(response.data.result)
            
            if (!response.data.result.address.missingComponentTypes) {
                const FormattedAddress = response.data.result.address.formattedAddress      
                const location = response.data.result.geocode.location
                const [Latitude, Longitude] = [location.latitude, location.longitude]

                // setValidatedAddress({FormattedAddress, Latitude, Longitude})
                // setAddress(emptyAddress)
                setPostCodeValid(true)

                const validatedAddress = { FormattedAddress, Latitude, Longitude };
                console.log(validatedAddress)
                return validatedAddress
                // addNewProperty(validatedAddress)

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
          console.log(error);
          return null
        }
      };

      async function addNewProperty(ad){
        // console.log(ad)
        try {
            const data = await axios.post('/api/properties/', ad)
            console.log(data) //returns the last property that was added
            setPropertyAdded(true)
            setAddress({})
            
        } catch(e){
          console.log(e)
        }
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