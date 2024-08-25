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
    <div className="mt-5">
      <h1 className="mt-3">Your Library:</h1>
      {favoriteTracks.length > 0 ? (
          favoriteTracks.map((track)=>(
            <div key={track.id} className="card m-4">  
               <h2 className="p-2">{track.name}</h2>
               <h4>Artists: {track.artists.map((artist) => artist.name).join(', ')}</h4>
               <p>Popularity: {track.popularity}</p>
               <a href={track.external_urls.spotify} 
               target="_blank" rel="noopener noreferrer"
               className="btn btn-link"
               >
                  Open in Spotify
                </a>
                <button 
                className=" btn btn-outline-danger "
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