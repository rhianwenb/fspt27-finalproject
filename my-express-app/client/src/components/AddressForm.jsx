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
    const [validationMessage, setValidationMessage] = useState('');
    const [validAddress, setValidAddress] = useState(false)

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
        console.log(Object.values(a).join(', '))
        let search = Object.values(a).join(', ')
        try {
          const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
            params: {
              address: search,
              components: 'country:UK',
              key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
            },
          });
          console.log(response.data.results[0])

        //   setValidAddress(true)
        
          if (response.data.status === 'OK') {
            console.log('Response OK')
            const formattedAddress = response.data.results[0].formatted_address;
            setValidationMessage(`Valid address: ${formattedAddress}`);
          } else {
            console.log('Response NOT ok')
            setValidationMessage('Invalid address');
          }
        } catch (error) {
          console.error(error);
          setValidationMessage('Error occurred while validating the address');
        }
      };

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
                    value = {address.line2}/>
            </label>

            <label style={{gridArea:"3/1/span 1/span 4"}}>
                <p>Address line 3</p>
                <input 
                    type='text'
                    onChange = {handleChange}
                    name = 'line3'
                    value = {address.line3}/>
            </label>

            <label style={{gridArea:"4/1/span 1/span 2"}}>
                <p>City/Town*</p>
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
                    value = {address.postcode}/>
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