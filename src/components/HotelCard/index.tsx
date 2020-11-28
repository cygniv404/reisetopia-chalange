import React from 'react'
import './style.scss'
import {Hotel} from'../../App'

export interface Props{
    hotelData:Hotel,
  }
export const HotelCard: React.FunctionComponent<Props> = ({hotelData}) => {
    return (
        <div className='hotel-card'>
            <div className="image-container">
                <img src={hotelData.images[0]?.url} alt={hotelData.images[0]?.caption ?? ''}></img>
            </div>
            <div className="info-container">
                <span>{hotelData.name}</span>
                <span>{hotelData.address}</span>
            </div>
        </div>
    )
}
