import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SuiClientProvider, WalletProvider } from '@mysten/dapp-kit';
import App from './App';
import './index.css';
import '@mysten/dapp-kit/dist/index.css';

const queryClient = new QueryClient();

// Use alternative RPC endpoints that support CORS
const networks = {
  mainnet: { url: 'https://mainnet.suiet.app' },
  testnet: { url: 'https://testnet.suiet.app' },
  devnet: { url: 'https://devnet.suiet.app' },
};

// Custom dark theme for dApp Kit
const darkTheme = {
  blurs: {
    modalOverlay: 'blur(8px)',
  },
  backgroundColors: {
    primaryButton: '#00d4d4',
    primaryButtonHover: '#00b8b8',
    outlineButtonHover: 'rgba(0, 212, 212, 0.1)',
    modalOverlay: 'rgba(0, 0, 0, 0.85)',
    modalPrimary: '#0d1526',
    modalSecondary: '#131b2e',
    iconButton: 'transparent',
    iconButtonHover: 'rgba(0, 212, 212, 0.1)',
    dropdownMenu: '#0d1526',
    dropdownMenuSeparator: 'rgba(0, 212, 212, 0.1)',
    walletItemSelected: 'rgba(0, 212, 212, 0.15)',
    walletItemHover: 'rgba(0, 212, 212, 0.1)',
  },
  borderColors: {
    outlineButton: 'rgba(0, 212, 212, 0.3)',
  },
  colors: {
    primaryButton: '#0a0f1a',
    outlineButton: '#00d4d4',
    iconButton: '#00d4d4',
    body: '#e2e8f0',
    bodyMuted: '#94a3b8',
    bodyDanger: '#f87171',
  },
  radii: {
    small: '8px',
    medium: '12px',
    large: '16px',
    xlarge: '20px',
  },
  shadows: {
    primaryButton: '0 4px 15px rgba(0, 212, 212, 0.3)',
    walletItemSelected: '0 0 10px rgba(0, 212, 212, 0.2)',
  },
  fontWeights: {
    normal: '400',
    medium: '500',
    bold: '600',
  },
  fontSizes: {
    small: '14px',
    medium: '16px',
    large: '18px',
    xlarge: '20px',
  },
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontStyle: 'normal',
    lineHeight: '1.4',
    letterSpacing: '0',
  },
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networks} defaultNetwork="mainnet">
        <WalletProvider theme={darkTheme} autoConnect>
          <App />
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  </React.StrictMode>
);