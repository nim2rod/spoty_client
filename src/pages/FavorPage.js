import React from 'react'
import { useSelector } from "react-redux";
import {selectFavorites} from '../store/favoritesSlice'

const FavorPage = () => {
  const favoriteTracks = useSelector(selectFavorites)

  return (
    <div>
      <h1>Your Library:</h1>
      {favoriteTracks.length > 0 ? (
          favoriteTracks.map((track)=>{
            <div key={track.id}>  
               <p>{track.name}</p>
            </div>
          })
      ) : (
          <p>Your library is empty today</p>
      )}
    </div>
  )
}

export default FavorPage