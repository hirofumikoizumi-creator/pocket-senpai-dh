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
import { FREE_PLAN_LIMITS } from '../../src/constants/plans';
import { manuals } from '../../src/data/manuals';
import { Disclaimer } from '../../src/components/Disclaimer';
import { PremiumPrompt } from '../../src/components/PremiumPrompt';
import { useSubscription } from '../../src/hooks/useSubscription';

const categoryIcons: Record<string, { icon: string; color: string }> = {
  'TBI': { icon: 'toothbrush', color: '#4ECDC4' },
  'スケーリング': { icon: 'knife', color: '#45B7D1' },
  'SRP': { icon: 'tooth-outline', color: '#FF6B9D' },
  'PMTC': { icon: 'shimmer', color: '#96CEB4' },
  '小児対応': { icon: 'emoticon-happy-outline', color: '#FECA57' },
  '高齢者対応': { icon: 'account-heart-outline', color: '#DDA0DD' },
  'メンテナンス': { icon: 'calendar-check-outline', color: '#F6AD55' },
};

export default function ManualListScreen() {
  const router = useRouter();
  const { isPremium } = useSubscription();
  const visibleManuals = isPremium ? manuals : manuals.slice(0, FREE_PLAN_LIMITS.contentItems);

  const renderItem = ({ item }: { item: typeof manuals[0] }) => {
    const categoryInfo = categoryIcons[item.category] || { icon: 'book-open-variant', color: COLORS.primary };

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push(`/manual/${item.id}` as any)}
        activeOpacity={0.7}
      >
        <View style={[styles.iconContainer, { backgroundColor: categoryInfo.color + '20' }]}>
          <MaterialCommunityIcons name={categoryInfo.icon as any} size={24} color={categoryInfo.color} />
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.cardCategory}>{item.category}</Text>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardOverview} numberOfLines={2}>{item.overview}</Text>
        </View>
        <MaterialCommunityIcons name="chevron-right" size={20} color={COLORS.textLight} />
      </TouchableOpacity>
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: '症例別マニュアル',
          headerBackTitle: '戻る',
        }}
      />
      <View style={styles.container}>
        <FlatList
          data={visibleManuals}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <>
              <Disclaimer />
              <Text style={styles.headerText}>
                {isPremium
                  ? `全${manuals.length}件のマニュアルを利用できます`
                  : `無料プランでは${FREE_PLAN_LIMITS.contentItems}件まで閲覧できます`}
              </Text>
            </>
          }
          ListFooterComponent={
            !isPremium && manuals.length > visibleManuals.length ? (
              <PremiumPrompt title="マニュアルを全件解放" message="プレミアムでは症例別マニュアルをすべて閲覧できます。" />
            ) : null
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
    marginBottom: 4,
  },
  cardOverview: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
});
