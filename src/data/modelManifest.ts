export const modelManifest = {
  id: 'qwen3-on-device',
  displayName: 'Qwen3 On-device Formatter',
  filename: 'qwen3_0_6b_q8_0.db',
  minBytes: 524288000,
  runtime: 'llama.rn',
  mode: 'bundled-gguf-required',
  cloudApiEnabled: false,
  purpose:
    '監修済みデータを相談画面向けの形式に整えるためのオンデバイス補助。医療事実の生成には使わない。',
} as const;

