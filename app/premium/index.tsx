import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Stack } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BORDER_RADIUS, COLORS, FONT_SIZES, SHADOWS, SPACING } from '../../src/utils/theme';
import { FREE_PLAN_LIMITS, PREMIUM_PLAN } from '../../src/constants/plans';
import { useSubscription } from '../../src/hooks/useSubscription';

const premiumBenefits = [
  '先輩相談AIチャット無制限',
  '患者説明トーク集を全件閲覧',
  '症例別マニュアルを全件閲覧',
  'チェックリストを全件利用',
  'ミニ学習クイズを全問利用',
  'お気に入り登録無制限',
  '広告なし',
];

const freeLimits = [
  `チャット1日${FREE_PLAN_LIMITS.dailyChatMessages}回`,
  `各コンテンツ${FREE_PLAN_LIMITS.contentItems}件まで`,
  `クイズ1日${FREE_PLAN_LIMITS.dailyQuizQuestions}問`,
  `お気に入り${FREE_PLAN_LIMITS.favorites}件まで`,
  '広告あり',
];

export default function PremiumScreen() {
  const { isPremium, subscriptionSource, setDevelopmentPremium } = useSubscription();

  const handlePurchase = () => {
    Alert.alert(
      '課金連携準備中',
      `App Store Connect / RevenueCat で ${PREMIUM_PLAN.productId} を接続すると、このボタンから月額500円プランを購入できるようになります。`
    );
  };

  const handleRestore = () => {
    Alert.alert('復元準備中', '購入復元は課金SDK接続後に有効になります。');
  };

  const handleDevelopmentToggle = () => {
    Alert.alert(
      '開発確認用',
      isPremium ? '無料プラン表示に戻しますか？' : 'プレミアム状態として画面表示を確認しますか？',
      [
        { text: 'キャンセル', style: 'cancel' },
        {
          text: isPremium ? '無料に戻す' : '有効にする',
          onPress: () => setDevelopmentPremium(!isPremium),
        },
      ]
    );
  };

  return (
    <>
      <Stack.Screen options={{ title: 'プレミアム', headerBackTitle: '戻る' }} />
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <View style={styles.crownCircle}>
            <MaterialCommunityIcons name="crown-outline" size={36} color={COLORS.primaryDark} />
          </View>
          <Text style={styles.title}>{PREMIUM_PLAN.name}</Text>
          <Text style={styles.price}>{PREMIUM_PLAN.priceLabel}</Text>
          <Text style={styles.description}>
            仕事中の確認と学習を、制限なく使えるプランです。
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>無料プラン</Text>
          {freeLimits.map((item) => (
            <View key={item} style={styles.row}>
              <MaterialCommunityIcons name="check-circle-outline" size={18} color={COLORS.textLight} />
              <Text style={styles.freeText}>{item}</Text>
            </View>
          ))}
        </View>

        <View style={[styles.section, styles.premiumSection]}>
          <Text style={styles.sectionTitle}>有料プランでできること</Text>
          {premiumBenefits.map((item) => (
            <View key={item} style={styles.row}>
              <MaterialCommunityIcons name="check-circle" size={18} color={COLORS.primary} />
              <Text style={styles.benefitText}>{item}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.purchaseButton} onPress={handlePurchase} activeOpacity={0.75}>
          <Text style={styles.purchaseText}>{PREMIUM_PLAN.priceLabel}で始める</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.restoreButton} onPress={handleRestore} activeOpacity={0.75}>
          <Text style={styles.restoreText}>購入を復元</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.devButton} onPress={handleDevelopmentToggle} activeOpacity={0.75}>
          <Text style={styles.devText}>
            開発確認: {isPremium ? `プレミアム有効 (${subscriptionSource})` : '無料プラン'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SPACING.lg,
    paddingBottom: SPACING.xxl,
  },
  hero: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.xl,
    marginBottom: SPACING.lg,
    ...SHADOWS.md,
  },
  crownCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLORS.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  title: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: '800',
    color: COLORS.text,
    textAlign: 'center',
  },
  price: {
    fontSize: 34,
    fontWeight: '800',
    color: COLORS.primary,
    marginTop: SPACING.sm,
  },
  description: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginTop: SPACING.sm,
  },
  section: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    ...SHADOWS.sm,
  },
  premiumSection: {
    borderWidth: 1,
    borderColor: '#CDEFE9',
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.xs,
  },
  freeText: {
    flex: 1,
    marginLeft: SPACING.sm,
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
  },
  benefitText: {
    flex: 1,
    marginLeft: SPACING.sm,
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
    fontWeight: '600',
  },
  purchaseButton: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.full,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    marginTop: SPACING.sm,
  },
  purchaseText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.lg,
    fontWeight: '800',
  },
  restoreButton: {
    alignItems: 'center',
    paddingVertical: SPACING.md,
  },
  restoreText: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },
  devButton: {
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.md,
    alignItems: 'center',
    marginTop: SPACING.md,
  },
  devText: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
  },
});
