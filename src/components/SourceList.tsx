import React from 'react';
import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MEDICAL_REFERENCES } from '../constants/legal';
import { BORDER_RADIUS, COLORS, FONT_SIZES, SPACING } from '../utils/theme';

type SourceListProps = {
  compact?: boolean;
};

export function SourceList({ compact = false }: SourceListProps) {
  return (
    <View style={[styles.container, compact && styles.compact]}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="book-open-page-variant-outline" size={17} color={COLORS.primaryDark} />
        <Text style={styles.title}>出典・参考資料</Text>
      </View>
      <Text style={styles.note}>
        本アプリの学習コンテンツは、以下の公的・専門団体情報を参考に、診断や治療判断を行わない教育用表現として整理しています。
      </Text>
      {MEDICAL_REFERENCES.map((reference) => (
        <TouchableOpacity
          key={reference.url}
          style={styles.linkRow}
          onPress={() => Linking.openURL(reference.url)}
          activeOpacity={0.75}
        >
          <MaterialCommunityIcons name="open-in-new" size={14} color={COLORS.primary} />
          <Text style={styles.linkText}>{reference.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
  },
  compact: {
    marginTop: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  title: {
    color: COLORS.text,
    fontSize: FONT_SIZES.md,
    fontWeight: '800',
    marginLeft: SPACING.xs,
  },
  note: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.xs,
    lineHeight: 18,
    marginBottom: SPACING.sm,
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 5,
  },
  linkText: {
    flex: 1,
    color: COLORS.primaryDark,
    fontSize: FONT_SIZES.sm,
    fontWeight: '700',
    lineHeight: 19,
    marginLeft: SPACING.xs,
  },
});
