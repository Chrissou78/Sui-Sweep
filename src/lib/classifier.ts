import { extractAndClassify } from 'nft-scam-detector';
import { Classification } from '../types';
import { APPROVED_PACKAGES, BLOCKED_PACKAGES, SCAM_KEYWORDS } from './approvedPackages';

interface NFTData {
  packageId: string;
  name: string;
  description: string;
  imageUrl: string;
}

function containsScamKeywords(text: string): boolean {
  const lowerText = text.toLowerCase();
  return SCAM_KEYWORDS.some(keyword => lowerText.includes(keyword.toLowerCase()));
}

export async function classifyNFT(nft: NFTData): Promise<Classification> {
  // 1. Check approved list first
  if (APPROVED_PACKAGES.some(pkg => nft.packageId.startsWith(pkg))) {
    return {
      status: 'legit',
      confidence: 1.0,
      reason: 'Verified package',
    };
  }

  // 2. Check blocked list
  if (BLOCKED_PACKAGES.some(pkg => nft.packageId.startsWith(pkg))) {
    return {
      status: 'scam',
      confidence: 1.0,
      reason: 'Known scam package',
    };
  }

  // 3. Check for scam keywords in metadata
  const combinedText = `${nft.name} ${nft.description}`;
  if (containsScamKeywords(combinedText)) {
    return {
      status: 'scam',
      confidence: 0.85,
      reason: 'Suspicious keywords detected',
    };
  }

  // 4. ML-based image analysis (if image exists)
  if (nft.imageUrl) {
    try {
      const mlResult = await extractAndClassify(nft.imageUrl);
      
      if (mlResult.classification === 'scam' && mlResult.scam_likelihood > 0.7) {
        return {
          status: 'scam',
          confidence: mlResult.scam_likelihood,
          reason: 'ML model detected scam patterns',
        };
      }
      
      if (mlResult.classification === 'ham' && mlResult.ham_likelihood > 0.7) {
        return {
          status: 'legit',
          confidence: mlResult.ham_likelihood,
          reason: 'ML model verified as legitimate',
        };
      }
    } catch (error) {
      console.warn('ML classification failed:', error);
      // Continue to dubious classification
    }
  }

  // 5. Default to dubious if no strong signals
  return {
    status: 'dubious',
    confidence: 0.5,
    reason: 'Unverified - review manually',
  };
}

export function getStatusColor(status: Classification['status']): string {
  switch (status) {
    case 'legit':
      return 'bg-green-500';
    case 'dubious':
      return 'bg-yellow-500';
    case 'scam':
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
}

export function getStatusLabel(status: Classification['status']): string {
  switch (status) {
    case 'legit':
      return 'LEGIT';
    case 'dubious':
      return 'DUBIOUS';
    case 'scam':
      return 'SCAM';
    default:
      return 'UNKNOWN';
  }
}
