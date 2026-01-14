import { ConnectButton, useCurrentAccount, useDisconnectWallet } from '@mysten/dapp-kit';
import { useEffect } from 'react';
import { trackWalletConnection } from '../lib/siteStats';

export function WalletButton() {
  const account = useCurrentAccount();
  const { mutate: disconnect } = useDisconnectWallet();

  useEffect(() => {
    if (account?.address) {
      trackWalletConnection(account.address);
    }
  }, [account?.address]);

  if (!account) {
    return <ConnectButton connectText="Connect Wallet" />;
  }

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '8px 8px 8px 16px',
      borderRadius: '9999px',
      background: 'rgba(0, 212, 212, 0.1)',
      border: '2px solid #00d4d4',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      }}>
        <div style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: '#00d4d4',
          boxShadow: '0 0 10px #00d4d4',
        }} />
        <span style={{
          color: '#00d4d4',
          fontSize: '14px',
          fontWeight: 600,
          fontFamily: 'monospace',
        }}>
          {account.address.slice(0, 6)}...{account.address.slice(-4)}
        </span>
      </div>

      <button
        onClick={() => disconnect()}
        style={{
          padding: '8px 16px',
          borderRadius: '9999px',
          background: 'transparent',
          border: '1px solid rgba(0, 212, 212, 0.5)',
          color: '#00d4d4',
          fontSize: '12px',
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'all 0.2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(0, 212, 212, 0.2)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent';
        }}
      >
        Disconnect
      </button>
    </div>
  );
}
