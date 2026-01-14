import { NFTCard } from './NFTCard';
import type { NFTItem, Classification, ClassificationStatus } from '../types';

interface NFTGridProps {
  nfts: NFTItem[];
  classifications: Record<string, Classification>;
  activeFilter: ClassificationStatus | 'all' | 'hidden';
  selectionMode: boolean;
  selectedIds: Set<string>;
  onHide: (objectId: string) => void;
  onUnhide: (objectId: string) => void;
  onBurn: (objectId: string) => void;
  onSelect: (objectId: string) => void;
}

export function NFTGrid({
  nfts,
  classifications,
  activeFilter,
  selectionMode,
  selectedIds,
  onHide,
  onUnhide,
  onBurn,
  onSelect,
}: NFTGridProps) {
  // Filter NFTs based on active filter
  const filteredNFTs = nfts.filter(nft => {
    if (activeFilter === 'all') {
      return !nft.isHidden;
    }
    if (activeFilter === 'hidden') {
      return nft.isHidden;
    }
    // Filter by classification status
    const classification = classifications[nft.objectId];
    if (!classification) return false;
    return classification.status === activeFilter && !nft.isHidden;
  });

  if (filteredNFTs.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '60px 20px',
        color: '#64748b',
      }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>
          {activeFilter === 'hidden' ? '👁️' : '📭'}
        </div>
        <p style={{ fontSize: '18px', marginBottom: '8px' }}>
          {activeFilter === 'hidden' 
            ? 'No hidden NFTs' 
            : `No ${activeFilter === 'all' ? '' : activeFilter + ' '}NFTs found`
          }
        </p>
        <p style={{ fontSize: '14px', color: '#475569' }}>
          {activeFilter === 'hidden'
            ? 'Items you hide will appear here'
            : 'Try a different filter or connect a wallet with NFTs'
          }
        </p>
      </div>
    );
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
      gap: '20px',
      maxWidth: '1200px',
    }}>
      {filteredNFTs.map(nft => (
        <NFTCard
          key={nft.objectId}
          nft={nft}
          classification={classifications[nft.objectId]}
          selectionMode={selectionMode}
          isSelected={selectedIds.has(nft.objectId)}
          onHide={() => onHide(nft.objectId)}
          onUnhide={() => onUnhide(nft.objectId)}
          onBurn={() => onBurn(nft.objectId)}
          onSelect={() => onSelect(nft.objectId)}
        />
      ))}
    </div>
  );
}
