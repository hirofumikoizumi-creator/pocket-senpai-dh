import { Platform } from 'react-native';
import { getTrackingPermissionsAsync, requestTrackingPermissionsAsync } from 'expo-tracking-transparency';

export async function requestTrackingTransparencyIfNeeded() {
  if (Platform.OS !== 'ios') return;

  try {
    const current = await getTrackingPermissionsAsync();
    if (current.status === 'undetermined') {
      await requestTrackingPermissionsAsync();
    }
  } catch (error) {
    console.warn('Failed to request tracking transparency permission:', error);
  }
}
