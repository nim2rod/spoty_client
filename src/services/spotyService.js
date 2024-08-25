import axios from 'axios';

const CLIENT_ID = process.env.REACT_APP_SPOTY_CLIENT_ID
const CLIENT_SECRET = process.env.REACT_APP_SPOTY_CLIENT_SECRET
const AUTH_URL = 'https://accounts.spotify.com/api/token';
const API_URL = 'https://api.spotify.com/v1';
let accessToken = null;
let tokenExpiresAt = null;

const SpotyService = {
    getAuthToken: async () => {
        if (accessToken && tokenExpiresAt && new Date() < tokenExpiresAt) {
            return accessToken;
        }
        try {
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

                
            accessToken = response.data.access_token
            const expiresIn = response.data.expires_in
            tokenExpiresAt = new Date(new Date().getTime() + expiresIn * 1000)
            return accessToken
                
            } catch (error) {
                console.error('Error fetching auth token:', error.response?.data || error.message);
                throw error;
            }
    },

    getFeaturedPlaylists: async () => {
        console.log('getFeaturedPlaylists have been called')

        try {
            
                const token = await SpotyService.getAuthToken();
                console.log('token at getFeaturedPlaylists: ',token)
                const response = await axios.get(`${API_URL}/browse/featured-playlists`, {
                    headers: {
                    Authorization: `Bearer ${token}`,
                    },
                });
                console.log('response at getFeaturedPlaylists: ', response)
                return response.data.playlists.items;
            } catch (error) {
                console.error('Error fetching featured playlists:', error.response?.data || error.message);
                throw error;
            }
    },

    getPlaylist: async (playlistId) => {
        try {
            const token = await SpotyService.getAuthToken();
            const response = await axios.get(`${API_URL}/playlists/${playlistId}`, {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error(`Error fetching playlist ${playlistId}:`, error.response?.data || error.message);
            throw error;
        }
    },

    searchTracks: async (query)=>{
        try {
            
    
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
        } catch (error) {
            console.error(`Error searching tracks with query "${query}":`, error.response?.data || error.message);
            throw error;
        }
    }
}

export default SpotyService