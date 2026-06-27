const IS_PRODUCTION_BUILD = process.env.EAS_BUILD_PROFILE === 'production';

function readEnv(name, fallback) {
  const value = process.env[name];
  if (value && value.trim()) {
    return value.trim();
  }
  if (IS_PRODUCTION_BUILD) {
    throw new Error(`Missing required production environment variable: ${name}`);
  }
  return fallback;
}

function readOptionalEnv(name, fallback) {
  const value = process.env[name];
  return value && value.trim() ? value.trim() : fallback;
}

const admobIosAppId = readEnv('ADMOB_IOS_APP_ID', 'ca-app-pub-5840457424714744~4483779292');
const admobAndroidAppId = readEnv('ADMOB_ANDROID_APP_ID', 'ca-app-pub-XXXXXXXXXXXXXXXX~YYYYYYYYYY');
const admobBannerUnitId = readOptionalEnv('ADMOB_BANNER_UNIT_ID', 'ca-app-pub-5840457424714744/1680532309');
const admobInterstitialUnitId = readOptionalEnv('ADMOB_INTERSTITIAL_UNIT_ID', 'ca-app-pub-5840457424714744/6338530833');
const admobRewardedUnitId = readOptionalEnv('ADMOB_REWARDED_UNIT_ID', 'ca-app-pub-5840457424714744/6918370940');
const revenueCatIosApiKey = readEnv('REVENUECAT_IOS_API_KEY', 'appl_REVENUECAT_IOS_API_KEY');
const revenueCatAndroidApiKey = readEnv('REVENUECAT_ANDROID_API_KEY', 'goog_REVENUECAT_ANDROID_API_KEY');

module.exports = {
  expo: {
    name: 'ポケット先輩（歯科衛生士）',
    slug: 'pocket-senpai-dh',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    scheme: 'pocket-senpai',
    ios: {
      supportsTablet: false,
      bundleIdentifier: 'com.gsw.pocketsenpai.shikaeiseishi',
      buildNumber: '1',
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,
        NSUserTrackingUsageDescription: '広告の最適化のために使用します',
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#F0FDF9',
      },
      package: 'com.pocketsenpai.dh',
    },
    web: {
      favicon: './assets/favicon.png',
      output: 'static',
    },
    plugins: [
      'expo-router',
      'expo-font',
      './plugins/with-qwen-model-resource',
      [
        'expo-build-properties',
        {
          ios: {
            deploymentTarget: '16.4',
            useFrameworks: 'static',
          },
        },
      ],
      [
        'llama.rn',
        {
          enableEntitlements: false,
          forceCxx20: true,
          enableOpenCLAndHexagon: false,
        },
      ],
      [
        'react-native-google-mobile-ads',
        {
          iosAppId: admobIosAppId,
          androidAppId: admobAndroidAppId,
        },
      ],
      [
        'expo-splash-screen',
        {
          image: './assets/splash-icon.png',
          resizeMode: 'contain',
          backgroundColor: '#F0FDF9',
        },
      ],
    ],
    extra: {
      eas: {
        projectId: 'e599585a-ba45-4972-a502-a4bec2cee1e4',
      },
      admobBannerUnitId,
      admobInterstitialUnitId,
      admobRewardedUnitId,
      revenueCatIosApiKey,
      revenueCatAndroidApiKey,
      revenueCatEntitlementId: 'premium',
      revenueCatOfferingId: 'default',
      firebaseApiKey: readEnv('FIREBASE_API_KEY', 'YOUR_FIREBASE_API_KEY'),
      firebaseAuthDomain: readEnv('FIREBASE_AUTH_DOMAIN', 'YOUR_PROJECT.firebaseapp.com'),
      firebaseProjectId: readEnv('FIREBASE_PROJECT_ID', 'YOUR_PROJECT_ID'),
      firebaseStorageBucket: readEnv('FIREBASE_STORAGE_BUCKET', 'YOUR_PROJECT.appspot.com'),
      firebaseMessagingSenderId: readEnv('FIREBASE_MESSAGING_SENDER_ID', 'YOUR_SENDER_ID'),
      firebaseAppId: readEnv('FIREBASE_APP_ID', 'YOUR_APP_ID'),
    },
  },
};


