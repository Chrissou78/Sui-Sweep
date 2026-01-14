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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Stats reference
const statsRef = ref(database, 'stats');
//const walletsRef = ref(database, 'wallets');

export interface GlobalStats {
  walletsConnected: number;
  nftsScanned: number;
  legitFound: number;
  dubiousFound: number;
  scamsFound: number;
  nftsBurned: number;
}

const DEFAULT_STATS: GlobalStats = {
  walletsConnected: 1,
  nftsScanned: 3,
  legitFound: 1,
  dubiousFound: 1,
  scamsFound: 1,
  nftsBurned: 1,
};

// Get current global stats
export async function getGlobalStats(): Promise<GlobalStats> {
  try {
    const snapshot = await get(statsRef);
    if (snapshot.exists()) {
      return snapshot.val() as GlobalStats;
    }
    // Initialize with defaults if no data
    await set(statsRef, DEFAULT_STATS);
    return DEFAULT_STATS;
  } catch (error) {
    console.error('[SUI Sweep] Error fetching stats:', error);
    return DEFAULT_STATS;
  }
}

// Check if wallet has been tracked before
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

// Mark wallet as tracked
async function markWalletTracked(walletAddress: string, nftCount: number): Promise<void> {
  try {
    const walletRef = ref(database, `wallets/${walletAddress.toLowerCase().replace(/\./g, '_')}`);
    await set(walletRef, {
      address: walletAddress,
      nftCount,
      trackedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('[SUI Sweep] Error marking wallet:', error);
  }
}

// Track wallet connection (only if new)
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
    console.log('[SUI Sweep] New wallet tracked globally');
    return true;
  } catch (error) {
    console.error('[SUI Sweep] Error tracking wallet:', error);
    return false;
  }
}

// Track NFT scan (only once per wallet globally)
export async function trackNFTScan(
  walletAddress: string,
  totalNFTs: number,
  legit: number,
  dubious: number,
  scam: number
): Promise<boolean> {
  const alreadyTracked = await isWalletTracked(walletAddress);
  if (alreadyTracked) {
    console.log('[SUI Sweep] Wallet scan already tracked globally');
    return false;
  }

  try {
    await runTransaction(statsRef, (currentStats) => {
      if (currentStats) {
        currentStats.nftsScanned = (currentStats.nftsScanned || 0) + totalNFTs;
        currentStats.legitFound = (currentStats.legitFound || 0) + legit;
        currentStats.dubiousFound = (currentStats.dubiousFound || 0) + dubious;
        currentStats.scamsFound = (currentStats.scamsFound || 0) + scam;
      }
      return currentStats;
    });

    // Mark this wallet as tracked
    await markWalletTracked(walletAddress, totalNFTs);
    
    console.log(`[SUI Sweep] Scan tracked globally: +${totalNFTs} NFTs`);
    return true;
  } catch (error) {
    console.error('[SUI Sweep] Error tracking scan:', error);
    return false;
  }
}

// Track NFT burn (always increment)
export async function trackNFTBurn(count: number = 1): Promise<void> {
  try {
    await runTransaction(statsRef, (currentStats) => {
      if (currentStats) {
        currentStats.nftsBurned = (currentStats.nftsBurned || 0) + count;
      }
      return currentStats;
    });
    console.log(`[SUI Sweep] Burn tracked globally: +${count}`);
  } catch (error) {
    console.error('[SUI Sweep] Error tracking burn:', error);
  }
}

// Initialize stats if they don't exist
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
