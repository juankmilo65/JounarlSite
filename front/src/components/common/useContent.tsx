import React, {useState} from 'react'
import Search from '../Dashboard/useSearch'
import AuthorSection from './useAuthorSections'
import InfiniteScroll from "react-infinite-scroll-component";
import '../../styles/content.css'
import { Title } from '../core'

export default function useContent(): JSX.Element {
    
    var rows = [];
    
    for (var i = 0; i < 3; i++) {
      rows.push(<>
      <Title value={"Author " + i}></Title>
        <div className="autorContainer">
            <AuthorSection></AuthorSection>
        </div>
        </>);
      rows.push(<div className="div"/>)
    }

    const [ authorSections, setAuthorSection ] = useState(rows);


    const fetchMoreData = () => {
        // a fake async api call like which sends
        // 20 more records in 1.5 secs
        setTimeout(() => {
            var newRows = [];
            for (var i = 0; i < 2; i++) {
                newRows.push(<>
                <Title value={"Author " + i}></Title>
                  <div className="autorContainer">
                      <AuthorSection></AuthorSection>
                  </div>
                  </>);
                newRows.push(<div className="div"/>)
              }
              setAuthorSection (authorSections.concat(newRows))
        }, 1500);
      };

    return (
        <div className="content">
            <div className="section">
            <InfiniteScroll
                dataLength={authorSections.length}
                next={fetchMoreData}
                hasMore={true}
                loader={<h4>Loading...</h4>}
                >
         {authorSections}
        </InfiniteScroll>
            </div>
            <div className="search">
                <Search />
            </div> 
        </div>
    )
}
