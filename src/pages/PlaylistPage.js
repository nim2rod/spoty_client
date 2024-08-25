import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import SpotyService from '../services/spotyService';
import {addFavoriteTrack, removeFavoriteTrack, selectFavorites} from '../store/favoritesSlice'

const PlaylistPage = () => {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState({ tracks: { items: [] } })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [sortOrder, setSortOrder] = useState('desc')
  const [searchQuery, setSearchQuery] = useState('')
  // store
  const dispatch = useDispatch()
  const favorites = useSelector(selectFavorites)

  useEffect(() => {
    const getPlaylist = async () => {
      try {
        const playlistData = await SpotyService.getPlaylist(id);
        setPlaylist(playlistData);
        console.log('playlist', playlist)
      } catch (error) {
        setError(error.message);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getPlaylist();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-5">Loading playlist...</div>;
  }

  if (error) {
    return <div className="text-center mt-5 text-danger">{error}</div>;
  }

  // Sort and Search
  const handleSort = (()=>{
    setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc' )
  })

  const handleSearchChange = ((e)=>{
    setSearchQuery(e.target.value.toLowerCase())
  })

  const filteredTracks = playlist.tracks.items
    .filter((item) => item.track.name.toLowerCase().includes(searchQuery))
    .sort((a, b) => {
      if (sortOrder === 'desc') {
        return b.track.popularity - a.track.popularity;
      }
      return a.track.popularity - b.track.popularity;
  })

  //Favorites
  const handleAddFavorite = (track) => {
    dispatch(addFavoriteTrack(track));
  }

  const handleRemoveFavorite = (track) => {
    // dispatch(removeFavoriteTrack({ id: trackId }));
    dispatch(removeFavoriteTrack(track));
  }

  const isFavorite = (track) => {
    console.log('favorites: ',favorites)
    return favorites.some(fav => fav.id === track.id);
  }

  return (
    <>
      {!playlist.tracks.items ? (
        <div className="text-center mt-5">Playlist not found.</div>
      ) : (
        <div>
          <h1>{playlist.name}</h1>
          {playlist.images?.[0]?.url && (
            <img src={playlist.images[0].url} alt={playlist.name} />
          )}
          {playlist.owner && <p>By: {playlist.owner.display_name}</p>}
          {playlist.tracks && <p>Tracks: {playlist.tracks.total}</p>}
          
          <input 
             type="text"
             placeholder = 'Search for a song'
             value = {searchQuery}
             onChange = {handleSearchChange}
          />

          <button onClick={handleSort}>
            Sort By Popularaty ({sortOrder})
          </button>

          <h2>Tracks</h2>
          <ul>
            {/* {playlist.tracks.items?.map((item) => ( */}
            {filteredTracks.map((item) => (
              <li key={item.track.id}>
                {item.track.album.images?.[0]?.url && (
                  <img src={item.track.album.images[0].url} alt={item.track.name} />
                )}
                <h3>{item.track.name}</h3>
                <p>Artists: {item.track.artists.map((artist) => artist.name).join(', ')}</p>
                <p>Popularity: {item.track.popularity}</p>
                <a href={item.track.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                  Open in Spotify
                </a>
                {
                  isFavorite(item.track) ? (
                      <button onClick={() => handleRemoveFavorite(item.track)}>Remove from Favorites</button>
                  ) : (
                    <button onClick={() => handleAddFavorite(item.track)}>Add to Favorites</button>   
                  )
                }
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
 }

export default PlaylistPage;
