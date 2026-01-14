// LocalStorage keys
const HIDDEN_NFTS_KEY = 'sui-sweep-hidden-nfts';
const HIDDEN_TOKENS_KEY = 'sui-sweep-hidden-tokens';
const USER_ACTIONS_KEY = 'sui-sweep-user-actions';

// ============================================
// NFT Storage Functions
// ============================================

export function getHiddenNFTs(): string[] {
  try {
    const stored = localStorage.getItem(HIDDEN_NFTS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function hideNFT(objectId: string): void {
  const hidden = getHiddenNFTs();
  if (!hidden.includes(objectId)) {
    hidden.push(objectId);
    localStorage.setItem(HIDDEN_NFTS_KEY, JSON.stringify(hidden));
  }
}

export function unhideNFT(objectId: string): void {
  const hidden = getHiddenNFTs();
  const filtered = hidden.filter(id => id !== objectId);
  localStorage.setItem(HIDDEN_NFTS_KEY, JSON.stringify(filtered));
}

export function isNFTHidden(objectId: string): boolean {
  return getHiddenNFTs().includes(objectId);
}

// ============================================
// Token Storage Functions
// ============================================

export function getHiddenTokens(): string[] {
  try {
    const stored = localStorage.getItem(HIDDEN_TOKENS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function hideToken(coinType: string): void {
  const hidden = getHiddenTokens();
  if (!hidden.includes(coinType)) {
    hidden.push(coinType);
    localStorage.setItem(HIDDEN_TOKENS_KEY, JSON.stringify(hidden));
  }
}

export function unhideToken(coinType: string): void {
  const hidden = getHiddenTokens();
  const filtered = hidden.filter(id => id !== coinType);
  localStorage.setItem(HIDDEN_TOKENS_KEY, JSON.stringify(filtered));
}

export function isTokenHidden(coinType: string): boolean {
  return getHiddenTokens().includes(coinType);
}

// ============================================
// User Actions Logging
// ============================================

export type UserActionType = 'hide' | 'unhide' | 'keep' | 'burn';

interface UserAction {
  objectId: string;
  action: UserActionType;
  type: 'nft' | 'token';
  timestamp: string;
}

export function logUserAction(objectId: string, action: UserActionType, type: 'nft' | 'token' = 'nft'): void {
  try {
    const stored = localStorage.getItem(USER_ACTIONS_KEY);
    const actions: UserAction[] = stored ? JSON.parse(stored) : [];
    
    actions.push({
      objectId,
      action,
      type,
      timestamp: new Date().toISOString(),
    });
    
    const trimmed = actions.slice(-1000);
    localStorage.setItem(USER_ACTIONS_KEY, JSON.stringify(trimmed));
  } catch (error) {
    console.error('Error logging action:', error);
  }
}

export function getUserActions(): UserAction[] {
  try {
    const stored = localStorage.getItem(USER_ACTIONS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}
