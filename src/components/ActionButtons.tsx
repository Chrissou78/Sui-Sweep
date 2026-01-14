import { useState } from 'react';
import { useSignAndExecuteTransaction } from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';
import { logUserAction } from '../lib/storage';

const BURN_ADDRESS = '0x0000000000000000000000000000000000000000000000000000000000000000';

interface ActionButtonsProps {
  objectId: string;
  isHidden: boolean;
  isScam?: boolean;
  onHide: () => void;
  onUnhide: () => void;
  onBurn: () => void;
}

export function ActionButtons({
  objectId,
  isHidden,
  isScam,
  onHide,
  onUnhide,
  onBurn,
}: ActionButtonsProps) {
  const [isBurning, setIsBurning] = useState(false);
  const { mutateAsync: signAndExecute } = useSignAndExecuteTransaction();

  const handleBurn = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    const confirmed = window.confirm(
      'Are you sure you want to burn this NFT? This action cannot be undone.'
    );
    
    if (!confirmed) return;

    setIsBurning(true);
    try {
      const tx = new Transaction();
      tx.transferObjects([tx.object(objectId)], BURN_ADDRESS);
      
      await signAndExecute({
        transaction: tx,
      });
      
      logUserAction(objectId, 'burn');
      onBurn();
    } catch (error) {
      console.error('Burn failed:', error);
      alert('Failed to burn NFT. Please try again.');
    } finally {
      setIsBurning(false);
    }
  };

  const handleHide = (e: React.MouseEvent) => {
    e.stopPropagation();
    logUserAction(objectId, 'hide');
    onHide();
  };

  const handleUnhide = (e: React.MouseEvent) => {
    e.stopPropagation();
    logUserAction(objectId, 'unhide');
    onUnhide();
  };

  const handleKeep = (e: React.MouseEvent) => {
    e.stopPropagation();
    logUserAction(objectId, 'keep');
  };

  const buttonStyle: React.CSSProperties = {
    flex: 1,
    padding: '8px 4px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '11px',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
  };

  return (
    <div style={{
      display: 'flex',
      gap: '8px',
    }}>
      {/* Keep Button */}
      <button
        onClick={handleKeep}
        style={{
          ...buttonStyle,
          background: 'rgba(52, 211, 153, 0.1)',
          color: '#34d399',
          border: '1px solid rgba(52, 211, 153, 0.2)',
        }}
      >
        ✓ Keep
      </button>

      {/* Hide/Unhide Button */}
      {isHidden ? (
        <button
          onClick={handleUnhide}
          style={{
            ...buttonStyle,
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
            ...buttonStyle,
            background: 'rgba(148, 163, 184, 0.1)',
            color: '#94a3b8',
            border: '1px solid rgba(148, 163, 184, 0.2)',
          }}
        >
          Hide
        </button>
      )}

      {/* Burn Button */}
      <button
        onClick={handleBurn}
        disabled={isBurning}
        style={{
          ...buttonStyle,
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
