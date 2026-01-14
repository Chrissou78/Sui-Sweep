import { useCurrentAccount, useSuiClientQuery } from '@mysten/dapp-kit';
import type { NFTItem } from '../types';
import { isNFTHidden } from '../lib/storage';

export function useWalletNFTs() {
  const account = useCurrentAccount();

  const { data, isPending, error, refetch } = useSuiClientQuery(
    'getOwnedObjects',
    {
      owner: account?.address || '',
      options: {
        showContent: true,
        showDisplay: true,
        showType: true,
      },
    },
    {
      enabled: !!account?.address,
    }
  );

  // Log for debugging
  if (error) {
    console.error('[useWalletNFTs] Error:', error);
  }

  // Filter out coins and map to NFTItem
  const nfts: NFTItem[] = (data?.data || [])
    .filter((obj) => {
      const type = obj.data?.type || '';
      // Exclude coin types
      return !type.includes('::coin::') && !type.includes('0x2::coin::');
    })
    .map((obj) => {
      const content = obj.data?.content;
      const display = obj.data?.display?.data;
      const type = obj.data?.type || '';
      
      // Extract package ID from type
      const packageId = type.split('::')[0] || '';

      // Get name and description from display or content
      let name = display?.name || '';
      let description = display?.description || '';
      let imageUrl = display?.image_url || '';

      // Try to get from content if display is empty
      if (content && 'fields' in content) {
        const fields = content.fields as Record<string, unknown>;
        if (!name && fields.name) name = String(fields.name);
        if (!description && fields.description) description = String(fields.description);
        if (!imageUrl && fields.image_url) imageUrl = String(fields.image_url);
        if (!imageUrl && fields.url) imageUrl = String(fields.url);
      }

      return {
        objectId: obj.data?.objectId || '',
        type,
        packageId,
        name,
        description,
        imageUrl,
        classification: null,
        isHidden: isNFTHidden(obj.data?.objectId || ''),
        isSelected: false,
      };
    });

  console.log('[useWalletNFTs] Loaded:', nfts.length, 'NFTs');

  return {
    nfts,
    isPending,
    error,
    refetch,
    address: account?.address,
  };
}
