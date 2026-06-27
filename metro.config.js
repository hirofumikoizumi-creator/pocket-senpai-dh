const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.assetExts = Array.from(new Set([...config.resolver.assetExts, 'gguf']));
config.resolver.sourceExts = config.resolver.sourceExts.filter((ext) => ext !== 'gguf');

module.exports = config;
