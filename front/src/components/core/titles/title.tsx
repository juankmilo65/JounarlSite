import React from 'react'
import { ITitle } from '../../../interfaces/Core'
import './titles.css'

const Title = (props: ITitle ) => {
    
    var {value } = props;

    return (
        <>
        <h1>{value}</h1>
        </>
    )
}

export default Title
