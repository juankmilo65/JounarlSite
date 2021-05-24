import React from 'react'
import '../../styles/loging.css'
import indexImg from "../../assets/img/index.png"
import { Textbox, SubmitButton, Link, Check, Title, Subtitle} from '../core'

export default function useLogin() {
    return (
        <div className="loginContainer">
            <div  className="form-img" >
                <img src={indexImg} alt="Logo"/>
            </div>
            <form className="form">
                <Title value="Sing in to BiBook"></Title>
                <div className="subtitle">
                    <Subtitle value="Please enter your sing in details. Sing up here if you are not register yet."></Subtitle>
                </div>
                <Textbox className="input" placeholder= "User" type="email"/>
                <Textbox className="input" placeholder= "Password" type="Password"/>
                <div className="rememberme">
               <Check/>
               </div>
               <div className="logingButton">
                   <SubmitButton className="login" value="Sing in"/>
               </div>
               
               <Link className="link" href="test" value="Forgot password?"/>
             
            </form>
            <div className="splitContainer">
            Or
            </div>
        </div>
    )
}
