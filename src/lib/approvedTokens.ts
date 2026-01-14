// Known legitimate token package IDs on Sui
export const APPROVED_TOKENS: string[] = [
  '0x2', // SUI
  '0xdba34672e30cb065b1f93e3ab55318768fd6fef66c15942c9f7cb846e2f900e7', // USDC
  '0xc060006111016b8a020ad5b33834984a437aaa7d3c74c18e09a95d48aceab08c', // USDT
  '0xa99b8952d4f7d947ea77fe0ecdcc9e5fc0bcab2841d6e2a5aa00c3044e5544b5', // WETH
  '0x27792d9fed7f9844eb4839566001bb6f6cb4804f66aa2da6fe1ee242d896881', // WBTC
  '0x5d4b302506645c37ff133b98c4b50a5ae14841659738d6d733d59d0d217a93bf', // CETUS
  '0x06864a6f921804860930db6ddbe2e16acdf8504495ea7481637a1c8b9a8fe54b', // TURBOS
  '0x549e8b69270defbfafd4f94e17ec44cdbdd99820b33bda2278dea3b9a32d3f55', // BLUB
  '0x76cb819b01abed502bee8a702b4c2d547532c12f25001c9dea795a5e631c26f1', // FUD
];

// Known scam token package IDs
export const BLOCKED_TOKENS: string[] = [
  // Add known scam token addresses here
];

// Suspicious token name keywords
export const SCAM_TOKEN_KEYWORDS: string[] = [
  'airdrop',
  'claim',
  'free',
  'reward',
  'bonus',
  'gift',
  'promo',
  'giveaway',
  'official',
  'verify',
  'connect',
  'wallet',
  'limited',
  'urgent',
  'act now',
  'double',
  'triple',
  '100x',
  '1000x',
  'moon',
  'elon',
  'trump',
  'pepe2',
  'shib2',
  'doge2',
];

// Legitimate token symbols that scammers often fake
export const PROTECTED_SYMBOLS: string[] = [
  'SUI',
  'USDC',
  'USDT',
  'WETH',
  'WBTC',
  'ETH',
  'BTC',
];
