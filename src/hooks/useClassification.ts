import { useState, useCallback } from 'react';
import { NFTItem, Classification } from '../types';
import { classifyNFT } from '../lib/classifier';

export function useClassification() {
  const [classifications, setClassifications] = useState<Record<string, Classification>>({});
  const [isClassifying, setIsClassifying] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });

  const classifyAll = useCallback(async (nfts: NFTItem[]) => {
    setIsClassifying(true);
    setProgress({ current: 0, total: nfts.length });

    const results: Record<string, Classification> = {};

    for (let i = 0; i < nfts.length; i++) {
      const nft = nfts[i];
      
      try {
        const classification = await classifyNFT({
          packageId: nft.packageId,
          name: nft.name,
          description: nft.description,
          imageUrl: nft.imageUrl,
        });
        results[nft.objectId] = classification;
      } catch (error) {
        console.error(`Failed to classify ${nft.objectId}:`, error);
        results[nft.objectId] = {
          status: 'dubious',
          confidence: 0,
          reason: 'Classification failed',
        };
      }

      setProgress({ current: i + 1, total: nfts.length });
    }

    setClassifications(results);
    setIsClassifying(false);

    return results;
  }, []);

  const classifySingle = useCallback(async (nft: NFTItem): Promise<Classification> => {
    const classification = await classifyNFT({
      packageId: nft.packageId,
      name: nft.name,
      description: nft.description,
      imageUrl: nft.imageUrl,
    });

    setClassifications(prev => ({
      ...prev,
      [nft.objectId]: classification,
    }));

    return classification;
  }, []);

  return {
    classifications,
    isClassifying,
    progress,
    classifyAll,
    classifySingle,
  };
}
