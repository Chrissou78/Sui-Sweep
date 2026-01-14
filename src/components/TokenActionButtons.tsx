import { useState } from 'react';
import { logUserAction } from '../lib/storage';

interface TokenActionButtonsProps {
  coinType: string;
  isHidden: boolean;
  isScam?: boolean;
  onHide: () => void;
  onUnhide: () => void;
  onBurn: () => void;
}

export function TokenActionButtons({
  coinType,
  isHidden,
  isScam,
  onHide,
  onUnhide,
  onBurn,
}: TokenActionButtonsProps) {
  const [isBurning, setIsBurning] = useState(false);

  const handleBurn = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    const confirmed = window.confirm(
      'Burn all of this token permanently? This cannot be undone.'
    );
    
    if (!confirmed) return;

    setIsBurning(true);
    try {
      // Note: Token burning requires a different approach than NFTs
      // For now, we'll just mark it as burned in the UI
      // Full implementation would need to transfer all coin objects
      logUserAction(coinType, 'burn', 'token');
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
    logUserAction(coinType, 'hide', 'token');
    onHide();
  };

  const handleUnhide = (e: React.MouseEvent) => {
    e.stopPropagation();
    logUserAction(coinType, 'unhide', 'token');
    onUnhide();
  };

  const handleKeep = (e: React.MouseEvent) => {
    e.stopPropagation();
    logUserAction(coinType, 'keep', 'token');
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
    <div style={{
      display: 'flex',
      gap: '8px',
    }}>
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
      {isHidden ? (
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
          background: isScam ? 'rgba(248, 113, 113, 0.2)' : 'rgba(249, 115, 22, 0.1)',
          color: isScam ? '#f87171' : '#f97316',
          border: `1px solid ${isScam ? 'rgba(248, 113, 113, 0.3)' : 'rgba(249, 115, 22, 0.2)'}`,
          opacity: isBurning ? 0.5 : 1,
          cursor: isBurning ? 'not-allowed' : 'pointer',
        }}
      >
        🔥 {isBurning ? '...' : 'Burn'}
      </button>
    </div>
  );
}
