import { useState, useEffect, useMemo, useRef } from 'react';
import { ConnectButton, useCurrentAccount } from '@mysten/dapp-kit';
import { useWalletNFTs } from './hooks/useWalletNFTs';
import { useWalletTokens } from './hooks/useWalletTokens';
import { useClassification } from './hooks/useClassification';
import { useTokenClassification } from './hooks/useTokenClassification';
import { NFTGrid } from './components/NFTGrid';
import { TokenGrid } from './components/TokenGrid';
import { FilterBar } from './components/FilterBar';
import { SelectionToolbar } from './components/SelectionToolbar';
import { SiteStatistics } from './components/SiteStatistics';
import { About } from './pages/About';
import { HowItWorks } from './pages/HowItWorks';
import { 
  trackWalletConnection, 
  trackNFTScan,
  trackTokenScan,
  trackNFTBurn,
  trackTokenBurn,
  initializeStats
} from './lib/firebase';
import { 
  hideNFT, unhideNFT, isNFTHidden, getHiddenNFTs,
  hideToken, unhideToken, isTokenHidden, getHiddenTokens
} from './lib/storage';
import type { NFTItem, TokenItem, ClassificationStatus, TabType } from './types';

type PageType = 'home' | 'about' | 'how-it-works';

function App() {
  const account = useCurrentAccount();
  
  // NFT hooks
  const { nfts, isPending: nftsPending, error: nftsError, refetch: refetchNFTs } = useWalletNFTs();
  const { classifications: nftClassifications, isClassifying: nftsClassifying, progress: nftsProgress, classifyAll: classifyAllNFTs } = useClassification();
  
  // Token hooks
  const { tokens, isPending: tokensPending, error: tokensError, refetch: refetchTokens } = useWalletTokens();
  const { classifications: tokenClassifications, isClassifying: tokensClassifying, progress: tokensProgress, classifyAll: classifyAllTokens } = useTokenClassification();
  
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [activeTab, setActiveTab] = useState<TabType>('nfts');
  const [localNFTs, setLocalNFTs] = useState<NFTItem[]>([]);
  const [localTokens, setLocalTokens] = useState<TokenItem[]>([]);
  const [activeFilter, setActiveFilter] = useState<ClassificationStatus | 'all' | 'hidden'>('all');
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const trackedWalletRef = useRef<string | null>(null);
  const trackedNFTScanRef = useRef<string | null>(null);
  const trackedTokenScanRef = useRef<string | null>(null);

  // Initialize Firebase stats
  useEffect(() => {
    initializeStats();
  }, []);

  // Sync NFTs
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

  // Sync Tokens
  useEffect(() => {
    if (tokens && tokens.length > 0) {
      const updated = tokens.map(token => ({
        ...token,
        isHidden: isTokenHidden(token.coinType),
        isSelected: false,
      }));
      setLocalTokens(updated);
    } else if (tokens && tokens.length === 0) {
      setLocalTokens([]);
    }
  }, [tokens]);

  // Auto-classify NFTs
  useEffect(() => {
    if (localNFTs.length > 0 && Object.keys(nftClassifications).length === 0 && !nftsClassifying) {
      classifyAllNFTs(localNFTs);
    }
  }, [localNFTs, nftClassifications, nftsClassifying, classifyAllNFTs]);

  // Auto-classify Tokens
  useEffect(() => {
    if (localTokens.length > 0 && Object.keys(tokenClassifications).length === 0 && !tokensClassifying) {
      classifyAllTokens(localTokens);
    }
  }, [localTokens, tokenClassifications, tokensClassifying, classifyAllTokens]);

  // Track wallet connection
  useEffect(() => {
    if (account?.address && trackedWalletRef.current !== account.address) {
      const doTrack = async () => {
        await trackWalletConnection(account.address);
        trackedWalletRef.current = account.address;
      };
      doTrack();
    }
  }, [account?.address]);

  // Track NFT scan
  useEffect(() => {
    if (!account?.address) return;
    if (localNFTs.length === 0) return;
    if (nftsClassifying) return;
    
    const allClassified = localNFTs.every(nft => nftClassifications[nft.objectId]);
    if (!allClassified) return;
    
    const scanKey = `${account.address}-nft-${localNFTs.length}`;
    if (trackedNFTScanRef.current === scanKey) return;
    
    let legit = 0, dubious = 0, scam = 0;
    localNFTs.forEach(nft => {
      const c = nftClassifications[nft.objectId];
      if (c) {
        if (c.status === 'legit') legit++;
        else if (c.status === 'dubious') dubious++;
        else if (c.status === 'scam') scam++;
      }
    });
    
    const doTrack = async () => {
      const tracked = await trackNFTScan(account.address, localNFTs.length, legit, dubious, scam);
      if (tracked) {
        trackedNFTScanRef.current = scanKey;
      }
    };
    
    doTrack();
  }, [account?.address, localNFTs, nftClassifications, nftsClassifying]);

  // Track Token scan
  useEffect(() => {
    if (!account?.address) return;
    if (localTokens.length === 0) return;
    if (tokensClassifying) return;
    
    const allClassified = localTokens.every(token => tokenClassifications[token.coinType]);
    if (!allClassified) return;
    
    const scanKey = `${account.address}-token-${localTokens.length}`;
    if (trackedTokenScanRef.current === scanKey) return;
    
    let legit = 0, dubious = 0, scam = 0;
    localTokens.forEach(token => {
      const c = tokenClassifications[token.coinType];
      if (c) {
        if (c.status === 'legit') legit++;
        else if (c.status === 'dubious') dubious++;
        else if (c.status === 'scam') scam++;
      }
    });
    
    const doTrack = async () => {
      const tracked = await trackTokenScan(account.address, localTokens.length, legit, dubious, scam);
      if (tracked) {
        trackedTokenScanRef.current = scanKey;
      }
    };
    
    doTrack();
  }, [account?.address, localTokens, tokenClassifications, tokensClassifying]);

  // Compute NFT counts
  const nftCounts = useMemo(() => {
    const all = localNFTs.length;
    const hidden = localNFTs.filter(n => n.isHidden).length;
    let legit = 0, dubious = 0, scam = 0;
    
    localNFTs.forEach(nft => {
      const c = nftClassifications[nft.objectId];
      if (c) {
        if (c.status === 'legit') legit++;
        else if (c.status === 'dubious') dubious++;
        else if (c.status === 'scam') scam++;
      }
    });
    
    return { all, legit, dubious, scam, hidden };
  }, [localNFTs, nftClassifications]);

  // Compute Token counts
  const tokenCounts = useMemo(() => {
    const all = localTokens.length;
    const hidden = localTokens.filter(t => t.isHidden).length;
    let legit = 0, dubious = 0, scam = 0;
    
    localTokens.forEach(token => {
      const c = tokenClassifications[token.coinType];
      if (c) {
        if (c.status === 'legit') legit++;
        else if (c.status === 'dubious') dubious++;
        else if (c.status === 'scam') scam++;
      }
    });
    
    return { all, legit, dubious, scam, hidden };
  }, [localTokens, tokenClassifications]);

  // Current counts based on active tab
  const counts = activeTab === 'nfts' ? nftCounts : tokenCounts;

  // NFT Handlers
  const handleHideNFT = (objectId: string) => {
    hideNFT(objectId);
    setLocalNFTs(prev => prev.map(n => 
      n.objectId === objectId ? { ...n, isHidden: true } : n
    ));
  };

  const handleUnhideNFT = (objectId: string) => {
    unhideNFT(objectId);
    setLocalNFTs(prev => prev.map(n => 
      n.objectId === objectId ? { ...n, isHidden: false } : n
    ));
  };

  const handleUnhideAllNFTs = () => {
    const hiddenIds = getHiddenNFTs();
    hiddenIds.forEach(id => unhideNFT(id));
    setLocalNFTs(prev => prev.map(n => ({ ...n, isHidden: false })));
  };

  const handleBurnNFT = (objectId: string) => {
    setLocalNFTs(prev => prev.filter(n => n.objectId !== objectId));
    trackNFTBurn(1);
  };

  // Token Handlers
  const handleHideToken = (coinType: string) => {
    hideToken(coinType);
    setLocalTokens(prev => prev.map(t => 
      t.coinType === coinType ? { ...t, isHidden: true } : t
    ));
  };

  const handleUnhideToken = (coinType: string) => {
    unhideToken(coinType);
    setLocalTokens(prev => prev.map(t => 
      t.coinType === coinType ? { ...t, isHidden: false } : t
    ));
  };

  const handleUnhideAllTokens = () => {
    const hiddenIds = getHiddenTokens();
    hiddenIds.forEach(id => unhideToken(id));
    setLocalTokens(prev => prev.map(t => ({ ...t, isHidden: false })));
  };

  const handleBurnToken = (coinType: string) => {
    setLocalTokens(prev => prev.filter(t => t.coinType !== coinType));
    trackTokenBurn(1);
  };

  // Selection handlers
  const handleSelect = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleSelectAll = () => {
    if (activeTab === 'nfts') {
      const visibleIds = localNFTs.filter(n => !n.isHidden).map(n => n.objectId);
      setSelectedIds(new Set(visibleIds));
    } else {
      const visibleIds = localTokens.filter(t => !t.isHidden).map(t => t.coinType);
      setSelectedIds(new Set(visibleIds));
    }
  };

  const handleSelectScams = () => {
    if (activeTab === 'nfts') {
      const scamIds = localNFTs
        .filter(n => !n.isHidden && nftClassifications[n.objectId]?.status === 'scam')
        .map(n => n.objectId);
      setSelectedIds(new Set(scamIds));
    } else {
      const scamIds = localTokens
        .filter(t => !t.isHidden && tokenClassifications[t.coinType]?.status === 'scam')
        .map(t => t.coinType);
      setSelectedIds(new Set(scamIds));
    }
  };

  const handleClearSelection = () => {
    setSelectedIds(new Set());
  };

  const handleBulkBurnComplete = (burnedIds: string[]) => {
    if (activeTab === 'nfts') {
      setLocalNFTs(prev => prev.filter(n => !burnedIds.includes(n.objectId)));
      trackNFTBurn(burnedIds.length);
    } else {
      setLocalTokens(prev => prev.filter(t => !burnedIds.includes(t.coinType)));
      trackTokenBurn(burnedIds.length);
    }
    setSelectedIds(new Set());
    setSelectionMode(false);
  };

  // Clear selection when switching tabs
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setSelectedIds(new Set());
    setSelectionMode(false);
    setActiveFilter('all');
  };

  const navigateTo = (page: PageType) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
  };

  const isPending = activeTab === 'nfts' ? nftsPending : tokensPending;
  const error = activeTab === 'nfts' ? nftsError : tokensError;
  const isClassifying = activeTab === 'nfts' ? nftsClassifying : tokensClassifying;
  const progress = activeTab === 'nfts' ? nftsProgress : tokensProgress;
  const refetch = activeTab === 'nfts' ? refetchNFTs : refetchTokens;

  return (
    <div style={{ 
      minHeight: '100dvh',
      display: 'flex', 
      flexDirection: 'column',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 16px',
        borderBottom: '1px solid rgba(0, 212, 212, 0.1)',
        background: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(10px)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        gap: '12px',
      }}>
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            cursor: 'pointer',
            flexShrink: 0,
          }}
          onClick={() => navigateTo('home')}
        >
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #00d4d4, #0088aa)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
          }}>
            🧹
          </div>
          <span style={{
            fontSize: '18px',
            fontWeight: '700',
            background: 'linear-gradient(135deg, #00d4d4, #60a5fa)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            SUI Sweep
          </span>
        </div>

        <nav style={{ 
          display: 'flex', 
          gap: '4px',
          flex: 1,
          justifyContent: 'center',
        }} className="desktop-nav">
          <NavButton active={currentPage === 'home'} onClick={() => navigateTo('home')}>Home</NavButton>
          <NavButton active={currentPage === 'about'} onClick={() => navigateTo('about')}>About</NavButton>
          <NavButton active={currentPage === 'how-it-works'} onClick={() => navigateTo('how-it-works')}>How It Works</NavButton>
        </nav>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="mobile-menu-btn"
          style={{
            display: 'none',
            background: 'rgba(0, 212, 212, 0.1)',
            border: '1px solid rgba(0, 212, 212, 0.2)',
            borderRadius: '8px',
            padding: '8px',
            cursor: 'pointer',
            color: '#00d4d4',
            fontSize: '20px',
            minWidth: '44px',
            minHeight: '44px',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>

        <div style={{ flexShrink: 0 }}>
          <ConnectButton />
        </div>
      </header>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div 
          className="mobile-nav"
          style={{
            position: 'fixed',
            top: '61px',
            left: 0,
            right: 0,
            background: 'rgba(10, 15, 26, 0.98)',
            borderBottom: '1px solid rgba(0, 212, 212, 0.2)',
            padding: '16px',
            zIndex: 99,
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <MobileNavButton active={currentPage === 'home'} onClick={() => navigateTo('home')}>🏠 Home</MobileNavButton>
          <MobileNavButton active={currentPage === 'about'} onClick={() => navigateTo('about')}>ℹ️ About</MobileNavButton>
          <MobileNavButton active={currentPage === 'how-it-works'} onClick={() => navigateTo('how-it-works')}>📖 How It Works</MobileNavButton>
        </div>
      )}

      {/* Main Content */}
      <main style={{ 
        flex: 1, 
        padding: '20px 16px',
        paddingBottom: selectionMode && selectedIds.size > 0 ? '100px' : '20px',
        overflow: 'auto',
      }}>
        {currentPage === 'about' && <About />}
        {currentPage === 'how-it-works' && <HowItWorks />}
        
        {currentPage === 'home' && (
          <>
            {!account ? (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 'calc(100dvh - 200px)',
                textAlign: 'center',
                gap: '32px',
                padding: '20px 0',
              }}>
                <div>
                  <h1 style={{
                    fontSize: 'clamp(28px, 6vw, 56px)',
                    fontWeight: '700',
                    marginBottom: '16px',
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
                    fontSize: 'clamp(14px, 4vw, 18px)',
                    color: '#94a3b8',
                    maxWidth: '500px',
                    margin: '0 auto 24px',
                    lineHeight: '1.6',
                    padding: '0 16px',
                  }}>
                    Scan your wallet for spam NFTs, scam tokens, and suspicious airdrops. 
                    Take control of what stays in your wallet.
                  </p>
                  <p style={{ color: '#64748b', fontSize: '14px' }}>
                    👆 Tap "Connect Wallet" to get started
                  </p>
                </div>

                <SiteStatistics />
              </div>
            ) : (
              <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                {/* Dashboard Header */}
                <div style={{ marginBottom: '20px' }}>
                  <h2 style={{ 
                    fontSize: 'clamp(22px, 5vw, 28px)', 
                    fontWeight: '700', 
                    color: '#ffffff',
                    marginBottom: '8px',
                  }}>
                    Your Wallet
                  </h2>
                  <p style={{ 
                    color: '#64748b', 
                    fontSize: '13px',
                    wordBreak: 'break-all',
                  }}>
                    {account.address.slice(0, 10)}...{account.address.slice(-8)}
                  </p>
                </div>

                {/* Tabs */}
                <div style={{
                  display: 'flex',
                  gap: '8px',
                  marginBottom: '20px',
                  background: 'rgba(0, 0, 0, 0.2)',
                  padding: '6px',
                  borderRadius: '14px',
                  width: 'fit-content',
                }}>
                  <TabButton 
                    active={activeTab === 'nfts'} 
                    onClick={() => handleTabChange('nfts')}
                    count={nftCounts.all}
                  >
                    🖼️ NFTs
                  </TabButton>
                  <TabButton 
                    active={activeTab === 'tokens'} 
                    onClick={() => handleTabChange('tokens')}
                    count={tokenCounts.all}
                  >
                    🪙 Tokens
                  </TabButton>
                </div>

                {/* Action Buttons */}
                <div style={{ 
                  display: 'flex', 
                  gap: '8px', 
                  marginBottom: '20px',
                  flexWrap: 'wrap',
                }}>
                  {!selectionMode ? (
                    <button
                      onClick={() => setSelectionMode(true)}
                      style={{
                        padding: '12px 20px',
                        borderRadius: '12px',
                        border: '1px solid rgba(0, 212, 212, 0.3)',
                        background: 'rgba(0, 212, 212, 0.1)',
                        color: '#00d4d4',
                        cursor: 'pointer',
                        fontWeight: '500',
                        fontSize: '14px',
                        minHeight: '44px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                      }}
                    >
                      🔥 Bulk Burn
                    </button>
                  ) : (
                    <>
                      <MobileActionButton onClick={handleSelectAll}>Select All</MobileActionButton>
                      <MobileActionButton onClick={handleSelectScams}>Select Scams</MobileActionButton>
                      <MobileActionButton 
                        onClick={() => {
                          setSelectionMode(false);
                          setSelectedIds(new Set());
                        }}
                        danger
                      >
                        Cancel
                      </MobileActionButton>
                    </>
                  )}
                </div>

                {/* Stats Bar */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
                  gap: '8px',
                  marginBottom: '20px',
                }}>
                  <MiniStatCard label="Total" value={counts.all} color="#00d4d4" />
                  <MiniStatCard label="Legit" value={counts.legit} color="#34d399" />
                  <MiniStatCard label="Dubious" value={counts.dubious} color="#fbbf24" />
                  <MiniStatCard label="Scam" value={counts.scam} color="#f87171" />
                  <MiniStatCard label="Hidden" value={counts.hidden} color="#94a3b8" />
                </div>

                {/* Classification Progress */}
                {isClassifying && (
                  <div style={{
                    background: 'rgba(0, 212, 212, 0.1)',
                    border: '1px solid rgba(0, 212, 212, 0.2)',
                    borderRadius: '12px',
                    padding: '16px',
                    marginBottom: '20px',
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      marginBottom: '10px',
                      fontSize: '14px',
                    }}>
                      <span style={{ color: '#00d4d4', fontWeight: '500' }}>
                        🔍 Analyzing {activeTab === 'nfts' ? 'NFTs' : 'Tokens'}...
                      </span>
                      <span style={{ color: '#94a3b8' }}>
                        {progress.current}/{progress.total}
                      </span>
                    </div>
                    <div style={{
                      height: '6px',
                      background: 'rgba(0, 0, 0, 0.3)',
                      borderRadius: '3px',
                      overflow: 'hidden',
                    }}>
                      <div style={{
                        height: '100%',
                        width: `${progress.total > 0 ? (progress.current / progress.total) * 100 : 0}%`,
                        background: 'linear-gradient(90deg, #00d4d4, #60a5fa)',
                        borderRadius: '3px',
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
                  onUnhideAll={activeTab === 'nfts' ? handleUnhideAllNFTs : handleUnhideAllTokens}
                  showUnhideAll={activeFilter === 'hidden' && counts.hidden > 0}
                />

                {/* Loading State */}
                {isPending && (
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '60px 20px',
                  }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
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
                    padding: '40px 20px',
                    color: '#f87171',
                  }}>
                    <p style={{ marginBottom: '16px', fontSize: '14px' }}>
                      Error loading {activeTab === 'nfts' ? 'NFTs' : 'tokens'}
                    </p>
                    <button
                      onClick={() => refetch()}
                      style={{
                        padding: '12px 24px',
                        borderRadius: '10px',
                        border: '1px solid #f87171',
                        background: 'transparent',
                        color: '#f87171',
                        cursor: 'pointer',
                        minHeight: '44px',
                      }}
                    >
                      Retry
                    </button>
                  </div>
                )}

                {/* Content Grid */}
                {!isPending && !error && (
                  <>
                    {activeTab === 'nfts' ? (
                      <NFTGrid
                        nfts={localNFTs}
                        classifications={nftClassifications}
                        activeFilter={activeFilter}
                        selectionMode={selectionMode}
                        selectedIds={selectedIds}
                        onHide={handleHideNFT}
                        onUnhide={handleUnhideNFT}
                        onBurn={handleBurnNFT}
                        onSelect={handleSelect}
                      />
                    ) : (
                      <TokenGrid
                        tokens={localTokens}
                        classifications={tokenClassifications}
                        activeFilter={activeFilter}
                        selectionMode={selectionMode}
                        selectedIds={selectedIds}
                        onHide={handleHideToken}
                        onUnhide={handleUnhideToken}
                        onBurn={handleBurnToken}
                        onSelect={handleSelect}
                      />
                    )}
                  </>
                )}
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer style={{
        padding: '16px',
        borderTop: '1px solid rgba(0, 212, 212, 0.1)',
        textAlign: 'center',
        color: '#64748b',
        fontSize: '12px',
      }}>
        <p>Built with 💙 by the Sui Community</p>
      </footer>

      {/* Selection Toolbar */}
      {selectionMode && selectedIds.size > 0 && (
        <SelectionToolbar
          selectedIds={selectedIds}
          onClear={handleClearSelection}
          onBurnComplete={handleBulkBurnComplete}
        />
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
        }
        @media (min-width: 769px) {
          .mobile-nav {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}

// Helper Components
function NavButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: active ? 'rgba(0, 212, 212, 0.1)' : 'none',
        border: 'none',
        color: active ? '#00d4d4' : '#94a3b8',
        fontSize: '14px',
        fontWeight: active ? '600' : '400',
        cursor: 'pointer',
        padding: '8px 14px',
        borderRadius: '8px',
        transition: 'all 0.2s ease',
        minHeight: '40px',
      }}
    >
      {children}
    </button>
  );
}

function MobileNavButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: active ? 'rgba(0, 212, 212, 0.15)' : 'rgba(0, 0, 0, 0.2)',
        border: `1px solid ${active ? 'rgba(0, 212, 212, 0.3)' : 'rgba(255, 255, 255, 0.05)'}`,
        color: active ? '#00d4d4' : '#e2e8f0',
        fontSize: '16px',
        fontWeight: '500',
        cursor: 'pointer',
        padding: '14px 16px',
        borderRadius: '12px',
        textAlign: 'left',
        minHeight: '52px',
      }}
    >
      {children}
    </button>
  );
}

function TabButton({ active, onClick, children, count }: { active: boolean; onClick: () => void; children: React.ReactNode; count: number }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: active ? 'rgba(0, 212, 212, 0.2)' : 'transparent',
        border: 'none',
        color: active ? '#00d4d4' : '#94a3b8',
        fontSize: '14px',
        fontWeight: active ? '600' : '400',
        cursor: 'pointer',
        padding: '10px 20px',
        borderRadius: '10px',
        transition: 'all 0.2s ease',
        minHeight: '44px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      {children}
      <span style={{
        background: active ? '#00d4d4' : 'rgba(255, 255, 255, 0.1)',
        color: active ? '#0a0f1a' : '#94a3b8',
        padding: '2px 8px',
        borderRadius: '6px',
        fontSize: '12px',
        fontWeight: '600',
      }}>
        {count}
      </span>
    </button>
  );
}

function MobileActionButton({ onClick, children, danger = false }: { onClick: () => void; children: React.ReactNode; danger?: boolean }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '10px 16px',
        borderRadius: '10px',
        border: `1px solid ${danger ? 'rgba(248, 113, 113, 0.3)' : 'rgba(0, 212, 212, 0.2)'}`,
        background: 'rgba(0, 0, 0, 0.2)',
        color: danger ? '#f87171' : '#94a3b8',
        cursor: 'pointer',
        fontSize: '13px',
        minHeight: '44px',
        fontWeight: '500',
      }}
    >
      {children}
    </button>
  );
}

function MiniStatCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div style={{
      background: 'rgba(0, 0, 0, 0.2)',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      borderRadius: '10px',
      padding: '12px 8px',
      textAlign: 'center',
    }}>
      <div style={{
        fontSize: 'clamp(20px, 5vw, 24px)',
        fontWeight: '700',
        color,
        marginBottom: '2px',
      }}>
        {value}
      </div>
      <div style={{
        fontSize: '10px',
        color: '#64748b',
        textTransform: 'uppercase',
        letterSpacing: '0.3px',
      }}>
        {label}
      </div>
    </div>
  );
}

export default App;
