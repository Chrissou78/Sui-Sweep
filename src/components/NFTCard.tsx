import { ActionButtons } from './ActionButtons';
import { getStatusColor, getStatusLabel } from '../lib/classifier';
import type { NFTItem, Classification } from '../types';

interface NFTCardProps {
  nft: NFTItem;
  classification?: Classification;
  selectionMode: boolean;
  isSelected: boolean;
  onHide: () => void;
  onUnhide: () => void;
  onBurn: () => void;
  onSelect: () => void;
}

export function NFTCard({
  nft,
  classification,
  selectionMode,
  isSelected,
  onHide,
  onUnhide,
  onBurn,
  onSelect,
}: NFTCardProps) {
  const statusColor = classification ? getStatusColor(classification.status) : '#64748b';
  const statusLabel = classification ? getStatusLabel(classification.status) : 'Analyzing...';

  const handleCardClick = () => {
    if (selectionMode) {
      onSelect();
    }
  };

  return (
    <div
      onClick={handleCardClick}
      style={{
        background: 'rgba(0, 0, 0, 0.3)',
        border: `2px solid ${isSelected ? '#00d4d4' : 'rgba(255, 255, 255, 0.05)'}`,
        borderRadius: '16px',
        overflow: 'hidden',
        cursor: selectionMode ? 'pointer' : 'default',
        transition: 'all 0.2s ease',
        transform: isSelected ? 'scale(0.98)' : 'scale(1)',
        position: 'relative',
      }}
    >
      {/* Selection Checkbox */}
      {selectionMode && (
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          zIndex: 10,
          width: '24px',
          height: '24px',
          borderRadius: '6px',
          border: `2px solid ${isSelected ? '#00d4d4' : 'rgba(255, 255, 255, 0.3)'}`,
          background: isSelected ? '#00d4d4' : 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {isSelected && (
            <span style={{ color: '#0a0f1a', fontWeight: 'bold', fontSize: '14px' }}>✓</span>
          )}
        </div>
      )}

      {/* Hidden Badge */}
      {nft.isHidden && (
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          zIndex: 10,
          background: 'rgba(0, 0, 0, 0.7)',
          padding: '4px 10px',
          borderRadius: '6px',
          fontSize: '11px',
          color: '#94a3b8',
          fontWeight: '500',
        }}>
          HIDDEN
        </div>
      )}

      {/* Status Badge */}
      {classification && !nft.isHidden && (
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          zIndex: 10,
          background: `${statusColor}20`,
          border: `1px solid ${statusColor}40`,
          padding: '4px 10px',
          borderRadius: '6px',
          fontSize: '11px',
          color: statusColor,
          fontWeight: '600',
          textTransform: 'uppercase',
        }}>
          {statusLabel}
        </div>
      )}

      {/* Image */}
      <div style={{
        width: '100%',
        aspectRatio: '1',
        background: 'rgba(0, 0, 0, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
        {nft.imageUrl ? (
          <img
            src={nft.imageUrl}
            alt={nft.name || 'NFT'}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: nft.isHidden ? 0.4 : 1,
            }}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        ) : (
          <span style={{ fontSize: '40px', opacity: 0.3 }}>🖼️</span>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '16px' }}>
        <h3 style={{
          fontSize: '14px',
          fontWeight: '600',
          color: '#ffffff',
          marginBottom: '6px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {nft.name || 'Unnamed NFT'}
        </h3>
        
        <p style={{
          fontSize: '11px',
          color: '#64748b',
          marginBottom: '12px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {nft.packageId ? `${nft.packageId.slice(0, 8)}...${nft.packageId.slice(-6)}` : 'Unknown Package'}
        </p>

        {/* Confidence Bar */}
        {classification && (
          <div style={{ marginBottom: '12px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '10px',
              color: '#64748b',
              marginBottom: '4px',
            }}>
              <span>Confidence</span>
              <span>{Math.round(classification.confidence * 100)}%</span>
            </div>
            <div style={{
              height: '4px',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '2px',
              overflow: 'hidden',
            }}>
              <div style={{
                height: '100%',
                width: `${classification.confidence * 100}%`,
                background: statusColor,
                borderRadius: '2px',
              }} />
            </div>
          </div>
        )}

        {/* Actions */}
        {!selectionMode && (
          <ActionButtons
            objectId={nft.objectId}
            isHidden={nft.isHidden}
            isScam={classification?.status === 'scam'}
            onHide={onHide}
            onUnhide={onUnhide}
            onBurn={onBurn}
          />
        )}
      </div>
    </div>
  );
}
