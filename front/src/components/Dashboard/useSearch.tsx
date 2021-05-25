import React from 'react'
import '../../styles/search.css'
import { SubmitButton, Textbox, Title } from '../core'

export default function useSearch() {
    return (
        <aside >
           <Title value="Search"></Title>
            <form>
            <div className="inputSearch">
            <Textbox className="input" placeholder= "Search" type="text"/>
            </div>
            <SubmitButton className="login" value="Search"/>
            </form>
        </aside>
    )
}
