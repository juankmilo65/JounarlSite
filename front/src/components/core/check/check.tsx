import React from 'react'
import './check.css'

const Check = () => {
    return (
        <>
           <label>
           <input
            name="isGoing"
            type="checkbox"
            className="main-checkbox"
            // checked={this.state.isGoing}
            // onChange={this.handleInputChange} 
            />
            Remember me
        </label>
        </>
    )
}

export default Check
