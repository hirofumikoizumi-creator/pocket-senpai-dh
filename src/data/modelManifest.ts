export const modelManifest = {
  id: 'qwen3-on-device',
  displayName: 'Qwen3 On-device Formatter',
  mode: 'bundled-runtime-required',
  cloudApiEnabled: false,
  purpose:
    '監修済みデータを相談画面向けの形式に整えるためのオンデバイス補助。医療事実の生成には使わない。',
} as const;
