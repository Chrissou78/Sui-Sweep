import { ConnectButton, useCurrentAccount } from '@mysten/dapp-kit';

export function ConnectWallet() {
  const account = useCurrentAccount();

  if (!account) {
    return <ConnectButton />;
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-[#0d1520] border border-[#00d4d4]/30">
        <div className="w-2 h-2 rounded-full bg-[#00d4d4] animate-pulse" />
        <span className="text-sm font-medium text-white/90">
          {account.address.slice(0, 6)}...{account.address.slice(-4)}
        </span>
      </div>
      <ConnectButton />
    </div>
  );
}
