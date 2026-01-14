import { useState } from 'react';
import { getTokenStatusColor, getTokenStatusLabel } from '../lib/tokenClassifier';
import { logUserAction } from '../lib/storage';
import type { TokenItem, Classification } from '../types';

interface TokenCardProps {
  token: TokenItem;
  classification?: Classification;
  selectionMode: boolean;
  isSelected: boolean;
  onHide: () => void;
  onUnhide: () => void;
  onBurn: () => void;
  onSelect: () => void;
}

export function TokenCard({
  token,
  classification,
  selectionMode,
  isSelected,
  onHide,
  onUnhide,
  onBurn,
  onSelect,
}: TokenCardProps) {
  const [isBurning, setIsBurning] = useState(false);
  const statusColor = classification ? getTokenStatusColor(classification.status) : '#64748b';
  const statusLabel = classification ? getTokenStatusLabel(classification.status) : '...';

  const handleCardClick = () => {
    if (selectionMode) {
      onSelect();
    }
  };

  const handleBurn = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    const confirmed = window.confirm(
      'Burn all of this token permanently? This cannot be undone.'
    );
    
    if (!confirmed) return;

    setIsBurning(true);
    try {
      logUserAction(token.coinType, 'burn', 'token');
      onBurn();
    } catch (error) {
      console.error('Burn failed:', error);
      alert('Failed to burn token');
    } finally {
      setIsBurning(false);
    }
  };

  const handleHide = (e: React.MouseEvent) => {
    e.stopPropagation();
    logUserAction(token.coinType, 'hide', 'token');
    onHide();
  };

  const handleUnhide = (e: React.MouseEvent) => {
    e.stopPropagation();
    logUserAction(token.coinType, 'unhide', 'token');
    onUnhide();
  };

  const handleKeep = (e: React.MouseEvent) => {
    e.stopPropagation();
    logUserAction(token.coinType, 'keep', 'token');
  };

  const buttonBase: React.CSSProperties = {
    flex: 1,
    padding: '10px 8px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    minHeight: '40px',
  };

  return (
    <div
      onClick={handleCardClick}
      style={{
        background: 'rgba(0, 0, 0, 0.3)',
        border: `2px solid ${isSelected ? '#00d4d4' : 'rgba(255, 255, 255, 0.05)'}`,
        borderRadius: '14px',
        overflow: 'hidden',
        cursor: selectionMode ? 'pointer' : 'default',
        transition: 'all 0.2s ease',
        transform: isSelected ? 'scale(0.98)' : 'scale(1)',
        position: 'relative',
        padding: '16px',
      }}
    >
      {/* Selection Checkbox */}
      {selectionMode && (
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          zIndex: 10,
          width: '28px',
          height: '28px',
          borderRadius: '8px',
          border: `2px solid ${isSelected ? '#00d4d4' : 'rgba(255, 255, 255, 0.3)'}`,
          background: isSelected ? '#00d4d4' : 'rgba(0, 0, 0, 0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {isSelected && (
            <span style={{ color: '#0a0f1a', fontWeight: 'bold', fontSize: '16px' }}>✓</span>
          )}
        </div>
      )}

      {/* Status Badge */}
      {classification && !token.isHidden && (
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          zIndex: 10,
          background: `${statusColor}30`,
          border: `1px solid ${statusColor}50`,
          padding: '4px 8px',
          borderRadius: '6px',
          fontSize: '10px',
          color: statusColor,
          fontWeight: '600',
          textTransform: 'uppercase',
        }}>
          {statusLabel}
        </div>
      )}

      {/* Hidden Badge */}
      {token.isHidden && (
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          zIndex: 10,
          background: 'rgba(0, 0, 0, 0.7)',
          padding: '4px 8px',
          borderRadius: '6px',
          fontSize: '10px',
          color: '#94a3b8',
          fontWeight: '500',
        }}>
          HIDDEN
        </div>
      )}

      {/* Token Icon & Symbol */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '12px',
        marginTop: selectionMode ? '24px' : '0',
      }}>
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #1a2332, #0d1526)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '20px',
          fontWeight: '700',
          color: '#00d4d4',
          border: '2px solid rgba(0, 212, 212, 0.2)',
          opacity: token.isHidden ? 0.4 : 1,
        }}>
          {token.iconUrl ? (
            <img 
              src={token.iconUrl} 
              alt={token.symbol}
              style={{ width: '32px', height: '32px', borderRadius: '50%' }}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          ) : (
            token.symbol?.slice(0, 2) || '?'
          )}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: '600',
            color: token.isHidden ? '#64748b' : '#ffffff',
            marginBottom: '2px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
            {token.symbol}
          </h3>
          <p style={{
            fontSize: '11px',
            color: '#64748b',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
            {token.packageId.slice(0, 8)}...{token.packageId.slice(-6)}
          </p>
        </div>
      </div>

      {/* Balance */}
      <div style={{
        background: 'rgba(0, 0, 0, 0.2)',
        borderRadius: '10px',
        padding: '12px',
        marginBottom: '12px',
      }}>
        <p style={{
          fontSize: '11px',
          color: '#64748b',
          marginBottom: '4px',
          textTransform: 'uppercase',
        }}>
          Balance
        </p>
        <p style={{
          fontSize: '18px',
          fontWeight: '700',
          color: token.isHidden ? '#64748b' : '#ffffff',
          fontFamily: 'monospace',
        }}>
          {parseFloat(token.formattedBalance).toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 4,
          })}
        </p>
      </div>

      {/* Classification Reason */}
      {classification && (
        <p style={{
          fontSize: '11px',
          color: statusColor,
          marginBottom: '12px',
          opacity: 0.8,
        }}>
          {classification.reason}
        </p>
      )}

      {/* Actions */}
      {!selectionMode && (
        <div style={{ display: 'flex', gap: '8px' }}>
          {/* Keep */}
          <button
            onClick={handleKeep}
            style={{
              ...buttonBase,
              background: 'rgba(52, 211, 153, 0.1)',
              color: '#34d399',
              border: '1px solid rgba(52, 211, 153, 0.2)',
            }}
          >
            ✓ Keep
          </button>

          {/* Hide/Unhide */}
          {token.isHidden ? (
            <button
              onClick={handleUnhide}
              style={{
                ...buttonBase,
                background: 'rgba(96, 165, 250, 0.1)',
                color: '#60a5fa',
                border: '1px solid rgba(96, 165, 250, 0.2)',
              }}
            >
              👁️ Show
            </button>
          ) : (
            <button
              onClick={handleHide}
              style={{
                ...buttonBase,
                background: 'rgba(148, 163, 184, 0.1)',
                color: '#94a3b8',
                border: '1px solid rgba(148, 163, 184, 0.2)',
              }}
            >
              Hide
            </button>
          )}

          {/* Burn */}
          <button
            onClick={handleBurn}
            disabled={isBurning}
            style={{
              ...buttonBase,
              background: classification?.status === 'scam' ? 'rgba(248, 113, 113, 0.2)' : 'rgba(249, 115, 22, 0.1)',
              color: classification?.status === 'scam' ? '#f87171' : '#f97316',
              border: `1px solid ${classification?.status === 'scam' ? 'rgba(248, 113, 113, 0.3)' : 'rgba(249, 115, 22, 0.2)'}`,
              opacity: isBurning ? 0.5 : 1,
              cursor: isBurning ? 'not-allowed' : 'pointer',
            }}
          >
            🔥 {isBurning ? '...' : 'Burn'}
          </button>
        </div>
      )}
    </div>
  );
}
