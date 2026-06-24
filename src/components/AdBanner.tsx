import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../utils/theme';
import { useSubscription } from '../hooks/useSubscription';

/**
 * バナー広告コンポーネント
 *
 * 本番環境では react-native-google-mobile-ads の BannerAd を使用。
 * プレミアム会員は広告を非表示にします。
 */

interface AdBannerProps {
  size?: 'banner' | 'largeBanner' | 'mediumRectangle';
  style?: object;
}

export function AdBanner({ size = 'banner', style }: AdBannerProps) {
  const { isPremium } = useSubscription();
  const height = size === 'banner' ? 50 : size === 'largeBanner' ? 100 : 250;

  if (isPremium) return null;

  return (
    <View style={[styles.container, { height }, style]}>
      <Text style={styles.text}>Ad Banner ({size})</Text>
    </View>
  );
}

/**
 * インライン広告コンポーネント（記事内に表示）
 */
export function InlineAd({ style }: { style?: object }) {
  const { isPremium } = useSubscription();

  if (isPremium) return null;

  return (
    <View style={[styles.inlineContainer, style]}>
      <Text style={styles.inlineLabel}>PR</Text>
      <Text style={styles.text}>インライン広告スペース</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surfaceLight,
    borderRadius: BORDER_RADIUS.sm,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
  },
  text: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textLight,
  },
  inlineContainer: {
    backgroundColor: COLORS.surfaceLight,
    borderRadius: BORDER_RADIUS.sm,
    padding: SPACING.md,
    marginVertical: SPACING.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
  },
  inlineLabel: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textLight,
    backgroundColor: COLORS.border,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: SPACING.xs,
    overflow: 'hidden',
  },
});
