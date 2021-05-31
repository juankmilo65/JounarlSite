import React, {useState, useEffect} from 'react'
import '../../styles/search.css'
import { Card, List, SubmitButton, Subtitle, Textbox, Title } from '../core'
import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import  paper from  '../../img/paper.jpg';
import paper2 from  '../../img/paper2.jpg';
import paper3 from  '../../img/paper3.png';

export default function useSearch() {
    var listLatSearch = ["Search 1","Search 2","Search 3","Search 3","Search 4","Search 5","Search 6","Search 6","Search 7", "Search 8","Search 9","Search 10"]
    var rows = [];

    for (var i = 0; i < 10; i++) {
      rows.push(<Card isCarousel={true} className="topTenBox" img={i%2 === 0? paper : i === 3? paper2 : paper3 } key={i} />);  
    }

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
           <Subtitle value="Last searched"></Subtitle>
            <List items={listLatSearch} />
            <Subtitle value="Top 10"></Subtitle>
            <div className='topTen'>
              {rows}
            </div>
           </div>
        </aside>
    )
}
