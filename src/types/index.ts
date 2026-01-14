// Classification status
export type ClassificationStatus = 'legit' | 'dubious' | 'scam';

// Classification result
export interface Classification {
  status: ClassificationStatus;
  confidence: number;
  reason: string;
}

// NFT Item
export interface NFTItem {
  objectId: string;
  type: string;
  packageId: string;
  name: string;
  description: string;
  imageUrl: string;
  classification: Classification | null;
  isHidden: boolean;
  isSelected?: boolean;
}

// Token Item
export interface TokenItem {
  objectId: string;
  coinType: string;
  packageId: string;
  symbol: string;
  name: string;
  balance: string;
  decimals: number;
  formattedBalance: string;
  iconUrl?: string;
  classification: Classification | null;
  isHidden: boolean;
  isSelected?: boolean;
}

// Community Rating
export interface CommunityRating {
  packageId: string;
  upvotes: number;
  downvotes: number;
}

// Tab type
export type TabType = 'nfts' | 'tokens';
