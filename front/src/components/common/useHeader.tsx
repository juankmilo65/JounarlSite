import React from 'react'
import Menu from './useMenu'
import '../../styles/header.css'
import {GiHamburgerMenu} from 'react-icons/gi';



export default function useHeader(): JSX.Element {

    const updateHamburgerStyle = ()=>{
        document.body.classList.toggle('nav-is-toggled');       
    }
    
    return (
        <header >
            <h1 className="title">RepoDoc</h1>
            <Menu />
            <div id="ham" className="hamburger"  onClick={updateHamburgerStyle}>
                <GiHamburgerMenu />
            </div>
        </header>
    )
}
