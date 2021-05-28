import React from 'react'
import '../../styles/search.css'
import { List, SubmitButton, Textbox, Title } from '../core'

export default function useSearch() {
    var listLatSearch = ["Search 1","Search 2","Search 3","Search 3","Search 4","Search 5"]
    return (
        <aside className="searchContainer" >
          <div className="searcSticky" >
            <form>
            <div className="inputSearch">
            <Textbox className="input" placeholder= "Search" type="text"/>
            </div>
            <SubmitButton className="login" value="Search"/>
            </form>
           </div>
           <div className="mostSearchedDocuments">
            <List items={listLatSearch} />
           </div>
        </aside>
    )
}
