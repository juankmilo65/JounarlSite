import React, {useState} from 'react'
import Menu from './useMenu'
import '../../styles/header.css'
import {GiHamburgerMenu} from 'react-icons/gi';
import classNames from 'classnames';



export default function useHeader(): JSX.Element {

    const [mobileNavOpen, setMobileNavOpen] = useState(false);

    const active = classNames('mobile-menu', {
      open: mobileNavOpen,
    });

    return (
        <>
            <header >
                <h1 className="title">RepoDoc</h1>
                <div id="ham" className="hamburger" 
                onClick={() => {
                    setMobileNavOpen((mobileNavOpen) => !mobileNavOpen);
                }} >
                    <GiHamburgerMenu />
                </div>
                <div className="menu">
                    <Menu />
                </div>
            </header>
            <div className="mobileMenu">
                <Menu />
            </div>
        </>
    )
}
