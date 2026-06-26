import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, SHADOWS } from '../../src/utils/theme';
import { useFavorites } from '../../src/hooks/useFavorites';
import { FavoriteItem } from '../../src/types';
import { Disclaimer } from '../../src/components/Disclaimer';

const typeIcons: Record<string, { icon: string; color: string }> = {
  consultation: { icon: 'chat-processing-outline', color: '#4ECDC4' },
  talk: { icon: 'message-text-outline', color: '#FF6B9D' },
  manual: { icon: 'book-open-variant', color: '#45B7D1' },
  checklist: { icon: 'clipboard-check-outline', color: '#96CEB4' },
  quiz: { icon: 'lightbulb-outline', color: '#FECA57' },
};

const typeLabels: Record<string, string> = {
  consultation: '先輩相談',
  talk: 'トーク集',
  manual: 'マニュアル',
  checklist: 'チェックリスト',
  quiz: 'クイズ',
};

export default function FavoritesScreen() {
  const router = useRouter();
  const { favorites, removeFavorite, refreshFavorites } = useFavorites();

  useEffect(() => {
    refreshFavorites();
  }, []);

  const getRoute = (item: FavoriteItem): string => {
    switch (item.type) {
      case 'talk':
        return `/talk/${item.id}`;
      case 'manual':
        return `/manual/${item.id}`;
      default:
        return `/${item.type}`;
    }
  };

  const renderItem = ({ item }: { item: FavoriteItem }) => {
    const typeInfo = typeIcons[item.type] || { icon: 'star', color: COLORS.primary };
    const details = item.details?.filter(detail => detail.text.trim()) ?? [];

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push(getRoute(item) as any)}
        activeOpacity={0.7}
      >
        <View style={styles.cardHeader}>
          <View style={[styles.iconContainer, { backgroundColor: typeInfo.color + '20' }]}>
            <MaterialCommunityIcons name={typeInfo.icon as any} size={22} color={typeInfo.color} />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardType}>{typeLabels[item.type]}</Text>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardCategory}>{item.category}</Text>
          </View>
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => removeFavorite(item.id, item.type)}
            accessibilityRole="button"
            accessibilityLabel="お気に入りから削除"
          >
            <MaterialCommunityIcons name="heart" size={20} color={COLORS.secondary} />
          </TouchableOpacity>
        </View>

        {item.summary && <Text style={styles.summaryText}>{item.summary}</Text>}

        {details.length > 0 && (
          <View style={styles.detailList}>
            {details.map((detail, index) => (
              <View key={`${detail.label}-${index}`} style={styles.detailBlock}>
                <Text style={styles.detailLabel}>{detail.label}</Text>
                <Text style={styles.detailText}>{detail.text}</Text>
              </View>
            ))}
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'お気に入り',
          headerBackTitle: '戻る',
        }}
      />
      <View style={styles.container}>
        {favorites.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Disclaimer />
            <MaterialCommunityIcons name="heart-outline" size={60} color={COLORS.textLight} />
            <Text style={styles.emptyTitle}>お気に入りはまだありません</Text>
            <Text style={styles.emptySubtitle}>
              気になった内容のハートマークをタップすると{'\n'}ここで内容まで確認できます
            </Text>
          </View>
        ) : (
          <FlatList
            data={favorites}
            renderItem={renderItem}
            keyExtractor={(item) => `${item.type}-${item.id}-${item.savedAt}`}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={<Disclaimer />}
          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContent: {
    padding: SPACING.md,
    paddingBottom: SPACING.xxl,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
  },
  emptyTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginTop: SPACING.md,
  },
  emptySubtitle: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textLight,
    textAlign: 'center',
    marginTop: SPACING.sm,
    lineHeight: 22,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    ...SHADOWS.sm,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.sm,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  cardContent: {
    flex: 1,
  },
  cardType: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.primary,
    fontWeight: '500',
  },
  cardTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.text,
    marginTop: 2,
  },
  cardCategory: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  summaryText: {
    marginTop: SPACING.sm,
    fontSize: FONT_SIZES.sm,
    color: COLORS.text,
    lineHeight: 20,
  },
  detailList: {
    marginTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: SPACING.sm,
  },
  detailBlock: {
    marginBottom: SPACING.sm,
  },
  detailLabel: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.primary,
    fontWeight: '700',
    marginBottom: 2,
  },
  detailText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  removeButton: {
    padding: SPACING.sm,
  },
});
