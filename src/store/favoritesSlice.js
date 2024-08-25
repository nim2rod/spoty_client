import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favoriteTracks: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavoriteTrack(state, action) {
      state.favoriteTracks.push(action.payload);
      console.log('add favorite track',[...state.favoriteTracks] )
    },
    removeFavoriteTrack(state, action) {
      state.favoriteTracks = state.favoriteTracks.filter(
        (track) => track.id !== action.payload.id
      );
    }
  },
});

export const {
  addFavoriteTrack,
  removeFavoriteTrack
} = favoritesSlice.actions;

export const selectFavorites = (state) => state.favorites.favoriteTracks;

export default favoritesSlice.reducer;
