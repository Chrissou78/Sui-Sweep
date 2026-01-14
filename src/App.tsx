import { useState, useEffect, useMemo, useRef } from 'react';
import { ConnectButton, useCurrentAccount } from '@mysten/dapp-kit';
import { useWalletNFTs } from './hooks/useWalletNFTs';
import { useClassification } from './hooks/useClassification';
import { NFTGrid } from './components/NFTGrid';
import { FilterBar } from './components/FilterBar';
import { SelectionToolbar } from './components/SelectionToolbar';
import { SiteStatistics } from './components/SiteStatistics';
import { About } from './pages/About';
import { HowItWorks } from './pages/HowItWorks';
import { 
  trackWalletConnection, 
  trackNFTScan, 
  trackNFTBurn,
  initializeStats
} from './lib/firebase';
import { hideNFT, unhideNFT, isNFTHidden, getHiddenNFTs } from './lib/storage';
import type { NFTItem, ClassificationStatus } from './types';

type PageType = 'home' | 'about' | 'how-it-works';

function App() {
  const account = useCurrentAccount();
  const { nfts, isPending, error, refetch } = useWalletNFTs();
  const { classifications, isClassifying, progress, classifyAll } = useClassification();
  
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [localNFTs, setLocalNFTs] = useState<NFTItem[]>([]);
  const [activeFilter, setActiveFilter] = useState<ClassificationStatus | 'all' | 'hidden'>('all');
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  
  // Use refs to track what we've already processed (prevents duplicate tracking)
  const trackedWalletRef = useRef<string | null>(null);
  const trackedScanRef = useRef<string | null>(null);

  // Initialize Firebase stats on app load
  useEffect(() => {
    initializeStats();
  }, []);

  // Sync fetched NFTs to local state with hidden status
  useEffect(() => {
    if (nfts && nfts.length > 0) {
      const updated = nfts.map(nft => ({
        ...nft,
        isHidden: isNFTHidden(nft.objectId),
        isSelected: false,
      }));
      setLocalNFTs(updated);
    } else if (nfts && nfts.length === 0) {
      setLocalNFTs([]);
    }
  }, [nfts]);

  // Auto-classify when NFTs are loaded
  useEffect(() => {
    if (localNFTs.length > 0 && Object.keys(classifications).length === 0 && !isClassifying) {
      classifyAll(localNFTs);
    }
  }, [localNFTs, classifications, isClassifying, classifyAll]);

  // Track wallet connection - ONLY when a NEW wallet connects
  useEffect(() => {
    if (account?.address && trackedWalletRef.current !== account.address) {
      const doTrack = async () => {
        await trackWalletConnection(account.address);
        trackedWalletRef.current = account.address;
      };
      doTrack();
    }
  }, [account?.address]);

  // Track NFT scan - ONLY after classification completes for this wallet
  useEffect(() => {
    if (!account?.address) return;
    if (localNFTs.length === 0) return;
    if (isClassifying) return;
    
    // Check if all NFTs have been classified
    const allClassified = localNFTs.every(nft => classifications[nft.objectId]);
    if (!allClassified) return;
    
    // Create a unique key for this wallet + NFT set
    const scanKey = `${account.address}-${localNFTs.length}`;
    if (trackedScanRef.current === scanKey) return;
    
    // Count classifications
    let legit = 0, dubious = 0, scam = 0;
    localNFTs.forEach(nft => {
      const c = classifications[nft.objectId];
      if (c) {
        if (c.status === 'legit') legit++;
        else if (c.status === 'dubious') dubious++;
        else if (c.status === 'scam') scam++;
      }
    });
    
    // Track the scan (async)
    const doTrack = async () => {
      const tracked = await trackNFTScan(account.address, localNFTs.length, legit, dubious, scam);
      if (tracked) {
        trackedScanRef.current = scanKey;
      }
    };
    
    doTrack();
  }, [account?.address, localNFTs, classifications, isClassifying]);

  // Compute counts for display
  const counts = useMemo(() => {
    const all = localNFTs.length;
    const hidden = localNFTs.filter(n => n.isHidden).length;
    let legit = 0, dubious = 0, scam = 0;
    
    localNFTs.forEach(nft => {
      const c = classifications[nft.objectId];
      if (c) {
        if (c.status === 'legit') legit++;
        else if (c.status === 'dubious') dubious++;
        else if (c.status === 'scam') scam++;
      }
    });
    
    return { all, legit, dubious, scam, hidden };
  }, [localNFTs, classifications]);

  // Handlers
  const handleHide = (objectId: string) => {
    hideNFT(objectId);
    setLocalNFTs(prev => prev.map(n => 
      n.objectId === objectId ? { ...n, isHidden: true } : n
    ));
  };

  const handleUnhide = (objectId: string) => {
    unhideNFT(objectId);
    setLocalNFTs(prev => prev.map(n => 
      n.objectId === objectId ? { ...n, isHidden: false } : n
    ));
  };

  const handleUnhideAll = () => {
    const hiddenIds = getHiddenNFTs();
    hiddenIds.forEach(id => unhideNFT(id));
    setLocalNFTs(prev => prev.map(n => ({ ...n, isHidden: false })));
  };

  const handleBurn = (objectId: string) => {
    setLocalNFTs(prev => prev.filter(n => n.objectId !== objectId));
    // Track the burn in site stats
    trackNFTBurn(1);
  };

  const handleSelect = (objectId: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(objectId)) {
        next.delete(objectId);
      } else {
        next.add(objectId);
      }
      return next;
    });
  };

  const handleSelectAll = () => {
    const visibleIds = localNFTs
      .filter(n => !n.isHidden)
      .map(n => n.objectId);
    setSelectedIds(new Set(visibleIds));
  };

  const handleSelectScams = () => {
    const scamIds = localNFTs
      .filter(n => !n.isHidden && classifications[n.objectId]?.status === 'scam')
      .map(n => n.objectId);
    setSelectedIds(new Set(scamIds));
  };

  const handleClearSelection = () => {
    setSelectedIds(new Set());
  };

  const handleBulkBurnComplete = (burnedIds: string[]) => {
    setLocalNFTs(prev => prev.filter(n => !burnedIds.includes(n.objectId)));
    setSelectedIds(new Set());
    setSelectionMode(false);
    // Track all burns in site stats
    trackNFTBurn(burnedIds.length);
  };

  // Navigation
  const NavLink = ({ page, children }: { page: PageType; children: React.ReactNode }) => (
    <button
      onClick={() => setCurrentPage(page)}
      style={{
        background: 'none',
        border: 'none',
        color: currentPage === page ? '#00d4d4' : '#94a3b8',
        fontSize: '15px',
        fontWeight: currentPage === page ? '600' : '400',
        cursor: 'pointer',
        padding: '8px 16px',
        borderRadius: '8px',
        transition: 'all 0.2s ease',
      }}
    >
      {children}
    </button>
  );

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 40px',
        borderBottom: '1px solid rgba(0, 212, 212, 0.1)',
        background: 'rgba(0, 0, 0, 0.2)',
        backdropFilter: 'blur(10px)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        {/* Logo */}
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px',
            cursor: 'pointer',
          }}
          onClick={() => setCurrentPage('home')}
        >
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #00d4d4, #0088aa)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
          }}>
            🧹
          </div>
          <span style={{
            fontSize: '22px',
            fontWeight: '700',
            background: 'linear-gradient(135deg, #00d4d4, #60a5fa)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            SUI Sweep
          </span>
        </div>

        {/* Navigation */}
        <nav style={{ display: 'flex', gap: '8px' }}>
          <NavLink page="home">Home</NavLink>
          <NavLink page="about">About</NavLink>
          <NavLink page="how-it-works">How It Works</NavLink>
        </nav>

        {/* Connect Button */}
        <div>
          <ConnectButton />
        </div>
      </header>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '40px 20px' }}>
        {currentPage === 'about' && <About />}
        {currentPage === 'how-it-works' && <HowItWorks />}
        
        {currentPage === 'home' && (
          <>
            {!account ? (
              // Not Connected - Hero + Stats
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 'calc(100vh - 300px)',
                textAlign: 'center',
                gap: '40px',
              }}>
                <div>
                  <h1 style={{
                    fontSize: 'clamp(32px, 5vw, 56px)',
                    fontWeight: '700',
                    marginBottom: '20px',
                    lineHeight: '1.2',
                  }}>
                    <span style={{ color: '#ffffff' }}>Keep Your Sui Wallet </span>
                    <span style={{
                      background: 'linear-gradient(135deg, #00d4d4, #60a5fa)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}>
                      Clean & Safe
                    </span>
                  </h1>
                  <p style={{
                    fontSize: '18px',
                    color: '#94a3b8',
                    maxWidth: '600px',
                    margin: '0 auto 32px',
                    lineHeight: '1.6',
                  }}>
                    Scan your wallet for spam NFTs, scam airdrops, and suspicious objects. 
                    Take control of what stays in your wallet.
                  </p>
                  <p style={{
                    color: '#64748b',
                    fontSize: '14px',
                  }}>
                    👆 Click "Connect Wallet" in the top right to get started
                  </p>
                </div>

                {/* Site Statistics */}
                <SiteStatistics />
              </div>
            ) : (
              // Connected - Dashboard
              <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                {/* Dashboard Header */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '30px',
                  flexWrap: 'wrap',
                  gap: '20px',
                }}>
                  <div>
                    <h2 style={{ 
                      fontSize: '28px', 
                      fontWeight: '700', 
                      color: '#ffffff',
                      marginBottom: '8px',
                    }}>
                      Your NFTs
                    </h2>
                    <p style={{ color: '#64748b', fontSize: '14px' }}>
                      Connected: {account.address.slice(0, 8)}...{account.address.slice(-6)}
                    </p>
                  </div>

                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    {!selectionMode ? (
                      <button
                        onClick={() => setSelectionMode(true)}
                        style={{
                          padding: '12px 24px',
                          borderRadius: '12px',
                          border: '1px solid rgba(0, 212, 212, 0.3)',
                          background: 'rgba(0, 212, 212, 0.1)',
                          color: '#00d4d4',
                          cursor: 'pointer',
                          fontWeight: '500',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        🔥 Bulk Burn Mode
                      </button>
                    ) : (
                      <>
                        <button onClick={handleSelectAll} style={quickSelectStyle}>
                          Select All
                        </button>
                        <button onClick={handleSelectScams} style={quickSelectStyle}>
                          Select Scams
                        </button>
                        <button 
                          onClick={() => {
                            setSelectionMode(false);
                            setSelectedIds(new Set());
                          }}
                          style={{
                            ...quickSelectStyle,
                            borderColor: 'rgba(248, 113, 113, 0.3)',
                            color: '#f87171',
                          }}
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Stats Bar */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                  gap: '16px',
                  marginBottom: '30px',
                }}>
                  <StatCard label="Total" value={counts.all} color="#00d4d4" />
                  <StatCard label="Legit" value={counts.legit} color="#34d399" />
                  <StatCard label="Dubious" value={counts.dubious} color="#fbbf24" />
                  <StatCard label="Scam" value={counts.scam} color="#f87171" />
                  <StatCard label="Hidden" value={counts.hidden} color="#94a3b8" />
                </div>

                {/* Classification Progress */}
                {isClassifying && (
                  <div style={{
                    background: 'rgba(0, 212, 212, 0.1)',
                    border: '1px solid rgba(0, 212, 212, 0.2)',
                    borderRadius: '12px',
                    padding: '20px',
                    marginBottom: '24px',
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      marginBottom: '12px',
                    }}>
                      <span style={{ color: '#00d4d4', fontWeight: '500' }}>
                        🔍 Analyzing NFTs...
                      </span>
                      <span style={{ color: '#94a3b8' }}>
                        {progress.current} / {progress.total}
                      </span>
                    </div>
                    <div style={{
                      height: '8px',
                      background: 'rgba(0, 0, 0, 0.3)',
                      borderRadius: '4px',
                      overflow: 'hidden',
                    }}>
                      <div style={{
                        height: '100%',
                        width: `${progress.total > 0 ? (progress.current / progress.total) * 100 : 0}%`,
                        background: 'linear-gradient(90deg, #00d4d4, #60a5fa)',
                        borderRadius: '4px',
                        transition: 'width 0.3s ease',
                      }} />
                    </div>
                  </div>
                )}

                {/* Filter Bar */}
                <FilterBar
                  activeFilter={activeFilter}
                  onFilterChange={setActiveFilter}
                  counts={counts}
                  onUnhideAll={handleUnhideAll}
                  showUnhideAll={activeFilter === 'hidden' && counts.hidden > 0}
                />

                {/* Loading State */}
                {isPending && (
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '80px 20px',
                  }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      border: '3px solid rgba(0, 212, 212, 0.2)',
                      borderTopColor: '#00d4d4',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite',
                    }} />
                    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                  </div>
                )}

                {/* Error State */}
                {error && (
                  <div style={{
                    textAlign: 'center',
                    padding: '40px',
                    color: '#f87171',
                  }}>
                    <p>Error loading NFTs: {error.message}</p>
                    <button
                      onClick={() => refetch()}
                      style={{
                        marginTop: '16px',
                        padding: '10px 20px',
                        borderRadius: '8px',
                        border: '1px solid #f87171',
                        background: 'transparent',
                        color: '#f87171',
                        cursor: 'pointer',
                      }}
                    >
                      Retry
                    </button>
                  </div>
                )}

                {/* NFT Grid */}
                {!isPending && !error && (
                  <NFTGrid
                    nfts={localNFTs}
                    classifications={classifications}
                    activeFilter={activeFilter}
                    selectionMode={selectionMode}
                    selectedIds={selectedIds}
                    onHide={handleHide}
                    onUnhide={handleUnhide}
                    onBurn={handleBurn}
                    onSelect={handleSelect}
                  />
                )}
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer style={{
        padding: '20px 40px',
        borderTop: '1px solid rgba(0, 212, 212, 0.1)',
        textAlign: 'center',
        color: '#64748b',
        fontSize: '14px',
      }}>
        <p>Built with 💙 by the Sui Community • SUI Sweep © 2026</p>
      </footer>

      {/* Selection Toolbar */}
      {selectionMode && selectedIds.size > 0 && (
        <SelectionToolbar
          selectedIds={selectedIds}
          onClear={handleClearSelection}
          onBurnComplete={handleBulkBurnComplete}
          nfts={localNFTs}
        />
      )}
    </div>
  );
}

// Helper Components
const quickSelectStyle: React.CSSProperties = {
  padding: '10px 16px',
  borderRadius: '8px',
  border: '1px solid rgba(0, 212, 212, 0.2)',
  background: 'rgba(0, 0, 0, 0.2)',
  color: '#94a3b8',
  cursor: 'pointer',
  fontSize: '13px',
  transition: 'all 0.2s ease',
};

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div style={{
      background: 'rgba(0, 0, 0, 0.2)',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      borderRadius: '12px',
      padding: '16px',
      textAlign: 'center',
    }}>
      <div style={{
        fontSize: '28px',
        fontWeight: '700',
        color,
        marginBottom: '4px',
      }}>
        {value}
      </div>
      <div style={{
        fontSize: '12px',
        color: '#64748b',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
      }}>
        {label}
      </div>
    </div>
  );
}

export default App;
