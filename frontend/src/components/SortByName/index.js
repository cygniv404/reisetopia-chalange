import React from 'react'
import './style.scss';
export const SortByName = ({sort}) => {
    return (
        <div className='sort-by-name'>
            <button onClick={sort}>sort by name</button>
        </div>
    )
}
