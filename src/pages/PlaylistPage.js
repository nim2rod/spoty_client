import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import SpotyService from '../services/spotyService';
import { addFavoriteTrack, removeFavoriteTrack, selectFavorites } from '../store/favoritesSlice'

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
  const handleSort = (() => {
    setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')
  })

  const handleSearchChange = ((e) => {
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
    return favorites.some(fav => fav.id === track.id);
  }

  return (
    <>
      {!playlist.tracks.items ? (
        <div className="text-center mt-5">Playlist not found.</div>
      ) : (
        <div className="mt-5">
          <div className="card-body mt-4">
            <h2 className="card-title mb-2">{playlist.name}</h2>
            {playlist.images?.[0]?.url && (
              // <img className="img-fluid" src={playlist.images[0].url} alt={playlist.name} />
              <div className="text-center mb-3">
                <img className="img-fluid" src={playlist.images[0].url} alt={playlist.name} style={{ maxHeight: '300px' }} />
              </div>
            )}
            {playlist.owner && <h4>By: {playlist.owner.display_name}</h4>}
            {playlist.tracks && <h5 >Tracks: {playlist.tracks.total}</h5>}
          </div>

          <div className="d-flex align-items-center px-3">
            <div className="col-8 pe-2">
              <input
                type="text"
                className="form-control"
                placeholder='Search for a song'
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            <div className="col-4">
              <button className="btn btn-primary w-100" onClick={handleSort}>
                Sort By Popularity ({sortOrder})
              </button>
            </div>
          </div>

          <div className="d-flex flex-wrap justify-content-center">
            {filteredTracks.map((item) => (
              <div key={item.track.id} className="card m-2" style={{ width: '18rem' }}>
                {item.track.album.images?.[0]?.url && (
                  <img className="card-img-top" src={item.track.album.images[0].url} alt={item.track.name} />
                )}
                <div className="card-body">
                  <h5 className="card-title">{item.track.name}</h5>
                  <p className="card-text">Artists: {item.track.artists.map(artist => artist.name).join(', ')}</p>
                  <p className="card-text">Popularity: {item.track.popularity}</p>
                  <a href={item.track.external_urls.spotify} className="btn btn-link" target="_blank" rel="noopener noreferrer">
                    Open in Spotify
                  </a>
                  <button
                    className={`btn ${isFavorite(item.track) ? 'btn-danger' : 'btn-outline-primary'}`}
                    onClick={() => isFavorite(item.track) ? handleRemoveFavorite(item.track) : handleAddFavorite(item.track)}
                  >
                    {isFavorite(item.track) ? 'Remove from Favorites' : 'Add to Favorites'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>

  )
}

export default PlaylistPage;
