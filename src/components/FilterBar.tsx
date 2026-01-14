import { useLanguage } from '../contexts/LanguageContext';
import type { ClassificationStatus } from '../types';

interface FilterBarProps {
  activeFilter: ClassificationStatus | 'all' | 'hidden';
  onFilterChange: (filter: ClassificationStatus | 'all' | 'hidden') => void;
  counts: { all: number; legit: number; dubious: number; scam: number; hidden: number };
  onUnhideAll?: () => void;
  showUnhideAll?: boolean;
}

export function FilterBar({ activeFilter, onFilterChange, counts, onUnhideAll, showUnhideAll }: FilterBarProps) {
  const { t } = useLanguage();

  const filters: { key: ClassificationStatus | 'all' | 'hidden'; label: string; color: string; icon: string }[] = [
    { key: 'all', label: t.total, color: '#00d4d4', icon: '📋' },
    { key: 'legit', label: t.legit, color: '#34d399', icon: '✅' },
    { key: 'dubious', label: t.dubious, color: '#fbbf24', icon: '⚠️' },
    { key: 'scam', label: t.scam, color: '#f87171', icon: '🚫' },
    { key: 'hidden', label: t.hidden, color: '#94a3b8', icon: '👁️' },
  ];

  return (
    <div style={{ marginBottom: '20px' }}>
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}>
        {filters.map(filter => {
          const count = counts[filter.key];
          const isActive = activeFilter === filter.key;
          return (
            <button key={filter.key} onClick={() => onFilterChange(filter.key)} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 14px', borderRadius: '10px', border: `1px solid ${isActive ? filter.color : 'rgba(255, 255, 255, 0.1)'}`, background: isActive ? `${filter.color}20` : 'rgba(0, 0, 0, 0.2)', color: isActive ? filter.color : '#94a3b8', cursor: 'pointer', fontSize: '13px', fontWeight: isActive ? '600' : '400', transition: 'all 0.2s ease', whiteSpace: 'nowrap', flexShrink: 0, minHeight: '44px' }}>
              <span>{filter.icon}</span>
              <span className="filter-label">{filter.label}</span>
              <span style={{ background: isActive ? filter.color : 'rgba(255, 255, 255, 0.1)', color: isActive ? '#0a0f1a' : '#94a3b8', padding: '2px 6px', borderRadius: '6px', fontSize: '11px', fontWeight: '600', minWidth: '20px', textAlign: 'center' }}>{count}</span>
            </button>
          );
        })}
      </div>

      {showUnhideAll && (
        <button onClick={onUnhideAll} style={{ marginTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px 20px', borderRadius: '10px', border: '1px solid rgba(96, 165, 250, 0.3)', background: 'rgba(96, 165, 250, 0.1)', color: '#60a5fa', cursor: 'pointer', fontSize: '14px', fontWeight: '500', width: '100%', minHeight: '48px' }}>
          👁️ {t.unhideAll} ({counts.hidden})
        </button>
      )}

      <style>{`@media (max-width: 400px) { .filter-label { display: none; } }`}</style>
    </div>
  );
}