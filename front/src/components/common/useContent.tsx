import React from 'react'
import Search from '../Dashboard/useSearch'
import Document from './useArticleDescription'
import '../../styles/content.css'
import { Title } from '../core'

export default function useContent(): JSX.Element {
    return (
        <div className="content">
            <div className="section">
            <Title value="Paper List"></Title>
                <section className="documents">
                    <Document/>
                    <Document/>
                    <Document/>
                    <Document/>
                    <Document/>
                    <Document/>
                    <Document/>
                    <Document/>
                    <Document/>
                    <Document/>
                    <Document/>
                    <Document/>
                    <Document/>
                    <Document/>
                    <Document/>
                    <Document/>
                    <Document/>
                    <Document/>
                    <Document/>
                    <Document/>
                    <Document/>
                    <Document/>
                    <Document/>
                    <Document/>
                    <Document/>
                    <Document/>
                    <Document/>
                    <Document/>
                    <Document/>
                    <Document/>
                    <Document/>
                    <Document/>
                    <Document/>
                    <Document/>
                    <Document/>
                    <Document/>
                    <Document/>
                    <Document/>
                    <Document/>
                    <Document/>
                </section>
            </div>
            <div className="search">
                <Search />
            </div>
        </div>
    )
}
