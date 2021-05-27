import React from 'react'
import Search from '../Dashboard/useSearch'
import AutorSection from './useAuthorSections'
import '../../styles/content.css'
import { Title } from '../core'

export default function useContent(): JSX.Element {
    
    var rows = [];

    for (var i = 0; i < 5; i++) {
      rows.push(<>
      <Title value="Author one"></Title>
        <div className="autorContainer">
            <AutorSection></AutorSection>
        </div>
        </>);
      rows.push(<div className="div"/>)
    }

    return (
        <div className="content">
            <div className="section">
                {rows}
            </div>
            <div className="search">
                <Search />
            </div>
        </div>
    )
}
