import React from 'react'
import { IList } from '../../../interfaces/Core';
import './list.css'

const List = (props: IList) => {
    const { items  } = props;
    const listItems = items.map((item) => <li>{item}</li>)

    return (
        <>
            <ul className="ulContainer">
                {listItems}
            </ul>
        </>
    )
}

export default List;
