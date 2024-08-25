import axios from 'axios';

const CLIENT_ID = process.env.REACT_APP_SPOTY_CLIENT_ID
const CLIENT_SECRET = process.env.REACT_APP_SPOTY_CLIENT_SECRET
const AUTH_URL = 'https://accounts.spotify.com/api/token';
const API_URL = 'https://api.spotify.com/v1';

const SpotyService = {
    getAuthToken: async () => {
        const response = await axios.post(
            AUTH_URL,
            new URLSearchParams({
                grant_type: 'client_credentials',
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
                },
            }
            );
            return response.data.access_token;
    },

    getFeaturedPlaylists: async () => {
    const token = await SpotyService.getAuthToken();
    const response = await axios.get(`${API_URL}/browse/featured-playlists`, {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    });
    return response.data.playlists.items;
    },

    getPlaylist: async (playlistId) => {
    const token = await SpotyService.getAuthToken();
    const response = await axios.get(`${API_URL}/playlists/${playlistId}`, {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
    },

    searchTracks: async (query)=>{
        const token = await SpotyService.getAuthToken();
        const response = await axios.get('https://api.spotify.com/v1/search', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            q: query,
            type: 'track',
        },
        });
        return response.data.tracks.items;
    }
}

export default SpotyService