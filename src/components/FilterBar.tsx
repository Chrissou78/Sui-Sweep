import type { ClassificationStatus } from '../types';

interface FilterBarProps {
  activeFilter: ClassificationStatus | 'all' | 'hidden';
  onFilterChange: (filter: ClassificationStatus | 'all' | 'hidden') => void;
  counts: {
    all: number;
    legit: number;
    dubious: number;
    scam: number;
    hidden: number;
  };
  onUnhideAll?: () => void;
  showUnhideAll?: boolean;
}

export function FilterBar({ 
  activeFilter, 
  onFilterChange, 
  counts, 
  onUnhideAll,
  showUnhideAll 
}: FilterBarProps) {
  const filters: { key: ClassificationStatus | 'all' | 'hidden'; label: string; color: string; icon: string }[] = [
    { key: 'all', label: 'All', color: '#00d4d4', icon: '📋' },
    { key: 'legit', label: 'Legit', color: '#34d399', icon: '✅' },
    { key: 'dubious', label: 'Dubious', color: '#fbbf24', icon: '⚠️' },
    { key: 'scam', label: 'Scam', color: '#f87171', icon: '🚫' },
    { key: 'hidden', label: 'Hidden', color: '#94a3b8', icon: '👁️' },
  ];

  return (
    <div style={{
      display: 'flex',
      gap: '12px',
      marginBottom: '24px',
      flexWrap: 'wrap',
      alignItems: 'center',
    }}>
      {filters.map(filter => {
        const count = counts[filter.key];
        const isActive = activeFilter === filter.key;
        
        return (
          <button
            key={filter.key}
            onClick={() => onFilterChange(filter.key)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 18px',
              borderRadius: '10px',
              border: `1px solid ${isActive ? filter.color : 'rgba(255, 255, 255, 0.1)'}`,
              background: isActive ? `${filter.color}20` : 'rgba(0, 0, 0, 0.2)',
              color: isActive ? filter.color : '#94a3b8',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: isActive ? '600' : '400',
              transition: 'all 0.2s ease',
            }}
          >
            <span>{filter.icon}</span>
            <span>{filter.label}</span>
            <span style={{
              background: isActive ? filter.color : 'rgba(255, 255, 255, 0.1)',
              color: isActive ? '#0a0f1a' : '#94a3b8',
              padding: '2px 8px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: '600',
            }}>
              {count}
            </span>
          </button>
        );
      })}

      {/* Unhide All button */}
      {showUnhideAll && (
        <button
          onClick={onUnhideAll}
          style={{
            marginLeft: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 18px',
            borderRadius: '10px',
            border: '1px solid rgba(96, 165, 250, 0.3)',
            background: 'rgba(96, 165, 250, 0.1)',
            color: '#60a5fa',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'all 0.2s ease',
          }}
        >
          👁️ Unhide All
        </button>
      )}
    </div>
  );
}
