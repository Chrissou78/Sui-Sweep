// Site-wide statistics - tracks ONLY actions within this app

export interface SiteStats {
  walletsConnected: number;
  uniqueWallets: string[];
  nftsScanned: number;
  legitFound: number;
  dubiousFound: number;
  scamsFound: number;
  nftsBurned: number;
  // Track which wallet+nft combos we've already counted
  scannedSessions: string[];
  lastUpdated: string;
}

const STATS_KEY = 'sui-sweep-site-stats-v2'; // New key to start fresh

// Initial seed values
const DEFAULT_STATS: SiteStats = {
  walletsConnected: 1,
  uniqueWallets: ['0x0000000000000000000000000000000000000000000000000000000000000001'],
  nftsScanned: 3,
  legitFound: 1,
  dubiousFound: 1,
  scamsFound: 1,
  nftsBurned: 1,
  scannedSessions: ['seed-session'],
  lastUpdated: new Date().toISOString()
};

export function getSiteStats(): SiteStats {
  try {
    const stored = localStorage.getItem(STATS_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Ensure arrays exist
      if (!Array.isArray(parsed.uniqueWallets)) parsed.uniqueWallets = [];
      if (!Array.isArray(parsed.scannedSessions)) parsed.scannedSessions = [];
      return parsed;
    }
  } catch (e) {
    console.error('[SUI Sweep] Error reading stats:', e);
  }
  return { ...DEFAULT_STATS };
}

export function saveSiteStats(stats: SiteStats): void {
  try {
    stats.lastUpdated = new Date().toISOString();
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch (e) {
    console.error('[SUI Sweep] Error saving stats:', e);
  }
}

// Track wallet connection - returns true if NEW wallet
export function trackWalletConnection(walletAddress: string): boolean {
  const stats = getSiteStats();
  const normalizedAddress = walletAddress.toLowerCase();
  
  if (!stats.uniqueWallets.includes(normalizedAddress)) {
    stats.uniqueWallets.push(normalizedAddress);
    stats.walletsConnected = stats.uniqueWallets.length;
    saveSiteStats(stats);
    console.log('[SUI Sweep] New wallet tracked. Total:', stats.walletsConnected);
    return true;
  }
  console.log('[SUI Sweep] Wallet already tracked');
  return false;
}

// Track NFT scan - ONLY once per wallet, ever (not per session)
export function trackNFTScan(
  walletAddress: string,
  totalNFTs: number,
  legit: number,
  dubious: number,
  scam: number
): boolean {
  const stats = getSiteStats();
  const sessionKey = `scan-${walletAddress.toLowerCase()}`;
  
  // Check if we've EVER scanned this wallet
  if (stats.scannedSessions.includes(sessionKey)) {
    console.log('[SUI Sweep] Wallet already scanned previously, skipping');
    return false;
  }
  
  // Add to scanned sessions
  stats.scannedSessions.push(sessionKey);
  
  // Update counts
  stats.nftsScanned += totalNFTs;
  stats.legitFound += legit;
  stats.dubiousFound += dubious;
  stats.scamsFound += scam;
  
  saveSiteStats(stats);
  console.log(`[SUI Sweep] Scan tracked: +${totalNFTs} NFTs (+${legit} legit, +${dubious} dubious, +${scam} scam)`);
  console.log(`[SUI Sweep] New totals: ${stats.nftsScanned} scanned, ${stats.legitFound} legit, ${stats.dubiousFound} dubious, ${stats.scamsFound} scam`);
  return true;
}

// Track NFT burn
export function trackNFTBurn(count: number = 1): void {
  const stats = getSiteStats();
  stats.nftsBurned += count;
  saveSiteStats(stats);
  console.log(`[SUI Sweep] Burn tracked: +${count}. Total burned: ${stats.nftsBurned}`);
}

// Get display-friendly stats
export function getDisplayStats() {
  const stats = getSiteStats();
  return {
    walletsConnected: stats.walletsConnected,
    nftsScanned: stats.nftsScanned,
    legitFound: stats.legitFound,
    dubiousFound: stats.dubiousFound,
    scamsFound: stats.scamsFound,
    nftsBurned: stats.nftsBurned
  };
}

// Reset stats completely
export function resetStats(): void {
  localStorage.removeItem(STATS_KEY);
  console.log('[SUI Sweep] Stats reset to defaults');
}

// Debug: show current stats
export function debugStats(): void {
  console.log('[SUI Sweep] Current stats:', getSiteStats());
}
