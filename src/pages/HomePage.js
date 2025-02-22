import React, { useEffect, useState } from 'react';
import SpotyService from '.././services/spotyService';
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  const [albums, setAlbums] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()


  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const fetchedPlaylists = await SpotyService.getFeaturedPlaylists();
        console.log('fetchAlbums', fetchedPlaylists)
        setAlbums(fetchedPlaylists);
      } catch (error) {
        setError('Failed to fetch albums');
        console.error(error);
      } finally {
        setLoading(false)
      }
    }

    fetchAlbums();
  }, [])

  if (loading) {
    return <div className="text-center mt-5">Loading albums...</div>;
  }

  if (error) {
    return <div className="text-center mt-5 text-danger">{error}</div>;
  }

  return (
    <div className="mt-5">
      <h1 className="text-center my-4 ">Featured albums</h1>
      <div className="d-flex flex-wrap justify-content-center">
        {albums.map((album) => (
          <div
            key={album.id}
            className="card m-2"
            style={{ width: "18rem", cursor: "pointer" }}
            onClick={() => navigate(`/album/${album.id}`)}
          >
            <img src={album.images[0].url} className="card-img-top" alt={album.name} />
            <div className="card-body">
              <h5 className="card-title">{album.name}</h5>
              <p className="card-text">
                By: {album.artists.map((artist) => artist.name).join(", ")}
              </p>
              <p className="card-text">Tracks: {album.total_tracks}</p>
              <p className="card-text">Released: {album.release_date}</p>
              <a
                href={album.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
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
