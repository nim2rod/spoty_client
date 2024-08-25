import React, { useEffect, useState } from 'react';
import SpotyService from '.././services/spotyService';

const HomePage = () => {
   const [playlists, setPlaylists] = useState([]);
//   const [accessToken, setAccessToken] = useState('');
   const [error, setError] = useState(null); 


  useEffect(() => {
    const fetchPlaylists = async () => {
    //   const token = await SpotyService.getAccessToken();
    //   setAccessToken(token);
        try {
            const fetchedPlaylists = await SpotyService.getFeaturedPlaylists();
            setPlaylists(fetchedPlaylists);
        } catch (error) {
            setError('Failed to fetch playlists');
            console.error(error);
        }
    };

    fetchPlaylists();
  }, []);

  return (
    <div>
      <h1>Featured Playlists</h1>
      {error && <p>{error}</p>}
      <ul>
        {playlists.map((playlist) => (
          <li key={playlist.id}>
            <h2>{playlist.name}</h2>
            <img src={playlist.images[0].url} alt={playlist.name} />
            <p>By: {playlist.owner.display_name}</p>
            <p>Tracks: {playlist.tracks.total}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
