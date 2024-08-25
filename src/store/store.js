import { configureStore } from '@reduxjs/toolkit'
import favoritesReducer from './favoritesSlice'
import { loadState, saveState } from './localStorage'

const persistedState = loadState()

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer
  },
  preloadedState: persistedState
});

store.subscribe(() => {
  saveState({
    favorites: store.getState().favorites
  });
});