import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, SHADOWS } from '../src/utils/theme';
import { Disclaimer } from '../src/components/Disclaimer';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - SPACING.lg * 3) / 2;

interface MenuCard {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  route: string;
  color: string;
}

const menuCards: MenuCard[] = [
  {
    id: '1',
    title: '患者説明トーク集',
    subtitle: '説明の参考に',
    icon: 'message-text-outline',
    route: '/talk',
    color: '#FF6B9D',
  },
  {
    id: '2',
    title: '症例別マニュアル',
    subtitle: '手順を確認',
    icon: 'book-open-variant',
    route: '/manual',
    color: '#45B7D1',
  },
  {
    id: '3',
    title: 'チェックリスト',
    subtitle: '準備を確認',
    icon: 'clipboard-check-outline',
    route: '/checklist',
    color: '#96CEB4',
  },
  {
    id: '4',
    title: 'ミニ学習クイズ',
    subtitle: '知識をチェック',
    icon: 'lightbulb-outline',
    route: '/quiz',
    color: '#FFEAA7',
  },
  {
    id: '5',
    title: 'お気に入り',
    subtitle: '保存した内容',
    icon: 'heart-outline',
    route: '/favorites',
    color: '#DDA0DD',
  },
];

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.appTitle}>ポケット先輩</Text>
          <Text style={styles.appSubtitle}>歯科衛生士のための学習サポート</Text>
        </View>
        <View style={styles.headerIcon}>
          <MaterialCommunityIcons name="tooth-outline" size={30} color={COLORS.primary} />
        </View>
      </View>

      <View style={styles.disclaimerWrapper}>
        <Disclaimer compact />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          style={styles.featureCard}
          onPress={() => router.push('/consultation' as any)}
          activeOpacity={0.82}
        >
          <View style={styles.featureContent}>
            <View style={styles.featureBadge}>
              <MaterialCommunityIcons name="star-outline" size={14} color={COLORS.primaryDark} />
              <Text style={styles.featureBadgeText}>目玉機能</Text>
            </View>
            <Text style={styles.featureTitle}>先輩相談 AIチャット</Text>
            <Text style={styles.featureDescription}>仕事の不安、説明の迷い、成長の悩みを先輩に相談</Text>
            <View style={styles.featureButton}>
              <Text style={styles.featureButtonText}>相談する</Text>
              <MaterialCommunityIcons name="arrow-right" size={18} color={COLORS.white} />
            </View>
          </View>

          <View style={styles.mentorIllustration}>
            <View style={styles.mentorHalo} />
            <View style={styles.mentorHead}>
              <MaterialCommunityIcons name="face-woman-outline" size={44} color="#8B5E3C" />
            </View>
            <View style={styles.mentorBody}>
              <MaterialCommunityIcons name="clipboard-text-outline" size={30} color={COLORS.primaryDark} />
            </View>
          </View>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>学習メニュー</Text>
        <View style={styles.cardsGrid}>
          {menuCards.map((card) => (
            <TouchableOpacity
              key={card.id}
              style={styles.card}
              onPress={() => router.push(card.route as any)}
              activeOpacity={0.72}
            >
              <View style={[styles.cardIconContainer, { backgroundColor: card.color + '18' }]}>
                <MaterialCommunityIcons
                  name={card.icon as any}
                  size={30}
                  color={card.color}
                />
              </View>
              <Text style={styles.cardTitle}>{card.title}</Text>
              <Text style={styles.cardSubtitle}>{card.subtitle}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.adBanner}>
          <Text style={styles.adText}>Ad Banner (banner)</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.sm,
  },
  headerText: {
    flex: 1,
    paddingRight: SPACING.md,
  },
  appTitle: {
    fontSize: 30,
    fontWeight: '800',
    color: COLORS.text,
  },
  appSubtitle: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  headerIcon: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: COLORS.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disclaimerWrapper: {
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.sm,
    marginBottom: SPACING.lg,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xxl,
  },
  featureCard: {
    minHeight: 190,
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.lg,
    marginBottom: SPACING.xl,
    flexDirection: 'row',
    overflow: 'hidden',
    ...SHADOWS.md,
  },
  featureContent: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: SPACING.sm,
  },
  featureBadge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.surfaceLight,
    borderRadius: BORDER_RADIUS.full,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 5,
    marginBottom: SPACING.md,
  },
  featureBadgeText: {
    color: COLORS.primaryDark,
    fontSize: FONT_SIZES.xs,
    fontWeight: '700',
  },
  featureTitle: {
    color: COLORS.text,
    fontSize: FONT_SIZES.xxl,
    fontWeight: '800',
    lineHeight: 29,
    marginBottom: SPACING.sm,
  },
  featureDescription: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.md,
    fontWeight: '500',
    lineHeight: 23,
    marginBottom: SPACING.lg,
  },
  featureButton: {
    alignSelf: 'flex-start',
    minWidth: 126,
    height: 50,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
    paddingHorizontal: SPACING.md,
  },
  featureButtonText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.md,
    fontWeight: '800',
  },
  mentorIllustration: {
    width: 112,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mentorHalo: {
    position: 'absolute',
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: COLORS.surfaceLight,
    top: 34,
  },
  mentorHead: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: '#FFF3EA',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: -4,
    zIndex: 2,
  },
  mentorBody: {
    width: 76,
    height: 74,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#EAF8F5',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  sectionTitle: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.md,
    fontWeight: '700',
    marginBottom: SPACING.md,
  },
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: CARD_WIDTH,
    minHeight: 172,
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    justifyContent: 'center',
    ...SHADOWS.md,
  },
  cardIconContainer: {
    width: 58,
    height: 58,
    borderRadius: BORDER_RADIUS.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  cardTitle: {
    fontSize: 20,
    lineHeight: 26,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  cardSubtitle: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  adBanner: {
    height: 76,
    backgroundColor: COLORS.surfaceLight,
    borderRadius: BORDER_RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.md,
    borderWidth: 1,
    borderColor: '#CDEFE9',
    borderStyle: 'dashed',
  },
  adText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    color: COLORS.textLight,
  },
});
