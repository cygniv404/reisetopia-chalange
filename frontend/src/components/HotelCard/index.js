import React from 'react'
import './style.scss'

export const HotelCard = ({hotelData}) => {
    return (
        <div className='hotel-card'>
            <div className="image-container">
                <img src={hotelData.images[0]?.url}></img>
            </div>
            <div className="info-container">
                <span>{hotelData.name}</span>
                <span>{hotelData.address}</span>
                <span>Zentrum entfernung:</span>
            </div>
        </div>
    )
}
