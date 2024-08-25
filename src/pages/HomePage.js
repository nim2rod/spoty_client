import React, { useEffect, useState } from 'react';
import SpotyService from '.././services/spotyService';
import {useNavigate} from 'react-router-dom'

const HomePage = () => {
   const [playlists, setPlaylists] = useState([]);
   const [error, setError] = useState(null);
   const [loading, setLoading] = useState(true) 
   const navigate = useNavigate()


  useEffect(() => {
    const fetchPlaylists = async () => {
        try {
            const fetchedPlaylists = await SpotyService.getFeaturedPlaylists();
            setPlaylists(fetchedPlaylists);
        } catch (error) {
            setError('Failed to fetch playlists');
            console.error(error);
        } finally {
            setLoading(false)
        }
    }

    fetchPlaylists();
  }, [])

  if (loading) {
    return <div className="text-center mt-5">Loading playlists...</div>;
  }

  if (error) {
    return <div className="text-center mt-5 text-danger">{error}</div>;
  }

  return (
    <div className="mt-5">
    <h1 className="text-center my-4 ">Featured Playlists</h1>
    <div className="d-flex flex-wrap justify-content-center">
      {playlists.map((playlist) => (
        <div key={playlist.id} className="card m-2" style={{ width: "18rem", cursor: "pointer" }} onClick={() => navigate(`/playlist/${playlist.id}`)}>
          <img src={playlist.images[0].url} className="card-img-top" alt={playlist.name} />
          <div className="card-body">
            <h5 className="card-title">{playlist.name}</h5>
            <p className="card-text">By: {playlist.owner.display_name}</p>
            <p className="card-text">Tracks: {playlist.tracks.total}</p>
            <a href={playlist.external_urls.spotify} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Open in Spotify
            </a>
          </div>
        </div>
      ))}
    </div>
  </div>
  )
}

export default HomePage;
