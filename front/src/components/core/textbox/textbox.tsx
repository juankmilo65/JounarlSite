import React from 'react'
import { ITextBox } from '../../../interfaces/Core'
import './textbox.css'


const Textbox = (props: ITextBox) => {

var { className,placeholder, type}= props;

    return (
        <>
            <input className={className} type={type} placeholder={placeholder}></input>
        </>
    )
}

export default Textbox