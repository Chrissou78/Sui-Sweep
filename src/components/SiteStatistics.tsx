import { useEffect, useState } from 'react';
import { getGlobalStats, type GlobalStats } from '../lib/firebase';

export function SiteStatistics() {
  const [stats, setStats] = useState<GlobalStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    async function fetchStats() {
      setIsLoading(true);
      const globalStats = await getGlobalStats();
      setStats(globalStats);
      setIsLoading(false);
      // Trigger animation after data loads
      setTimeout(() => setIsVisible(true), 100);
    }
    fetchStats();
  }, []);

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toLocaleString();
  };

  if (isLoading || !stats) {
    return (
      <div style={{
        background: 'linear-gradient(180deg, rgba(0, 212, 212, 0.05) 0%, rgba(0, 0, 0, 0.2) 100%)',
        border: '1px solid rgba(0, 212, 212, 0.2)',
        borderRadius: '20px',
        padding: '32px',
        width: '100%',
        maxWidth: '900px',
        margin: '0 auto',
        textAlign: 'center',
      }}>
        <div style={{ color: '#00d4d4' }}>Loading global statistics...</div>
      </div>
    );
  }

  const statItems = [
    { label: 'Wallets Scanned', value: stats.walletsConnected, color: '#00d4d4', icon: '👛' },
    { label: 'NFTs Analyzed', value: stats.nftsScanned, color: '#60a5fa', icon: '🔍' },
    { label: 'Legit NFTs', value: stats.legitFound, color: '#34d399', icon: '✅' },
    { label: 'Dubious NFTs', value: stats.dubiousFound, color: '#fbbf24', icon: '⚠️' },
    { label: 'Scams Detected', value: stats.scamsFound, color: '#f87171', icon: '🚫' },
    { label: 'NFTs Burned', value: stats.nftsBurned, color: '#f97316', icon: '🔥' },
  ];

  return (
    <div style={{
      background: 'linear-gradient(180deg, rgba(0, 212, 212, 0.05) 0%, rgba(0, 0, 0, 0.2) 100%)',
      border: '1px solid rgba(0, 212, 212, 0.2)',
      borderRadius: '20px',
      padding: '32px',
      width: '100%',
      maxWidth: '900px',
      margin: '0 auto',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
      transition: 'all 0.6s ease-out',
    }}>
      <h3 style={{
        fontSize: '14px',
        fontWeight: '600',
        color: '#00d4d4',
        textTransform: 'uppercase',
        letterSpacing: '2px',
        marginBottom: '24px',
        textAlign: 'center',
      }}>
        🌍 Global Platform Statistics
      </h3>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
        gap: '16px',
      }}>
        {statItems.map((item, index) => (
          <div
            key={item.label}
            style={{
              background: 'rgba(0, 0, 0, 0.3)',
              borderRadius: '12px',
              padding: '20px 16px',
              textAlign: 'center',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
              transition: `all 0.4s ease-out ${index * 0.1}s`,
            }}
          >
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>{item.icon}</div>
            <div style={{
              fontSize: '28px',
              fontWeight: '700',
              color: item.color,
              marginBottom: '4px',
              fontFamily: 'monospace',
            }}>
              {formatNumber(item.value)}
            </div>
            <div style={{
              fontSize: '11px',
              color: '#94a3b8',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}>
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
