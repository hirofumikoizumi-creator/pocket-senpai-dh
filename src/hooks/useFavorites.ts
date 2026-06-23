import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FavoriteItem } from '../types';

const FAVORITES_KEY = '@pocket_senpai_favorites';

const sameFavorite = (favorite: FavoriteItem, item: Pick<FavoriteItem, 'id' | 'type'>) => {
  return favorite.id === item.id && favorite.type === item.type;
};

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const saved = await AsyncStorage.getItem(FAVORITES_KEY);
      if (saved) {
        setFavorites(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Failed to load favorites:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addFavorite = useCallback(async (item: Omit<FavoriteItem, 'savedAt'>) => {
    try {
      const newItem: FavoriteItem = {
        ...item,
        savedAt: new Date().toISOString(),
      };
      const updated = [newItem, ...favorites.filter(f => !sameFavorite(f, item))];
      setFavorites(updated);
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to add favorite:', error);
    }
  }, [favorites]);

  const removeFavorite = useCallback(async (id: string, type?: FavoriteItem['type']) => {
    try {
      const updated = favorites.filter(f => (type ? !(f.id === id && f.type === type) : f.id !== id));
      setFavorites(updated);
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to remove favorite:', error);
    }
  }, [favorites]);

  const isFavorite = useCallback((id: string, type?: FavoriteItem['type']) => {
    return favorites.some(f => f.id === id && (!type || f.type === type));
  }, [favorites]);

  const toggleFavorite = useCallback(async (item: Omit<FavoriteItem, 'savedAt'>) => {
    if (isFavorite(item.id, item.type)) {
      await removeFavorite(item.id, item.type);
    } else {
      await addFavorite(item);
    }
  }, [isFavorite, removeFavorite, addFavorite]);

  return {
    favorites,
    isLoading,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite,
    refreshFavorites: loadFavorites,
  };
}
