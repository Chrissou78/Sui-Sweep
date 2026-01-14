import { TokenCard } from './TokenCard';
import type { TokenItem, Classification, ClassificationStatus } from '../types';

interface TokenGridProps {
  tokens: TokenItem[];
  classifications: Record<string, Classification>;
  activeFilter: ClassificationStatus | 'all' | 'hidden';
  selectionMode: boolean;
  selectedIds: Set<string>;
  onHide: (coinType: string) => void;
  onUnhide: (coinType: string) => void;
  onBurn: (coinType: string) => void;
  onSelect: (coinType: string) => void;
}

export function TokenGrid({
  tokens,
  classifications,
  activeFilter,
  selectionMode,
  selectedIds,
  onHide,
  onUnhide,
  onBurn,
  onSelect,
}: TokenGridProps) {
  // Filter tokens based on active filter
  const filteredTokens = tokens.filter(token => {
    if (activeFilter === 'all') {
      return !token.isHidden;
    }
    if (activeFilter === 'hidden') {
      return token.isHidden;
    }
    const classification = classifications[token.coinType];
    if (!classification) return false;
    return classification.status === activeFilter && !token.isHidden;
  });

  if (filteredTokens.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '40px 20px',
        color: '#64748b',
      }}>
        <div style={{ fontSize: '40px', marginBottom: '12px' }}>
          {activeFilter === 'hidden' ? '👁️' : '🪙'}
        </div>
        <p style={{ fontSize: '16px', marginBottom: '6px', color: '#94a3b8' }}>
          {activeFilter === 'hidden' 
            ? 'No hidden tokens' 
            : `No ${activeFilter === 'all' ? '' : activeFilter + ' '}tokens found`
          }
        </p>
        <p style={{ fontSize: '13px' }}>
          {activeFilter === 'hidden'
            ? 'Tokens you hide will appear here'
            : 'Try a different filter'
          }
        </p>
      </div>
    );
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
      gap: '12px',
    }}>
      {filteredTokens.map(token => (
        <TokenCard
          key={token.coinType}
          token={token}
          classification={classifications[token.coinType]}
          selectionMode={selectionMode}
          isSelected={selectedIds.has(token.coinType)}
          onHide={() => onHide(token.coinType)}
          onUnhide={() => onUnhide(token.coinType)}
          onBurn={() => onBurn(token.coinType)}
          onSelect={() => onSelect(token.coinType)}
        />
      ))}
    </div>
  );
}
