import { useState } from 'react';
import { useSignAndExecuteTransaction } from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';
import type { NFTItem } from '../types';

const BURN_ADDRESS = '0x0000000000000000000000000000000000000000000000000000000000000000';

interface SelectionToolbarProps {
  selectedIds: Set<string>;
  onClear: () => void;
  onBurnComplete: (burnedIds: string[]) => void;
  nfts: NFTItem[];
}

export function SelectionToolbar({
  selectedIds,
  onClear,
  onBurnComplete,
  nfts,
}: SelectionToolbarProps) {
  const [isBurning, setIsBurning] = useState(false);
  const [burnProgress, setBurnProgress] = useState({ current: 0, total: 0 });
  const { mutateAsync: signAndExecute } = useSignAndExecuteTransaction();

  const selectedCount = selectedIds.size;
  const selectedArray = Array.from(selectedIds);

  const handleBulkBurn = async () => {
    if (selectedCount === 0) return;
    
    const confirmed = window.confirm(
      `Are you sure you want to burn ${selectedCount} NFT${selectedCount > 1 ? 's' : ''}? This action cannot be undone.`
    );
    
    if (!confirmed) return;

    setIsBurning(true);
    setBurnProgress({ current: 0, total: selectedCount });
    
    const burnedIds: string[] = [];

    for (let i = 0; i < selectedArray.length; i++) {
      const objectId = selectedArray[i];
      try {
        const tx = new Transaction();
        tx.transferObjects([tx.object(objectId)], BURN_ADDRESS);
        
        await signAndExecute({
          transaction: tx,
        });
        
        burnedIds.push(objectId);
        setBurnProgress({ current: i + 1, total: selectedCount });
      } catch (error) {
        console.error(`Failed to burn ${objectId}:`, error);
      }
    }

    setIsBurning(false);
    
    if (burnedIds.length > 0) {
      onBurnComplete(burnedIds);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '0',
      left: '0',
      right: '0',
      background: 'linear-gradient(180deg, rgba(13, 21, 38, 0.95) 0%, rgba(10, 15, 26, 0.98) 100%)',
      borderTop: '1px solid rgba(0, 212, 212, 0.3)',
      padding: '16px 40px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backdropFilter: 'blur(10px)',
      zIndex: 1000,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span style={{ 
          color: '#00d4d4', 
          fontWeight: '600',
          fontSize: '16px',
        }}>
          {selectedCount} NFT{selectedCount !== 1 ? 's' : ''} selected
        </span>
        <button
          onClick={onClear}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: '1px solid rgba(148, 163, 184, 0.3)',
            background: 'transparent',
            color: '#94a3b8',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          Clear Selection
        </button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {isBurning && (
          <span style={{ color: '#f97316', fontSize: '14px' }}>
            Burning {burnProgress.current}/{burnProgress.total}...
          </span>
        )}
        <button
          onClick={handleBulkBurn}
          disabled={isBurning || selectedCount === 0}
          style={{
            padding: '12px 28px',
            borderRadius: '10px',
            border: 'none',
            background: isBurning 
              ? 'rgba(249, 115, 22, 0.3)' 
              : 'linear-gradient(135deg, #f97316, #dc2626)',
            color: '#ffffff',
            cursor: isBurning ? 'not-allowed' : 'pointer',
            fontSize: '15px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: isBurning ? 'none' : '0 4px 15px rgba(249, 115, 22, 0.3)',
            transition: 'all 0.2s ease',
          }}
        >
          🔥 {isBurning ? 'Burning...' : `Burn ${selectedCount} NFT${selectedCount !== 1 ? 's' : ''}`}
        </button>
      </div>
    </div>
  );
}
