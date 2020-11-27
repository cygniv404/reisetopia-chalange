import React from 'react'
import './style.scss'
export const SearchBox = ({onSearch}) => {
    return (
        <div className="search-box">
            <input type='text' placeholder='Noch Hotelnamen suchen...' onChange={(e) => onSearch(e)}></input>
        </div>
    )
}
