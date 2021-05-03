import React from 'react'
import Menu from './useMenu'
import '../../styles/header.css'

export default function useHeader(): JSX.Element {
    return (
        <header >
            {/* <div> */}
            <h1 className="title">RepoDoc</h1>
            {/* <div className="menu"> */}
            <Menu />
            {/* </div> */}
            {/* </div> */}
        </header>
    )
}
