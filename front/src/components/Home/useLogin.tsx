import React from 'react'
import '../../styles/loging.css'
import Textbox from "../core";
import indexImg from "../../assets/img/index.png"

export default function useLogin() {
    return (
        <div className="loginContainer">
            <div  className="form-img" >
                <img src={indexImg} alt="Logo"/>
            </div>
            <form className="form">
                <Textbox></Textbox>
                <Textbox></Textbox>
            </form>
        </div>
    )
}
