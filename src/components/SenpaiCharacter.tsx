import React from 'react';
import { ImageStyle, StyleSheet, View, ViewStyle } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../utils/theme';

type SenpaiCharacterProps = {
  compact?: boolean;
};

export function SenpaiCharacter({ compact = false }: SenpaiCharacterProps) {
  return (
    <View style={compact ? styles.compactFrame : styles.frame}>
      <View style={[styles.character, compact && styles.compactCharacter]}>
        <View style={styles.softHalo} />
        <View style={styles.shadow} />

        <View style={styles.hairBack} />
        <View style={styles.hairBun} />
        <View style={styles.hairBunLoopOne} />
        <View style={styles.hairBunLoopTwo} />
        <View style={styles.hairSideLeft} />
        <View style={styles.hairSideRight} />

        <View style={styles.neck} />
        <View style={styles.uniformSkirt} />
        <View style={styles.uniformBody}>
          <View style={styles.collarLeft} />
          <View style={styles.collarRight} />
          <View style={styles.namePlate} />
          <View style={styles.buttonOne} />
          <View style={styles.buttonTwo} />
          <View style={styles.pocketLine} />
        </View>

        <View style={styles.armLeft} />
        <View style={styles.armRight} />
        <View style={styles.clipboard}>
          <View style={styles.clipTop} />
          <View style={styles.clipLineLong} />
          <View style={styles.clipLineShort} />
          <MaterialCommunityIcons name="tooth-outline" size={26} color={COLORS.primary} />
        </View>

        <View style={styles.face}>
          <View style={styles.bangLeft} />
          <View style={styles.bangCenter} />
          <View style={styles.bangRight} />
          <View style={styles.eyebrowLeft} />
          <View style={styles.eyebrowRight} />
          <View style={styles.eyeLeft}>
            <View style={styles.eyeHighlightLarge} />
            <View style={styles.eyeHighlightSmall} />
          </View>
          <View style={styles.eyeRight}>
            <View style={styles.eyeHighlightLarge} />
            <View style={styles.eyeHighlightSmall} />
          </View>
          <View style={styles.nose} />
          <View style={styles.blushLeft} />
          <View style={styles.blushRight} />
          <View style={styles.smile} />
        </View>
      </View>
    </View>
  );
}

type NamedStyle = ViewStyle | ImageStyle;

const styles = StyleSheet.create<Record<string, NamedStyle>>({
  frame: {
    width: 118,
    height: 146,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  compactFrame: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  character: {
    width: 118,
    height: 146,
    alignItems: 'center',
    position: 'relative',
  },
  compactCharacter: {
    transform: [{ scale: 0.34 }],
  },
  softHalo: {
    position: 'absolute',
    top: 18,
    width: 108,
    height: 112,
    borderRadius: 48,
    backgroundColor: '#E9FAF7',
    borderWidth: 1,
    borderColor: '#D6F4EF',
  },
  shadow: {
    position: 'absolute',
    bottom: 2,
    width: 70,
    height: 11,
    borderRadius: 999,
    backgroundColor: 'rgba(48, 70, 79, 0.14)',
  },
  hairBack: {
    position: 'absolute',
    top: 12,
    width: 72,
    height: 76,
    borderRadius: 34,
    backgroundColor: '#8E6248',
  },
  hairBun: {
    position: 'absolute',
    top: 0,
    right: 23,
    width: 39,
    height: 39,
    borderRadius: 18,
    backgroundColor: '#8C6348',
    borderWidth: 2,
    borderColor: '#B9896D',
  },
  hairBunLoopOne: {
    position: 'absolute',
    top: 6,
    right: 30,
    width: 23,
    height: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(76, 47, 35, 0.35)',
    transform: [{ rotate: '-18deg' }],
  },
  hairBunLoopTwo: {
    position: 'absolute',
    top: 15,
    right: 31,
    width: 22,
    height: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(76, 47, 35, 0.28)',
    transform: [{ rotate: '22deg' }],
  },
  hairSideLeft: {
    position: 'absolute',
    top: 40,
    left: 27,
    width: 15,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#7A513B',
    transform: [{ rotate: '8deg' }],
  },
  hairSideRight: {
    position: 'absolute',
    top: 40,
    right: 27,
    width: 15,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#7A513B',
    transform: [{ rotate: '-8deg' }],
  },
  neck: {
    position: 'absolute',
    top: 85,
    width: 18,
    height: 14,
    borderRadius: 8,
    backgroundColor: '#FFD8C5',
  },
  uniformSkirt: {
    position: 'absolute',
    top: 119,
    width: 54,
    height: 21,
    borderRadius: 12,
    backgroundColor: '#F8FFFD',
    borderWidth: 1,
    borderColor: '#DCEDEA',
  },
  uniformBody: {
    position: 'absolute',
    top: 94,
    width: 63,
    height: 42,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 11,
    borderBottomRightRadius: 11,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#DCEDEA',
    alignItems: 'center',
  },
  collarLeft: {
    position: 'absolute',
    top: -1,
    left: 16,
    width: 19,
    height: 19,
    borderBottomRightRadius: 13,
    backgroundColor: '#F3FFFC',
    borderRightWidth: 1,
    borderRightColor: '#DCEDEA',
    transform: [{ rotate: '24deg' }],
  },
  collarRight: {
    position: 'absolute',
    top: -1,
    right: 16,
    width: 19,
    height: 19,
    borderBottomLeftRadius: 13,
    backgroundColor: '#F3FFFC',
    borderLeftWidth: 1,
    borderLeftColor: '#DCEDEA',
    transform: [{ rotate: '-24deg' }],
  },
  namePlate: {
    position: 'absolute',
    top: 20,
    right: 10,
    width: 15,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#A9E5DE',
  },
  buttonOne: {
    position: 'absolute',
    top: 22,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#93D8D1',
  },
  buttonTwo: {
    position: 'absolute',
    top: 32,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#93D8D1',
  },
  pocketLine: {
    position: 'absolute',
    top: 33,
    left: 11,
    width: 14,
    height: 1,
    backgroundColor: '#DCEDEA',
  },
  armLeft: {
    position: 'absolute',
    top: 104,
    left: 30,
    width: 13,
    height: 30,
    borderRadius: 9,
    backgroundColor: '#FFE0CE',
    transform: [{ rotate: '21deg' }],
  },
  armRight: {
    position: 'absolute',
    top: 104,
    right: 29,
    width: 13,
    height: 30,
    borderRadius: 9,
    backgroundColor: '#FFE0CE',
    transform: [{ rotate: '-20deg' }],
  },
  clipboard: {
    position: 'absolute',
    top: 98,
    left: 25,
    width: 35,
    height: 44,
    borderRadius: 7,
    backgroundColor: '#BFEDE8',
    borderWidth: 2,
    borderColor: '#86D0C8',
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '-9deg' }],
    shadowColor: '#5EAFA7',
    shadowOpacity: 0.16,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  clipTop: {
    position: 'absolute',
    top: -6,
    width: 18,
    height: 9,
    borderRadius: 5,
    backgroundColor: '#F0FFFC',
    borderWidth: 1,
    borderColor: '#86D0C8',
  },
  clipLineLong: {
    position: 'absolute',
    top: 12,
    width: 20,
    height: 2,
    borderRadius: 1,
    backgroundColor: '#DFFFFB',
  },
  clipLineShort: {
    position: 'absolute',
    top: 17,
    width: 14,
    height: 2,
    borderRadius: 1,
    backgroundColor: '#DFFFFB',
  },
  face: {
    position: 'absolute',
    top: 24,
    width: 70,
    height: 70,
    borderRadius: 34,
    backgroundColor: '#FFE2D0',
    borderWidth: 2,
    borderColor: '#F3C2AA',
    alignItems: 'center',
    shadowColor: '#9B6A50',
    shadowOpacity: 0.08,
    shadowRadius: 7,
    shadowOffset: { width: 0, height: 4 },
  },
  bangLeft: {
    position: 'absolute',
    top: -11,
    left: 2,
    width: 36,
    height: 25,
    borderTopLeftRadius: 24,
    borderBottomRightRadius: 22,
    backgroundColor: '#7A503A',
    transform: [{ rotate: '-19deg' }],
  },
  bangCenter: {
    position: 'absolute',
    top: -13,
    left: 25,
    width: 24,
    height: 30,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    backgroundColor: '#9A6B50',
    transform: [{ rotate: '7deg' }],
  },
  bangRight: {
    position: 'absolute',
    top: -10,
    right: 2,
    width: 34,
    height: 23,
    borderTopRightRadius: 22,
    borderBottomLeftRadius: 18,
    backgroundColor: '#8B614A',
    transform: [{ rotate: '18deg' }],
  },
  eyebrowLeft: {
    position: 'absolute',
    top: 31,
    left: 15,
    width: 11,
    height: 2,
    borderRadius: 1,
    backgroundColor: 'rgba(78, 50, 37, 0.28)',
    transform: [{ rotate: '-8deg' }],
  },
  eyebrowRight: {
    position: 'absolute',
    top: 31,
    right: 15,
    width: 11,
    height: 2,
    borderRadius: 1,
    backgroundColor: 'rgba(78, 50, 37, 0.28)',
    transform: [{ rotate: '8deg' }],
  },
  eyeLeft: {
    position: 'absolute',
    top: 38,
    left: 16,
    width: 11,
    height: 14,
    borderRadius: 6,
    backgroundColor: '#463027',
  },
  eyeRight: {
    position: 'absolute',
    top: 38,
    right: 16,
    width: 11,
    height: 14,
    borderRadius: 6,
    backgroundColor: '#463027',
  },
  eyeHighlightLarge: {
    position: 'absolute',
    top: 2,
    left: 2,
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: '#FFFFFF',
  },
  eyeHighlightSmall: {
    position: 'absolute',
    top: 6,
    right: 2,
    width: 2,
    height: 2,
    borderRadius: 1,
    backgroundColor: 'rgba(255,255,255,0.85)',
  },
  nose: {
    position: 'absolute',
    top: 48,
    width: 2,
    height: 3,
    borderRadius: 1,
    backgroundColor: 'rgba(197, 119, 96, 0.3)',
  },
  blushLeft: {
    position: 'absolute',
    top: 51,
    left: 9,
    width: 11,
    height: 5,
    borderRadius: 5,
    backgroundColor: 'rgba(238, 143, 132, 0.36)',
  },
  blushRight: {
    position: 'absolute',
    top: 51,
    right: 9,
    width: 11,
    height: 5,
    borderRadius: 5,
    backgroundColor: 'rgba(238, 143, 132, 0.36)',
  },
  smile: {
    position: 'absolute',
    top: 55,
    width: 18,
    height: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#C7746A',
    borderRadius: 10,
  },
});


