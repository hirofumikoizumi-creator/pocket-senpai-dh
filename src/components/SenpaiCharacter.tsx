import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../utils/theme';

type SenpaiCharacterProps = {
  compact?: boolean;
};

export function SenpaiCharacter({ compact = false }: SenpaiCharacterProps) {
  return (
    <View style={compact ? styles.compactFrame : styles.frame}>
      <View style={[styles.character, compact && styles.compactCharacter]}>
        <View style={styles.shadow} />
        <View style={styles.backGlow} />
        <View style={styles.hairBack} />
        <View style={styles.hairBun} />
        <View style={styles.hairBunDetail} />
        <View style={styles.sideHairLeft} />
        <View style={styles.sideHairRight} />
        <View style={styles.face}>
          <View style={styles.bangLeft} />
          <View style={styles.bangCenter} />
          <View style={styles.bangRight} />
          <View style={styles.eyeLeft}>
            <View style={styles.eyeHighlight} />
          </View>
          <View style={styles.eyeRight}>
            <View style={styles.eyeHighlight} />
          </View>
          <View style={styles.blushLeft} />
          <View style={styles.blushRight} />
          <View style={styles.smile} />
        </View>
        <View style={styles.neck} />
        <View style={styles.uniform}>
          <View style={styles.collarLeft} />
          <View style={styles.collarRight} />
          <View style={styles.buttonOne} />
          <View style={styles.buttonTwo} />
        </View>
        <View style={styles.armLeft} />
        <View style={styles.armRight} />
        <View style={styles.clipboard}>
          <View style={styles.clipTop} />
          <MaterialCommunityIcons name="tooth-outline" size={compact ? 20 : 24} color={COLORS.primary} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    width: 112,
    height: 150,
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
    width: 112,
    height: 150,
    alignItems: 'center',
    position: 'relative',
  },
  compactCharacter: {
    transform: [{ scale: 0.34 }],
  },
  shadow: {
    position: 'absolute',
    bottom: 0,
    width: 64,
    height: 10,
    borderRadius: 999,
    backgroundColor: 'rgba(48, 70, 79, 0.14)',
  },
  backGlow: {
    position: 'absolute',
    top: 24,
    width: 92,
    height: 100,
    borderRadius: 46,
    backgroundColor: '#E9FAF7',
  },
  hairBack: {
    position: 'absolute',
    top: 13,
    width: 62,
    height: 72,
    borderRadius: 32,
    backgroundColor: '#8B614A',
  },
  hairBun: {
    position: 'absolute',
    top: 5,
    right: 24,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#8A5E45',
    borderWidth: 2,
    borderColor: '#B48365',
  },
  hairBunDetail: {
    position: 'absolute',
    top: 9,
    right: 29,
    width: 19,
    height: 19,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(80, 48, 34, 0.32)',
  },
  sideHairLeft: {
    position: 'absolute',
    top: 42,
    left: 30,
    width: 13,
    height: 41,
    borderRadius: 10,
    backgroundColor: '#7E563F',
    transform: [{ rotate: '8deg' }],
  },
  sideHairRight: {
    position: 'absolute',
    top: 42,
    right: 30,
    width: 13,
    height: 41,
    borderRadius: 10,
    backgroundColor: '#7E563F',
    transform: [{ rotate: '-8deg' }],
  },
  face: {
    position: 'absolute',
    top: 29,
    width: 56,
    height: 61,
    borderRadius: 28,
    backgroundColor: '#FFE1CF',
    borderWidth: 2,
    borderColor: '#F4C3AA',
    alignItems: 'center',
  },
  bangLeft: {
    position: 'absolute',
    top: -8,
    left: 2,
    width: 29,
    height: 23,
    borderTopLeftRadius: 22,
    borderBottomRightRadius: 20,
    backgroundColor: '#7A503A',
    transform: [{ rotate: '-20deg' }],
  },
  bangCenter: {
    position: 'absolute',
    top: -10,
    left: 20,
    width: 20,
    height: 27,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    backgroundColor: '#9B6B50',
    transform: [{ rotate: '8deg' }],
  },
  bangRight: {
    position: 'absolute',
    top: -7,
    right: 3,
    width: 26,
    height: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 16,
    backgroundColor: '#8B614A',
    transform: [{ rotate: '18deg' }],
  },
  eyeLeft: {
    position: 'absolute',
    top: 30,
    left: 14,
    width: 9,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4B3329',
  },
  eyeRight: {
    position: 'absolute',
    top: 30,
    right: 14,
    width: 9,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4B3329',
  },
  eyeHighlight: {
    position: 'absolute',
    top: 2,
    left: 2,
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: '#FFFFFF',
  },
  blushLeft: {
    position: 'absolute',
    top: 42,
    left: 8,
    width: 9,
    height: 5,
    borderRadius: 5,
    backgroundColor: 'rgba(237, 143, 132, 0.36)',
  },
  blushRight: {
    position: 'absolute',
    top: 42,
    right: 8,
    width: 9,
    height: 5,
    borderRadius: 5,
    backgroundColor: 'rgba(237, 143, 132, 0.36)',
  },
  smile: {
    position: 'absolute',
    top: 45,
    width: 16,
    height: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#C7746A',
    borderRadius: 10,
  },
  neck: {
    position: 'absolute',
    top: 86,
    width: 18,
    height: 14,
    backgroundColor: '#FFD6C2',
  },
  uniform: {
    position: 'absolute',
    top: 96,
    width: 62,
    height: 48,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#DCEDEA',
    alignItems: 'center',
  },
  collarLeft: {
    position: 'absolute',
    top: 0,
    left: 17,
    width: 16,
    height: 17,
    borderBottomRightRadius: 12,
    backgroundColor: '#F2FFFC',
    borderRightWidth: 1,
    borderRightColor: '#DCEDEA',
    transform: [{ rotate: '24deg' }],
  },
  collarRight: {
    position: 'absolute',
    top: 0,
    right: 17,
    width: 16,
    height: 17,
    borderBottomLeftRadius: 12,
    backgroundColor: '#F2FFFC',
    borderLeftWidth: 1,
    borderLeftColor: '#DCEDEA',
    transform: [{ rotate: '-24deg' }],
  },
  buttonOne: {
    position: 'absolute',
    top: 22,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#9EDBD5',
  },
  buttonTwo: {
    position: 'absolute',
    top: 32,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#9EDBD5',
  },
  armLeft: {
    position: 'absolute',
    top: 106,
    left: 25,
    width: 13,
    height: 35,
    borderRadius: 8,
    backgroundColor: '#FFE0CD',
    transform: [{ rotate: '17deg' }],
  },
  armRight: {
    position: 'absolute',
    top: 106,
    right: 25,
    width: 13,
    height: 35,
    borderRadius: 8,
    backgroundColor: '#FFE0CD',
    transform: [{ rotate: '-17deg' }],
  },
  clipboard: {
    position: 'absolute',
    top: 100,
    left: 24,
    width: 32,
    height: 45,
    borderRadius: 6,
    backgroundColor: '#BEEBE6',
    borderWidth: 2,
    borderColor: '#87CFC8',
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '-10deg' }],
  },
  clipTop: {
    position: 'absolute',
    top: -5,
    width: 16,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E8FFFC',
    borderWidth: 1,
    borderColor: '#87CFC8',
  },
});
