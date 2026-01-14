import { useCurrentAccount, useSuiClientQuery } from '@mysten/dapp-kit';
import { useMemo } from 'react';
import { NFTItem } from '../types';
import { isNFTHidden } from '../lib/storage';

export function useWalletNFTs() {
  const account = useCurrentAccount();

  const { data, isPending, error, refetch } = useSuiClientQuery(
    'getOwnedObjects',
    {
      owner: account?.address || '',
      filter: {
        MatchNone: [{ StructType: '0x2::coin::Coin' }],
      },
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

  const nfts: NFTItem[] = useMemo(() => {
    if (!data?.data) return [];

    return data.data
      .filter(obj => obj.data)
      .map(obj => {
        const objectId = obj.data!.objectId;
        const type = obj.data!.type || 'Unknown';
        const packageId = type.split('::')[0];
        
        const display = obj.data!.display?.data;
        const content = obj.data!.content;
        
        let name = 'Unnamed NFT';
        let description = '';
        let imageUrl = '';

        if (display) {
          name = display.name || name;
          description = display.description || '';
          imageUrl = display.image_url || '';
        }

        if (content && 'fields' in content) {
          const fields = content.fields as Record<string, unknown>;
          name = (fields.name as string) || name;
          description = (fields.description as string) || description;
          imageUrl = (fields.url as string) || (fields.image_url as string) || imageUrl;
        }

        return {
          objectId,
          type,
          packageId,
          name,
          description,
          imageUrl,
          classification: null,
          isHidden: isNFTHidden(objectId),
          isSelected: false,
        };
      });
  }, [data]);

  return {
    nfts,
    isPending,
    error,
    refetch,
    address: account?.address,
  };
}
