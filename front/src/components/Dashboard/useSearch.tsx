import React from 'react'
import '../../styles/search.css'

export default function useSearch() {
    return (
        <aside >
            <h2>Buscar</h2>
            <form>
                <input type="text"></input>
                <input type="submit" value="Buscar"></input>
            </form>
        </aside>
    )
}
