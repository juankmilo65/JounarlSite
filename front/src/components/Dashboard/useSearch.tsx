import React, {useState, useEffect} from 'react'
import '../../styles/search.css'
import { List, SubmitButton, Textbox, Title } from '../core'
import { useScrollPosition } from '@n8tb1t/use-scroll-position'

export default function useSearch() {
    var listLatSearch = ["Search 1","Search 2","Search 3","Search 3","Search 4","Search 5","Search 6","Search 6","Search 7", "Search 8","Search 9","Search 10","Search 11","Search 12","Search 13","Search 14","Search 15","Search 16","Search 1","Search 2","Search 3","Search 3","Search 4","Search 5","Search 6","Search 6","Search 7", "Search 8","Search 9","Search 10","Search 11","Search 12","Search 13","Search 14","Search 15","Search 16", "Otro text", "lorem", "lorem 3", "porque si", "Search 1","Search 2","Search 3","Search 3","Search 4","Search 5","Search 6","Search 6","Search 7", "Search 8","Search 2","Search 2","Search 2","Search 2","Search 2" ]
    
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
           {/* <div className="header-sentinel header-sentinel-top"></div>
          <div className="header-sentinel header-sentinel-bottom"></div> */}
        </aside>
    )
}
