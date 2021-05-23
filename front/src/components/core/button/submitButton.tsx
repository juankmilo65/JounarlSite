import React from 'react'
import './button.css'
import { IButton } from '../../../interfaces/Core'

const SubmitButton = (props: IButton) => {
var { className, value } = props;

    return (
        <>
            <input type="submit" value= {value}  className={className}></input>
        </>
    )
}

export default SubmitButton

