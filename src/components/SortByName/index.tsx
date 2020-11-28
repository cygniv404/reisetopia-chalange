import React from 'react'
import './style.scss';

type Props = {
    sort:(event: React.MouseEvent<HTMLElement>) => void,
}
export const SortByName: React.FunctionComponent<Props> = ({sort}) => {
    return (
        <div className='sort-by-name'>
            <button onClick={sort}>sort by name</button>
        </div>
    )
}