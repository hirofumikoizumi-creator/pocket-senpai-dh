import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

const SENPAI_IMAGE = require('../../assets/characters/senpai.png');

type SenpaiCharacterProps = {
  compact?: boolean;
};

export function SenpaiCharacter({ compact = false }: SenpaiCharacterProps) {
  return (
    <View style={compact ? styles.compactFrame : styles.frame}>
      <View style={compact ? styles.compactHalo : styles.halo} />
      <Image
        source={SENPAI_IMAGE}
        style={compact ? styles.compactImage : styles.image}
        resizeMode="contain"
        accessibilityLabel="先輩歯科衛生士"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    width: 122,
    height: 156,
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'relative',
  },
  halo: {
    position: 'absolute',
    bottom: 2,
    width: 112,
    height: 124,
    borderRadius: 44,
    backgroundColor: '#E9FAF7',
    borderWidth: 1,
    borderColor: '#D6F4EF',
  },
  image: {
    width: 122,
    height: 156,
  },
  compactFrame: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  compactHalo: {
    position: 'absolute',
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#E9FAF7',
  },
  compactImage: {
    width: 48,
    height: 58,
    marginTop: 10,
  },
});
