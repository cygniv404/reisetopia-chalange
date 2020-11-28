import React from 'react'
import { HotelCard } from '../HotelCard'
import './style.scss'
import {Hotel} from'../../App'

type Props = {
    hotels :Hotel[]
}
export const HotelsContainer:React.FunctionComponent<Props> = ({hotels}) => {
    return (
        <div className='container'>
            {hotels.map(h => <HotelCard hotelData={h} key={h._id}/>)}
        </div>
    )
}
