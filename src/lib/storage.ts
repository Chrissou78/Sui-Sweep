// LocalStorage keys
const HIDDEN_NFTS_KEY = 'sui-sweep-hidden-nfts';
const USER_ACTIONS_KEY = 'sui-sweep-user-actions';

// Get list of hidden NFT IDs
export function getHiddenNFTs(): string[] {
  try {
    const stored = localStorage.getItem(HIDDEN_NFTS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

// Hide an NFT
export function hideNFT(objectId: string): void {
  const hidden = getHiddenNFTs();
  if (!hidden.includes(objectId)) {
    hidden.push(objectId);
    localStorage.setItem(HIDDEN_NFTS_KEY, JSON.stringify(hidden));
  }
}

// Unhide an NFT
export function unhideNFT(objectId: string): void {
  const hidden = getHiddenNFTs();
  const filtered = hidden.filter(id => id !== objectId);
  localStorage.setItem(HIDDEN_NFTS_KEY, JSON.stringify(filtered));
}

// Check if an NFT is hidden
export function isNFTHidden(objectId: string): boolean {
  return getHiddenNFTs().includes(objectId);
}

// Action types - added 'unhide'
export type UserActionType = 'hide' | 'unhide' | 'keep' | 'burn';

interface UserAction {
  objectId: string;
  action: UserActionType;
  timestamp: string;
}

// Log a user action
export function logUserAction(objectId: string, action: UserActionType): void {
  try {
    const stored = localStorage.getItem(USER_ACTIONS_KEY);
    const actions: UserAction[] = stored ? JSON.parse(stored) : [];
    
    actions.push({
      objectId,
      action,
      timestamp: new Date().toISOString(),
    });
    
    // Keep only last 1000 actions
    const trimmed = actions.slice(-1000);
    localStorage.setItem(USER_ACTIONS_KEY, JSON.stringify(trimmed));
  } catch (error) {
    console.error('Error logging action:', error);
  }
}

// Get user actions (for analytics/debugging)
export function getUserActions(): UserAction[] {
  try {
    const stored = localStorage.getItem(USER_ACTIONS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}
