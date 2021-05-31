import React from 'react'
import Header from '../common/useHeader'
import Content from '../common/useContent'
import Footer from '../common/useFooter'
import Login from '../Home/useLogin'
import '../../styles/home.css'

export default function Home() {
    return (
        <div className="wrapper">
            <Header />
            <div className="container">
                 <Login />
                {/* <Content /> */}
            </div >
            <Footer /> 
        </div>
    )
}
