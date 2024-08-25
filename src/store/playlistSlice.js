import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  playlists: [],
  favoriteTracks: [],
  loading: false,
};

const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    setPlaylists(state, action) {
      state.playlists = action.payload;
    },
    addFavoriteTrack(state, action) {
      state.favoriteTracks.push(action.payload);
    },
    removeFavoriteTrack(state, action) {
      state.favoriteTracks = state.favoriteTracks.filter(
        (track) => track.id !== action.payload.id
      );
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const {
  setPlaylists,
  addFavoriteTrack,
  removeFavoriteTrack,
  setLoading,
} = playlistSlice.actions;

export default playlistSlice.reducer;
