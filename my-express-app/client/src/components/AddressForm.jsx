import React from 'react'

export default function AddressForm({hanleNextStep}){

    function validateAddress(e) {
        e.preventDefault()
        

        // if successful -> handleNextStep(e)
    }

    return (
        <>
            <form>
            <label style={{gridArea:"1/2/span 1/span 3"}}>
                <p>Address line 1*</p>
                <input type='text'/>
            </label>

            <label style={{gridArea:"1/2/span 1/span 3"}}>
                <p>Address line 2</p>
                <input type='text'/>
            </label>

            <label style={{gridArea:"1/2/span 1/span 3"}}>
                <p>Address line 3</p>
                <input type='text'/>
            </label>

            <label style={{gridArea:"3/1/span 1/span 2"}}>
                <p>City/Town*</p>
                <input type='text'/>
            </label>

            <label style={{gridArea:"3/3/span 1/span 2"}}>
                <p>Post Code*</p>
                <input type='number'/>
            </label>
            
            <div style={{gridArea:"4/1/span 1/span 4", marginTop:"20px"}}>
                <button 
                    style={{width:"fit-content"}}
                    onClick={validateAddress}>
                     Validate 
                </button>
            </div>

            </form>
        </>
    )
}