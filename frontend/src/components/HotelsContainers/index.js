import React from 'react'
import { HotelCard } from '../HotelCard'
import './style.scss'
export const HotelsContainer = ({hotels}) => {
    return (
        <div className='container'>
            {hotels.map(h => <HotelCard hotelData={h} key={h._id}/>)}
        </div>
    )
}
