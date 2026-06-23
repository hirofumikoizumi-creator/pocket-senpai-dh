import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FavoriteItem } from '../types';
import { useFavorites } from '../hooks/useFavorites';
import { BORDER_RADIUS, COLORS, FONT_SIZES, SPACING } from '../utils/theme';

interface FavoriteButtonProps {
  item: Omit<FavoriteItem, 'savedAt'>;
  compact?: boolean;
}

export function FavoriteButton({ item, compact = false }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(item.id, item.type);

  return (
    <TouchableOpacity
      style={[styles.button, compact && styles.compactButton, active && styles.activeButton]}
      onPress={() => toggleFavorite(item)}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={active ? 'お気に入りから削除' : 'お気に入り登録'}
    >
      <MaterialCommunityIcons
        name={active ? 'heart' : 'heart-outline'}
        size={compact ? 22 : 18}
        color={active ? COLORS.secondary : COLORS.textSecondary}
      />
      {!compact && (
        <Text style={[styles.text, active && styles.activeText]}>
          {active ? 'お気に入り済み' : 'お気に入り登録'}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BORDER_RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  compactButton: {
    alignSelf: 'center',
    width: 40,
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  activeButton: {
    borderColor: '#FFD1E0',
    backgroundColor: '#FFF5F9',
  },
  text: {
    marginLeft: SPACING.xs,
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  activeText: {
    color: COLORS.secondary,
  },
});
