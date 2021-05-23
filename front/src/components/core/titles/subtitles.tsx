import React from 'react'
import { ITitle } from '../../../interfaces/Core';
import './titles.css'

const Subtitles = (props: ITitle) => {
    
    var {value } = props;
    
    return (
        <>
            <h4>{value}</h4>
        </>
    )
}

export default Subtitles
