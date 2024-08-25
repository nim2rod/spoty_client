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
    <div>
      <h1>Featured Playlists</h1>
      <ul>
        {playlists.map((playlist) => (
          <li 
          key={playlist.id} 
          onClick={()=>navigate(`/playlist/${playlist.id}`)}
          >
            <h2>{playlist.name}</h2>
            <img src={playlist.images[0].url} alt={playlist.name} />
            <p>By: {playlist.owner.display_name}</p>
            <p>Tracks: {playlist.tracks.total}</p>
            <a href={playlist.external_urls.spotify} target="_blank" rel="noopener noreferrer" >
                                 Open in Spotify                        </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default HomePage;
