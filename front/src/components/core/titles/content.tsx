import React from 'react'
import { ITitle } from '../../../interfaces/Core'
import './titles.css'

 const Content = (props: ITitle) => {
    
    var {value } = props;

    return (
        <div className="paperDescription">
            <span >{value}</span>
        </div>
    )
}

export default  Content
