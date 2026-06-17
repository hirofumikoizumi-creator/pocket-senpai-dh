import { ConsultationResponse } from '../types';

export type OnDeviceQwenStatus = 'ready' | 'unavailable';

export type QwenFormatInput = {
  query: string;
  source: ConsultationResponse;
};

export async function getOnDeviceQwenStatus(): Promise<OnDeviceQwenStatus> {
  return 'unavailable';
}

export async function formatWithOnDeviceQwen(
  _input: QwenFormatInput
): Promise<ConsultationResponse | null> {
  // Qwen3 is only an on-device formatter for approved data.
  // Until a native bundled model runtime is available, this app always falls
  // back to deterministic templates and never calls a cloud LLM.
  return null;
}
