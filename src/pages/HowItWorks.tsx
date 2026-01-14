export function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Connect Your Wallet',
      description: 'Click the "Connect Wallet" button in the top right corner. We support all major Sui wallets. Your connection is secure and we never store your private keys.',
      icon: '🔗',
      color: '#00d4d4',
    },
    {
      number: '02',
      title: 'Scan Your NFTs',
      description: 'Once connected, SUI Sweep automatically scans all non-coin objects in your wallet. This happens instantly and safely—we only read public blockchain data.',
      icon: '🔍',
      color: '#60a5fa',
    },
    {
      number: '03',
      title: 'Review Classifications',
      description: 'Each NFT is analyzed and classified as Legit (green), Dubious (yellow), or Scam (red). We use multiple detection methods including AI image analysis and known package lists.',
      icon: '📊',
      color: '#fbbf24',
    },
    {
      number: '04',
      title: 'Take Action',
      description: 'For each NFT, you can choose to Keep it, Hide it from view, or Burn it permanently. You\'re always in control of what stays in your wallet.',
      icon: '⚡',
      color: '#34d399',
    },
    {
      number: '05',
      title: 'Stay Protected',
      description: 'Come back anytime to scan for new suspicious items. As the community grows, our detection only gets smarter. Together, we keep Sui safe.',
      icon: '🛡️',
      color: '#f97316',
    },
  ];

  return (
    <div style={{
      maxWidth: '900px',
      margin: '0 auto',
      padding: '40px 20px',
    }}>
      <h1 style={{
        fontSize: '42px',
        fontWeight: '700',
        background: 'linear-gradient(135deg, #00d4d4, #60a5fa)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '20px',
        textAlign: 'center',
      }}>
        How It Works
      </h1>
      
      <p style={{
        color: '#94a3b8',
        textAlign: 'center',
        fontSize: '18px',
        marginBottom: '50px',
        maxWidth: '600px',
        margin: '0 auto 50px',
      }}>
        Cleaning your Sui wallet takes just a few clicks. Here's the simple process:
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {steps.map((step) => (
          <div
            key={step.number}
            style={{
              display: 'flex',
              gap: '24px',
              alignItems: 'flex-start',
              background: 'rgba(0, 0, 0, 0.2)',
              border: `1px solid ${step.color}33`,
              borderRadius: '16px',
              padding: '28px',
              transition: 'all 0.3s ease',
            }}
          >
            <div style={{
              fontSize: '40px',
              flexShrink: 0,
            }}>
              {step.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '12px',
              }}>
                <span style={{
                  color: step.color,
                  fontSize: '14px',
                  fontWeight: '700',
                  opacity: 0.6,
                }}>
                  STEP {step.number}
                </span>
              </div>
              <h3 style={{
                color: '#ffffff',
                fontSize: '22px',
                fontWeight: '600',
                marginBottom: '10px',
              }}>
                {step.title}
              </h3>
              <p style={{
                color: '#94a3b8',
                lineHeight: '1.7',
                margin: 0,
              }}>
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Hide Feature Explanation */}
      <div style={{
        marginTop: '50px',
        background: 'linear-gradient(135deg, rgba(0, 212, 212, 0.1) 0%, rgba(96, 165, 250, 0.1) 100%)',
        border: '1px solid rgba(0, 212, 212, 0.3)',
        borderRadius: '20px',
        padding: '32px',
      }}>
        <h2 style={{
          color: '#00d4d4',
          fontSize: '24px',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}>
          👁️ About the Hide Feature
        </h2>
        <p style={{ color: '#cbd5e1', lineHeight: '1.8', marginBottom: '16px' }}>
          When you <strong>Hide</strong> an NFT, it remains in your wallet on the blockchain—we 
          simply store a local preference so it doesn't clutter your view. This is perfect for 
          NFTs you don't want to see but aren't ready to burn permanently.
        </p>
        <p style={{ color: '#cbd5e1', lineHeight: '1.8' }}>
          You can always <strong>Unhide</strong> individual items or use the <strong>"Unhide All"</strong> button 
          when viewing hidden items to restore everything at once.
        </p>
      </div>

      {/* Pro Tips */}
      <div style={{
        marginTop: '30px',
        background: 'rgba(251, 191, 36, 0.05)',
        border: '1px solid rgba(251, 191, 36, 0.2)',
        borderRadius: '20px',
        padding: '32px',
      }}>
        <h2 style={{
          color: '#fbbf24',
          fontSize: '24px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}>
          💡 Pro Tips
        </h2>
        <ul style={{ color: '#cbd5e1', lineHeight: '2', paddingLeft: '20px', margin: 0 }}>
          <li>Use <strong style={{ color: '#fbbf24' }}>Selection Mode</strong> to bulk-burn multiple scam NFTs at once</li>
          <li>Check the <strong style={{ color: '#fbbf24' }}>Dubious</strong> filter for items that need manual review</li>
          <li>Never interact with NFTs that ask you to visit external websites to "claim rewards"</li>
          <li>If an airdrop seems too good to be true, it probably is</li>
          <li>Come back regularly to scan for new unwanted items</li>
        </ul>
      </div>
    </div>
  );
}
