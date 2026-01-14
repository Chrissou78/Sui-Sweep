import type { TokenItem, Classification } from '../types';
import { 
  APPROVED_TOKENS, 
  BLOCKED_TOKENS, 
  SCAM_TOKEN_KEYWORDS,
  PROTECTED_SYMBOLS 
} from './approvedTokens';

export function classifyToken(token: TokenItem): Classification {
  const packageId = token.packageId.toLowerCase();
  const name = (token.name || '').toLowerCase();
  const symbol = (token.symbol || '').toLowerCase();

  // Check approved tokens first
  if (APPROVED_TOKENS.some(addr => packageId.includes(addr.toLowerCase()))) {
    return {
      status: 'legit',
      confidence: 1.0,
      reason: 'Verified token',
    };
  }

  // Check blocked tokens
  if (BLOCKED_TOKENS.some(addr => packageId.includes(addr.toLowerCase()))) {
    return {
      status: 'scam',
      confidence: 1.0,
      reason: 'Known scam token',
    };
  }

  // Check for fake versions of protected symbols
  const upperSymbol = token.symbol?.toUpperCase() || '';
  if (PROTECTED_SYMBOLS.includes(upperSymbol)) {
    // If it uses a protected symbol but isn't in approved list, it's likely fake
    return {
      status: 'scam',
      confidence: 0.95,
      reason: `Fake ${upperSymbol} token`,
    };
  }

  // Check for scam keywords in name or symbol
  const hasScamKeyword = SCAM_TOKEN_KEYWORDS.some(keyword => 
    name.includes(keyword.toLowerCase()) || symbol.includes(keyword.toLowerCase())
  );

  if (hasScamKeyword) {
    return {
      status: 'scam',
      confidence: 0.85,
      reason: 'Suspicious token name',
    };
  }

  // Check for very small "dust" amounts (often used in scams)
  const balance = parseFloat(token.formattedBalance);
  if (balance > 0 && balance < 0.0001) {
    return {
      status: 'dubious',
      confidence: 0.7,
      reason: 'Dust amount (possible scam airdrop)',
    };
  }

  // Default to dubious for unknown tokens
  return {
    status: 'dubious',
    confidence: 0.5,
    reason: 'Unknown token - verify before interacting',
  };
}

export function getTokenStatusColor(status: string): string {
  switch (status) {
    case 'legit':
      return '#34d399';
    case 'dubious':
      return '#fbbf24';
    case 'scam':
      return '#f87171';
    default:
      return '#64748b';
  }
}

export function getTokenStatusLabel(status: string): string {
  switch (status) {
    case 'legit':
      return 'Verified';
    case 'dubious':
      return 'Unknown';
    case 'scam':
      return 'Scam';
    default:
      return 'Unknown';
  }
}
