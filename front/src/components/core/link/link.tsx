import React from 'react'
import { ILink } from '../../../interfaces/Core';
import './link.css'

const Link = (props: ILink) => {
    var { className, href , value}= props;
    return (
        <>
        <button className={className}>{value}</button>
        </>
    )
}

export default Link
