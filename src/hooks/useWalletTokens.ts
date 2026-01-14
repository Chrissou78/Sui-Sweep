import { useCurrentAccount, useSuiClientQuery } from '@mysten/dapp-kit';
import type { TokenItem } from '../types';
import { isTokenHidden } from '../lib/storage';

export function useWalletTokens() {
  const account = useCurrentAccount();

  const { data, isPending, error, refetch } = useSuiClientQuery(
    'getAllBalances',
    {
      owner: account?.address || '',
    },
    {
      enabled: !!account?.address,
    }
  );

  // Log for debugging
  if (error) {
    console.error('[useWalletTokens] Error:', error);
  }

  const tokens: TokenItem[] = (data || []).map((balance) => {
    const coinType = balance.coinType;
    const packageId = coinType.split('::')[0] || '';
    
    // Extract symbol from coin type (last part after ::)
    const parts = coinType.split('::');
    const symbol = parts[parts.length - 1] || 'UNKNOWN';
    
    // Format balance based on decimals (default 9 for SUI)
    const decimals = 9;
    const rawBalance = BigInt(balance.totalBalance);
    const formattedBalance = (Number(rawBalance) / Math.pow(10, decimals)).toFixed(4);

    return {
      objectId: coinType,
      coinType,
      packageId,
      symbol,
      name: symbol,
      balance: balance.totalBalance,
      decimals,
      formattedBalance,
      iconUrl: undefined,
      classification: null,
      isHidden: isTokenHidden(coinType),
      isSelected: false,
    };
  });

  // Filter out zero balances
  const nonZeroTokens = tokens.filter(t => BigInt(t.balance) > 0n);

  console.log('[useWalletTokens] Loaded:', nonZeroTokens.length, 'tokens');

  return {
    tokens: nonZeroTokens,
    isPending,
    error,
    refetch,
    address: account?.address,
  };
}
