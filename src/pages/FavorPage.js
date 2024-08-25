import React from 'react'
import { useSelector } from "react-redux";
import {useDispatch} from 'react-redux'
import {selectFavorites} from '../store/favoritesSlice'
import { removeFavoriteTrack } from '../store/favoritesSlice'


const FavorPage = () => {
  const favoriteTracks = useSelector(selectFavorites)
  const dispatch = useDispatch()

  console.log('favoriteTracks: ',favoriteTracks)

  const handleRemoveFavorite = (track) => {
    dispatch(removeFavoriteTrack(track));
  }

  return (
    <div>
      <h1>Your Library:</h1>
      {favoriteTracks.length > 0 ? (
          favoriteTracks.map((track)=>(
            <div key={track.id}>  
               <p>{track.name}</p>
               <p>Artists: {track.artists.map((artist) => artist.name).join(', ')}</p>
               <p>Popularity: {track.popularity}</p>
               <a href={track.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                  Open in Spotify
                </a>
                <button 
                onClick={() => handleRemoveFavorite(track)}
                >
                Remove
                </button>
            </div>
          ))
      ) : (
          <p>Your library is empty today</p>
      )}
    </div>
  )
}

export default FavorPage