import { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SUBSCRIPTION_KEY = '@pocket_senpai_subscription';

type SubscriptionState = {
  isPremium: boolean;
  source: 'free' | 'store' | 'development';
};

const DEFAULT_STATE: SubscriptionState = {
  isPremium: false,
  source: 'free',
};

export function useSubscription() {
  const [state, setState] = useState<SubscriptionState>(DEFAULT_STATE);
  const [isLoading, setIsLoading] = useState(true);

  const refreshSubscription = useCallback(async () => {
    try {
      const saved = await AsyncStorage.getItem(SUBSCRIPTION_KEY);
      setState(saved ? JSON.parse(saved) : DEFAULT_STATE);
    } catch (error) {
      console.error('Failed to load subscription:', error);
      setState(DEFAULT_STATE);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshSubscription();
  }, [refreshSubscription]);

  const setDevelopmentPremium = useCallback(async (enabled: boolean) => {
    const nextState: SubscriptionState = enabled
      ? { isPremium: true, source: 'development' }
      : DEFAULT_STATE;
    setState(nextState);
    await AsyncStorage.setItem(SUBSCRIPTION_KEY, JSON.stringify(nextState));
  }, []);

  return {
    isPremium: state.isPremium,
    subscriptionSource: state.source,
    isLoading,
    refreshSubscription,
    setDevelopmentPremium,
  };
}
