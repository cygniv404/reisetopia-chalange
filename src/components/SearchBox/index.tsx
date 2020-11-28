import React from 'react'
import './style.scss'
type Props = {
    onSearch:(e: React.ChangeEvent<HTMLInputElement>) => void,
}
export const SearchBox: React.FunctionComponent<Props> = ({onSearch}) => {
    return (
        <div className="search-box">
            <input type='text' placeholder='Noch Hotelnamen suchen...' onChange={(e) => onSearch(e)}></input>
        </div>
    )
}
