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
import { AdBanner } from '../src/components/AdBanner';
import { SenpaiCharacter } from '../src/components/SenpaiCharacter';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - SPACING.lg * 3) / 2;

const menuCards = [
  { id: '1', title: '患者説明トーク集', subtitle: '説明の参考に', icon: 'message-text-outline', route: '/talk', color: '#FF6B9D' },
  { id: '2', title: '症例別マニュアル', subtitle: '手順を確認', icon: 'book-open-variant', route: '/manual', color: '#45B7D1' },
  { id: '3', title: 'チェックリスト', subtitle: '準備を確認', icon: 'clipboard-check-outline', route: '/checklist', color: '#96CEB4' },
  { id: '4', title: 'ミニ学習クイズ', subtitle: '知識をチェック', icon: 'lightbulb-outline', route: '/quiz', color: '#FFEAA7' },
  { id: '5', title: 'お気に入り', subtitle: '保存した内容', icon: 'heart-outline', route: '/favorites', color: '#DDA0DD' },
  { id: '6', title: 'プレミアム', subtitle: '月額500円', icon: 'crown-outline', route: '/premium', color: '#4ECDC4' },
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

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.featureCard} onPress={() => router.push('/consultation' as any)} activeOpacity={0.82}>
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>先輩相談AIチャット</Text>
            <Text style={styles.featureDescription}>仕事の不安、説明の迷い、成長の悩みを先輩に相談</Text>
            <View style={styles.featureButton}>
              <Text style={styles.featureButtonText}>相談する</Text>
              <MaterialCommunityIcons name="arrow-right" size={18} color={COLORS.white} />
            </View>
          </View>
          <View style={styles.mentorIllustration}>
            <View style={styles.mentorHalo} />
            <SenpaiCharacter />
          </View>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>学習メニュー</Text>
        <View style={styles.cardsGrid}>
          {menuCards.map((card) => (
            <TouchableOpacity key={card.id} style={styles.card} onPress={() => router.push(card.route as any)} activeOpacity={0.72}>
              <View style={[styles.cardIconContainer, { backgroundColor: card.color + '18' }]}>
                <MaterialCommunityIcons name={card.icon as any} size={30} color={card.color} />
              </View>
              <Text style={styles.cardTitle}>{card.title}</Text>
              <Text style={styles.cardSubtitle}>{card.subtitle}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <AdBanner size="banner" style={styles.adBanner} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: SPACING.lg, paddingTop: SPACING.xl, paddingBottom: SPACING.sm,
  },
  headerText: { flex: 1, paddingRight: SPACING.md },
  appTitle: { fontSize: 30, fontWeight: '800', color: COLORS.text },
  appSubtitle: { fontSize: FONT_SIZES.sm, fontWeight: '600', color: COLORS.textSecondary, marginTop: 4 },
  headerIcon: {
    width: 54, height: 54, borderRadius: 27, backgroundColor: COLORS.surfaceLight,
    justifyContent: 'center', alignItems: 'center',
  },
  disclaimerWrapper: { marginHorizontal: SPACING.lg, marginTop: SPACING.sm, marginBottom: SPACING.lg },
  scrollView: { flex: 1 },
  contentContainer: { paddingHorizontal: SPACING.lg, paddingBottom: SPACING.xxl },
  featureCard: {
    minHeight: 190, backgroundColor: COLORS.white, borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.lg, marginBottom: SPACING.xl, flexDirection: 'row', overflow: 'hidden', ...SHADOWS.md,
  },
  featureContent: { flex: 1, justifyContent: 'center', paddingRight: SPACING.sm },
  featureTitle: { color: COLORS.text, fontSize: FONT_SIZES.xxl, fontWeight: '800', lineHeight: 29, marginBottom: SPACING.sm },
  featureDescription: { color: COLORS.textSecondary, fontSize: FONT_SIZES.md, fontWeight: '500', lineHeight: 23, marginBottom: SPACING.lg },
  featureButton: {
    alignSelf: 'flex-start', minWidth: 126, height: 50, borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.primary, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: SPACING.sm, paddingHorizontal: SPACING.md,
  },
  featureButtonText: { color: COLORS.white, fontSize: FONT_SIZES.md, fontWeight: '800' },
  mentorIllustration: { width: 112, alignItems: 'center', justifyContent: 'center' },
  mentorHalo: { position: 'absolute', width: 104, height: 104, borderRadius: 52, backgroundColor: COLORS.surfaceLight, top: 32 },
  senpaiCharacter: { width: 104, height: 150, alignItems: 'center', position: 'relative' },
  characterShadow: { position: 'absolute', bottom: 0, width: 58, height: 9, borderRadius: 999, backgroundColor: 'rgba(45, 55, 72, 0.12)' },
  hairBack: { position: 'absolute', top: 6, width: 54, height: 58, borderRadius: 27, backgroundColor: '#A86F4C' },
  hairBun: { position: 'absolute', top: 2, right: 21, width: 23, height: 23, borderRadius: 12, backgroundColor: '#8B5E3C', borderWidth: 2, borderColor: '#B98057' },
  face: { position: 'absolute', top: 16, width: 48, height: 48, borderRadius: 24, backgroundColor: '#FFE4D4', borderWidth: 2, borderColor: '#F7C7AF', alignItems: 'center' },
  bangsLeft: { position: 'absolute', top: -5, left: 4, width: 24, height: 18, borderTopLeftRadius: 20, borderBottomRightRadius: 16, backgroundColor: '#8B5E3C', transform: [{ rotate: '-16deg' }] },
  bangsRight: { position: 'absolute', top: -4, right: 5, width: 20, height: 15, borderTopRightRadius: 18, borderBottomLeftRadius: 14, backgroundColor: '#A86F4C', transform: [{ rotate: '18deg' }] },
  eyeRow: { flexDirection: 'row', gap: 13, marginTop: 23 },
  eye: { width: 4, height: 7, borderRadius: 4, backgroundColor: COLORS.text },
  smile: { width: 13, height: 7, borderBottomWidth: 2, borderBottomColor: '#D98677', borderRadius: 8, marginTop: 4 },
  neck: { position: 'absolute', top: 61, width: 16, height: 14, backgroundColor: '#FFD8C4' },
  uniformBody: {
    position: 'absolute', top: 70, width: 58, height: 54, borderRadius: 18, backgroundColor: COLORS.white,
    borderWidth: 2, borderColor: '#E3F6F2', alignItems: 'center', justifyContent: 'center',
  },
  collarLeft: { position: 'absolute', top: 0, left: 15, width: 16, height: 16, borderBottomRightRadius: 12, backgroundColor: '#EEFDF9', transform: [{ rotate: '22deg' }] },
  collarRight: { position: 'absolute', top: 0, right: 15, width: 16, height: 16, borderBottomLeftRadius: 12, backgroundColor: '#EEFDF9', transform: [{ rotate: '-22deg' }] },
  clipboard: { width: 30, height: 32, borderRadius: 8, backgroundColor: '#CFF4ED', alignItems: 'center', justifyContent: 'center', marginTop: 10 },
  armLeft: { position: 'absolute', top: 84, left: 20, width: 13, height: 38, borderRadius: 8, backgroundColor: COLORS.white, borderWidth: 1, borderColor: '#E3F6F2', transform: [{ rotate: '16deg' }] },
  armRight: { position: 'absolute', top: 84, right: 20, width: 13, height: 38, borderRadius: 8, backgroundColor: COLORS.white, borderWidth: 1, borderColor: '#E3F6F2', transform: [{ rotate: '-16deg' }] },
  legLeft: { position: 'absolute', top: 120, left: 43, width: 10, height: 24, borderRadius: 5, backgroundColor: '#F9FFFF', borderWidth: 1, borderColor: '#E3F6F2' },
  legRight: { position: 'absolute', top: 120, right: 43, width: 10, height: 24, borderRadius: 5, backgroundColor: '#F9FFFF', borderWidth: 1, borderColor: '#E3F6F2' },
  shoeLeft: { position: 'absolute', bottom: 4, left: 38, width: 16, height: 7, borderRadius: 5, backgroundColor: COLORS.white, borderWidth: 1, borderColor: '#E3F6F2' },
  shoeRight: { position: 'absolute', bottom: 4, right: 38, width: 16, height: 7, borderRadius: 5, backgroundColor: COLORS.white, borderWidth: 1, borderColor: '#E3F6F2' },
  sectionTitle: { color: COLORS.textSecondary, fontSize: FONT_SIZES.md, fontWeight: '700', marginBottom: SPACING.md },
  cardsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: { width: CARD_WIDTH, minHeight: 172, backgroundColor: COLORS.white, borderRadius: BORDER_RADIUS.xl, padding: SPACING.lg, marginBottom: SPACING.lg, justifyContent: 'center', ...SHADOWS.md },
  cardIconContainer: { width: 58, height: 58, borderRadius: BORDER_RADIUS.lg, justifyContent: 'center', alignItems: 'center', marginBottom: SPACING.lg },
  cardTitle: { fontSize: 20, lineHeight: 26, fontWeight: '800', color: COLORS.text, marginBottom: SPACING.sm },
  cardSubtitle: { fontSize: FONT_SIZES.sm, fontWeight: '600', color: COLORS.textSecondary },
  adBanner: { marginTop: SPACING.md },
});
