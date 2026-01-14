import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, set, runTransaction } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAEhxHM2Yy0CO1Jw-7runlOGdeK1lw5lDg",
  authDomain: "sui-sweep.firebaseapp.com",
  databaseURL: "https://sui-sweep-default-rtdb.firebaseio.com",
  projectId: "sui-sweep",
  storageBucket: "sui-sweep.firebasestorage.app",
  messagingSenderId: "918025712225",
  appId: "1:918025712225:web:1e5ea97ab4123fd5777020",
  measurementId: "G-8TXL7DYHPR"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const statsRef = ref(database, 'stats');

export interface GlobalStats {
  walletsConnected: number;
  // NFT stats
  nftsScanned: number;
  nftLegitFound: number;
  nftDubiousFound: number;
  nftScamsFound: number;
  nftsBurned: number;
  // Token stats
  tokensScanned: number;
  tokenLegitFound: number;
  tokenDubiousFound: number;
  tokenScamsFound: number;
  tokensBurned: number;
}

const DEFAULT_STATS: GlobalStats = {
  walletsConnected: 1,
  nftsScanned: 3,
  nftLegitFound: 1,
  nftDubiousFound: 1,
  nftScamsFound: 1,
  nftsBurned: 1,
  tokensScanned: 5,
  tokenLegitFound: 3,
  tokenDubiousFound: 1,
  tokenScamsFound: 1,
  tokensBurned: 0,
};

export async function getGlobalStats(): Promise<GlobalStats> {
  try {
    const snapshot = await get(statsRef);
    if (snapshot.exists()) {
      // Merge with defaults to handle missing fields
      return { ...DEFAULT_STATS, ...snapshot.val() };
    }
    await set(statsRef, DEFAULT_STATS);
    return DEFAULT_STATS;
  } catch (error) {
    console.error('[SUI Sweep] Error fetching stats:', error);
    return DEFAULT_STATS;
  }
}

async function isWalletTracked(walletAddress: string): Promise<boolean> {
  try {
    const walletRef = ref(database, `wallets/${walletAddress.toLowerCase().replace(/\./g, '_')}`);
    const snapshot = await get(walletRef);
    return snapshot.exists();
  } catch (error) {
    console.error('[SUI Sweep] Error checking wallet:', error);
    return false;
  }
}

async function markWalletTracked(walletAddress: string): Promise<void> {
  try {
    const walletRef = ref(database, `wallets/${walletAddress.toLowerCase().replace(/\./g, '_')}`);
    await set(walletRef, {
      address: walletAddress,
      trackedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('[SUI Sweep] Error marking wallet:', error);
  }
}

export async function trackWalletConnection(walletAddress: string): Promise<boolean> {
  const alreadyTracked = await isWalletTracked(walletAddress);
  if (alreadyTracked) {
    console.log('[SUI Sweep] Wallet already tracked globally');
    return false;
  }

  try {
    await runTransaction(statsRef, (currentStats) => {
      if (currentStats) {
        currentStats.walletsConnected = (currentStats.walletsConnected || 0) + 1;
      }
      return currentStats;
    });
    await markWalletTracked(walletAddress);
    console.log('[SUI Sweep] New wallet tracked globally');
    return true;
  } catch (error) {
    console.error('[SUI Sweep] Error tracking wallet:', error);
    return false;
  }
}

// Track NFT scan
export async function trackNFTScan(
  walletAddress: string,
  totalNFTs: number,
  legit: number,
  dubious: number,
  scam: number
): Promise<boolean> {
  const sessionKey = `sui-sweep-nft-scanned-${walletAddress.toLowerCase()}`;
  
  if (sessionStorage.getItem(sessionKey)) {
    console.log('[SUI Sweep] NFT scan already tracked this session');
    return false;
  }

  try {
    await runTransaction(statsRef, (currentStats) => {
      if (currentStats) {
        currentStats.nftsScanned = (currentStats.nftsScanned || 0) + totalNFTs;
        currentStats.nftLegitFound = (currentStats.nftLegitFound || 0) + legit;
        currentStats.nftDubiousFound = (currentStats.nftDubiousFound || 0) + dubious;
        currentStats.nftScamsFound = (currentStats.nftScamsFound || 0) + scam;
      }
      return currentStats;
    });

    sessionStorage.setItem(sessionKey, 'true');
    console.log(`[SUI Sweep] NFT scan tracked: +${totalNFTs} NFTs`);
    return true;
  } catch (error) {
    console.error('[SUI Sweep] Error tracking NFT scan:', error);
    return false;
  }
}

// Track Token scan
export async function trackTokenScan(
  walletAddress: string,
  totalTokens: number,
  legit: number,
  dubious: number,
  scam: number
): Promise<boolean> {
  const sessionKey = `sui-sweep-token-scanned-${walletAddress.toLowerCase()}`;
  
  if (sessionStorage.getItem(sessionKey)) {
    console.log('[SUI Sweep] Token scan already tracked this session');
    return false;
  }

  try {
    await runTransaction(statsRef, (currentStats) => {
      if (currentStats) {
        currentStats.tokensScanned = (currentStats.tokensScanned || 0) + totalTokens;
        currentStats.tokenLegitFound = (currentStats.tokenLegitFound || 0) + legit;
        currentStats.tokenDubiousFound = (currentStats.tokenDubiousFound || 0) + dubious;
        currentStats.tokenScamsFound = (currentStats.tokenScamsFound || 0) + scam;
      }
      return currentStats;
    });

    sessionStorage.setItem(sessionKey, 'true');
    console.log(`[SUI Sweep] Token scan tracked: +${totalTokens} tokens`);
    return true;
  } catch (error) {
    console.error('[SUI Sweep] Error tracking token scan:', error);
    return false;
  }
}

// Track NFT burn
export async function trackNFTBurn(count: number = 1): Promise<void> {
  try {
    await runTransaction(statsRef, (currentStats) => {
      if (currentStats) {
        currentStats.nftsBurned = (currentStats.nftsBurned || 0) + count;
      }
      return currentStats;
    });
    console.log(`[SUI Sweep] NFT burn tracked: +${count}`);
  } catch (error) {
    console.error('[SUI Sweep] Error tracking NFT burn:', error);
  }
}

// Track Token burn
export async function trackTokenBurn(count: number = 1): Promise<void> {
  try {
    await runTransaction(statsRef, (currentStats) => {
      if (currentStats) {
        currentStats.tokensBurned = (currentStats.tokensBurned || 0) + count;
      }
      return currentStats;
    });
    console.log(`[SUI Sweep] Token burn tracked: +${count}`);
  } catch (error) {
    console.error('[SUI Sweep] Error tracking token burn:', error);
  }
}

export async function initializeStats(): Promise<void> {
  try {
    const snapshot = await get(statsRef);
    if (!snapshot.exists()) {
      await set(statsRef, DEFAULT_STATS);
      console.log('[SUI Sweep] Stats initialized with defaults');
    }
  } catch (error) {
    console.error('[SUI Sweep] Error initializing stats:', error);
  }
}
