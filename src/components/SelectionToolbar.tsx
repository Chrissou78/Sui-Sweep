import { useState } from 'react';
import { useSignAndExecuteTransaction } from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';

const BURN_ADDRESS = '0x0000000000000000000000000000000000000000000000000000000000000000';

interface SelectionToolbarProps {
  selectedIds: Set<string>;
  onClear: () => void;
  onBurnComplete: (burnedIds: string[]) => void;
}

export function SelectionToolbar({
  selectedIds,
  onClear,
  onBurnComplete,
}: SelectionToolbarProps) {
  const [isBurning, setIsBurning] = useState(false);
  const [burnProgress, setBurnProgress] = useState({ current: 0, total: 0 });
  const { mutateAsync: signAndExecute } = useSignAndExecuteTransaction();

  const selectedCount = selectedIds.size;
  const selectedArray = Array.from(selectedIds);

  const handleBulkBurn = async () => {
    if (selectedCount === 0) return;
    
    const confirmed = window.confirm(
      `Burn ${selectedCount} item${selectedCount > 1 ? 's' : ''} permanently?`
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
      padding: '12px 16px',
      paddingBottom: 'calc(12px + env(safe-area-inset-bottom, 0px))',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '12px',
      backdropFilter: 'blur(10px)',
      zIndex: 1000,
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '12px',
        flex: 1,
        minWidth: 0,
      }}>
        <span style={{ 
          color: '#00d4d4', 
          fontWeight: '600',
          fontSize: '14px',
          whiteSpace: 'nowrap',
        }}>
          {selectedCount} selected
        </span>
        <button
          onClick={onClear}
          style={{
            padding: '8px 12px',
            borderRadius: '8px',
            border: '1px solid rgba(148, 163, 184, 0.3)',
            background: 'transparent',
            color: '#94a3b8',
            cursor: 'pointer',
            fontSize: '13px',
            minHeight: '40px',
            whiteSpace: 'nowrap',
          }}
        >
          Clear
        </button>
      </div>

      <button
        onClick={handleBulkBurn}
        disabled={isBurning || selectedCount === 0}
        style={{
          padding: '12px 20px',
          borderRadius: '10px',
          border: 'none',
          background: isBurning 
            ? 'rgba(249, 115, 22, 0.3)' 
            : 'linear-gradient(135deg, #f97316, #dc2626)',
          color: '#ffffff',
          cursor: isBurning ? 'not-allowed' : 'pointer',
          fontSize: '14px',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: isBurning ? 'none' : '0 4px 15px rgba(249, 115, 22, 0.3)',
          minHeight: '48px',
          whiteSpace: 'nowrap',
        }}
      >
        🔥 {isBurning ? `${burnProgress.current}/${burnProgress.total}` : 'Burn'}
      </button>
    </div>
  );
}
