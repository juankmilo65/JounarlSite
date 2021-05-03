import React from 'react'
import '../../styles/menu.css'

export default function useMenu(): JSX.Element {
    return (
        <nav className="mainMenu">
            <ul>
                <li>
                    <a className="maiMenuColor" href="">
                        Inicio
                    </a>
                </li>
                <li>
                    <a className="maiMenuColor" href="">
                        Mis publicaciones
                    </a>
                </li>
                <li>
                    <a className="maiMenuColor" href="">
                        Mis favoritos
                    </a>
                </li>
            </ul>
        </nav>
    )
}
