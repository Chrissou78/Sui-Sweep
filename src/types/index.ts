export type ClassificationStatus = 'legit' | 'dubious' | 'scam';

export interface Classification {
  status: ClassificationStatus;
  confidence: number;
  reason: string;
}

export interface NFTItem {
  objectId: string;
  type: string;
  packageId: string;
  name: string;
  description: string;
  imageUrl: string;
  classification: Classification | null;
  isHidden: boolean;
  isSelected: boolean;
}

export interface CommunityRating {
  packageId: string;
  upvotes: number;
  downvotes: number;
}
