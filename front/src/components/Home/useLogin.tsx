import React from 'react'
import '../../styles/loging.css'
import { Textbox } from "../core";

export default function useLogin() {
    return (
        <div className="loginContainer">
            <article>
                <Textbox></Textbox>
            </article>
        </div>
    )
}
