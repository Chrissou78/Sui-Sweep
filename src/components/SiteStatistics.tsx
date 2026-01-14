import { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { getGlobalStats, type GlobalStats } from '../lib/firebase';

export function SiteStatistics() {
  const { t } = useLanguage();
  const [stats, setStats] = useState<GlobalStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    async function fetchStats() {
      setIsLoading(true);
      const globalStats = await getGlobalStats();
      setStats(globalStats);
      setIsLoading(false);
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
      <div style={{ background: 'linear-gradient(180deg, rgba(0, 212, 212, 0.05) 0%, rgba(0, 0, 0, 0.2) 100%)', border: '1px solid rgba(0, 212, 212, 0.2)', borderRadius: '16px', padding: '24px', width: '100%', maxWidth: '100%', textAlign: 'center' }}>
        <div style={{ color: '#00d4d4', fontSize: '14px' }}>Loading...</div>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', maxWidth: '600px', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.6s ease-out' }}>
      <div style={{ background: 'linear-gradient(180deg, rgba(0, 212, 212, 0.1) 0%, rgba(0, 0, 0, 0.2) 100%)', border: '1px solid rgba(0, 212, 212, 0.3)', borderRadius: '16px', padding: '20px', marginBottom: '16px', textAlign: 'center' }}>
        <div style={{ fontSize: '14px', color: '#00d4d4', marginBottom: '8px' }}>👛 {t.walletsProtected}</div>
        <div style={{ fontSize: '36px', fontWeight: '700', color: '#ffffff', fontFamily: 'monospace' }}>{formatNumber(stats.walletsConnected)}</div>
      </div>

      <div style={{ background: 'linear-gradient(180deg, rgba(96, 165, 250, 0.05) 0%, rgba(0, 0, 0, 0.2) 100%)', border: '1px solid rgba(96, 165, 250, 0.2)', borderRadius: '16px', padding: '20px', marginBottom: '16px' }}>
        <h3 style={{ fontSize: '12px', fontWeight: '600', color: '#60a5fa', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '16px', textAlign: 'center' }}>🖼️ {t.nftStats}</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px' }}>
          <StatBox icon="🔍" value={stats.nftsScanned} label={t.scanned} color="#60a5fa" />
          <StatBox icon="✅" value={stats.nftLegitFound} label={t.legit} color="#34d399" />
          <StatBox icon="⚠️" value={stats.nftDubiousFound} label={t.dubious} color="#fbbf24" />
          <StatBox icon="🚫" value={stats.nftScamsFound} label={t.scamsDetected} color="#f87171" />
          <StatBox icon="🔥" value={stats.nftsBurned} label={t.burned} color="#f97316" />
        </div>
      </div>

      <div style={{ background: 'linear-gradient(180deg, rgba(168, 85, 247, 0.05) 0%, rgba(0, 0, 0, 0.2) 100%)', border: '1px solid rgba(168, 85, 247, 0.2)', borderRadius: '16px', padding: '20px' }}>
        <h3 style={{ fontSize: '12px', fontWeight: '600', color: '#a855f7', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '16px', textAlign: 'center' }}>🪙 {t.tokenStats}</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px' }}>
          <StatBox icon="🔍" value={stats.tokensScanned} label={t.scanned} color="#a855f7" />
          <StatBox icon="✅" value={stats.tokenLegitFound} label={t.legit} color="#34d399" />
          <StatBox icon="⚠️" value={stats.tokenDubiousFound} label={t.dubious} color="#fbbf24" />
          <StatBox icon="🚫" value={stats.tokenScamsFound} label={t.scamsDetected} color="#f87171" />
          <StatBox icon="🔥" value={stats.tokensBurned} label={t.burned} color="#f97316" />
        </div>
      </div>
    </div>
  );
}

function StatBox({ icon, value, label, color }: { icon: string; value: number; label: string; color: string }) {
  const formatNumber = (num: number): string => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <div style={{ background: 'rgba(0, 0, 0, 0.3)', borderRadius: '10px', padding: '10px 6px', textAlign: 'center' }}>
      <div style={{ fontSize: '16px', marginBottom: '4px' }}>{icon}</div>
      <div style={{ fontSize: '18px', fontWeight: '700', color, fontFamily: 'monospace' }}>{formatNumber(value)}</div>
      <div style={{ fontSize: '8px', color: '#64748b', textTransform: 'uppercase' }}>{label}</div>
    </div>
  );
}