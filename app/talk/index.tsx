import React from 'react';
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
import { talkScripts } from '../../src/data/talks';
import { Disclaimer } from '../../src/components/Disclaimer';

const categoryIcons: Record<string, { icon: string; color: string }> = {
  '歯周病説明': { icon: 'tooth-outline', color: '#4ECDC4' },
  'フロス説明': { icon: 'shimmer', color: '#FF6B9D' },
  '歯石説明': { icon: 'diamond-stone', color: '#45B7D1' },
  '定期検診説明': { icon: 'calendar-check-outline', color: '#96CEB4' },
  '小児歯科説明': { icon: 'emoticon-happy-outline', color: '#FECA57' },
  '自費クリーニング説明': { icon: 'star-outline', color: '#DDA0DD' },
};

export default function TalkListScreen() {
  const router = useRouter();

  const renderItem = ({ item }: { item: typeof talkScripts[0] }) => {
    const categoryInfo = categoryIcons[item.category] || { icon: 'message-text-outline', color: COLORS.primary };

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push(`/talk/${item.id}` as any)}
        activeOpacity={0.7}
      >
        <View style={[styles.iconContainer, { backgroundColor: categoryInfo.color + '20' }]}>
          <MaterialCommunityIcons name={categoryInfo.icon as any} size={24} color={categoryInfo.color} />
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.cardCategory}>{item.category}</Text>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardSituation} numberOfLines={1}>{item.situation}</Text>
        </View>
        <MaterialCommunityIcons name="chevron-right" size={20} color={COLORS.textLight} />
      </TouchableOpacity>
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: '患者説明トーク集',
          headerBackTitle: '戻る',
        }}
      />
      <View style={styles.container}>
        <FlatList
          data={talkScripts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <>
              <Disclaimer />
              <Text style={styles.headerText}>
                患者さんへの説明で使える会話例を集めました
              </Text>
            </>
          }
        />
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
  headerText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
    paddingHorizontal: SPACING.xs,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    ...SHADOWS.sm,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: BORDER_RADIUS.sm,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  cardContent: {
    flex: 1,
  },
  cardCategory: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.primary,
    fontWeight: '500',
    marginBottom: 2,
  },
  cardTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 2,
  },
  cardSituation: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
});
