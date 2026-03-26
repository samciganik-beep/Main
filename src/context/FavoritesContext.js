import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@nordfjord_favorites';

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((stored) => {
        if (stored) setFavorites(JSON.parse(stored));
      })
      .catch(() => {});
  }, []);

  const persist = (ids) => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(ids)).catch(() => {});
  };

  const addFavorite = (id) => {
    const updated = [...favorites, id];
    setFavorites(updated);
    persist(updated);
  };

  const removeFavorite = (id) => {
    const updated = favorites.filter((fid) => fid !== id);
    setFavorites(updated);
    persist(updated);
  };

  const isFavorite = (id) => favorites.includes(id);

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
