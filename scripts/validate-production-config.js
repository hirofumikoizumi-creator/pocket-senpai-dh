const REQUIRED_ENV_VARS = [
  'ADMOB_IOS_APP_ID',
  'ADMOB_ANDROID_APP_ID',
  'FIREBASE_API_KEY',
  'FIREBASE_AUTH_DOMAIN',
  'FIREBASE_PROJECT_ID',
  'FIREBASE_STORAGE_BUCKET',
  'FIREBASE_MESSAGING_SENDER_ID',
  'FIREBASE_APP_ID',
  'REVENUECAT_IOS_API_KEY',
  'REVENUECAT_ANDROID_API_KEY',
];

const PLACEHOLDER_PATTERNS = [
  /^YOUR_/,
  /YOUR_PROJECT/,
  /XXXXXXXXXXXXXXXX/,
  /YYYYYYYYYY/,
  /REVENUECAT_/,
  /^appl_REVENUECAT/,
  /^goog_REVENUECAT/,
];

const missing = [];
const placeholders = [];

for (const name of REQUIRED_ENV_VARS) {
  const value = process.env[name];
  if (!value || !value.trim()) {
    missing.push(name);
    continue;
  }
  if (PLACEHOLDER_PATTERNS.some((pattern) => pattern.test(value))) {
    placeholders.push(name);
  }
}

if (missing.length || placeholders.length) {
  console.error('Production configuration is incomplete.');
  if (missing.length) {
    console.error(`Missing environment variables: ${missing.join(', ')}`);
  }
  if (placeholders.length) {
    console.error(`Placeholder values detected: ${placeholders.join(', ')}`);
  }
  process.exit(1);
}

console.log('Production configuration looks complete.');
