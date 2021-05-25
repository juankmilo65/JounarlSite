import React from 'react'
import Search from '../Dashboard/useSearch'
import '../../styles/content.css'

export default function useContent(): JSX.Element {
    return (
        <div className="content">
            <div className="section">
                <section >
                    Conent
                </section>
            </div>
            <div className="search">
                <Search />
            </div>
        </div>
    )
}
