export function About() {
  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '40px 20px',
    }}>
      <h1 style={{
        fontSize: '42px',
        fontWeight: '700',
        background: 'linear-gradient(135deg, #00d4d4, #60a5fa)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '40px',
        textAlign: 'center',
      }}>
        About SUI Sweep
      </h1>

      <div style={{
        background: 'rgba(0, 212, 212, 0.05)',
        border: '1px solid rgba(0, 212, 212, 0.2)',
        borderRadius: '20px',
        padding: '40px',
        marginBottom: '30px',
      }}>
        <h2 style={{ 
          color: '#00d4d4', 
          fontSize: '24px', 
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          🌟 Our Story
        </h2>
        <p style={{ color: '#cbd5e1', lineHeight: '1.8', marginBottom: '20px' }}>
          SUI Sweep was born from a simple observation in the Sui community: wallets were 
          becoming cluttered with unwanted NFTs, spam airdrops, and potential scams. What 
          started as a conversation between concerned community members became a mission 
          to protect everyone in the ecosystem.
        </p>
        <p style={{ color: '#cbd5e1', lineHeight: '1.8' }}>
          We're not a faceless corporation—we're Sui enthusiasts just like you, who believe 
          that everyone deserves a clean, safe wallet experience. This tool is built by the 
          community, for the community.
        </p>
      </div>

      <div style={{
        background: 'rgba(251, 191, 36, 0.05)',
        border: '1px solid rgba(251, 191, 36, 0.2)',
        borderRadius: '20px',
        padding: '40px',
        marginBottom: '30px',
      }}>
        <h2 style={{ 
          color: '#fbbf24', 
          fontSize: '24px', 
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          💡 The Spark
        </h2>
        <p style={{ color: '#cbd5e1', lineHeight: '1.8' }}>
          Every day, Sui users receive unsolicited NFT airdrops. While some are legitimate 
          marketing efforts, many are sophisticated scams designed to phish users or trick 
          them into malicious transactions. We saw friends lose assets. We heard stories 
          of newcomers falling for fake "claim your reward" NFTs. Something had to change.
        </p>
      </div>

      <div style={{
        background: 'rgba(52, 211, 153, 0.05)',
        border: '1px solid rgba(52, 211, 153, 0.2)',
        borderRadius: '20px',
        padding: '40px',
        marginBottom: '30px',
      }}>
        <h2 style={{ 
          color: '#34d399', 
          fontSize: '24px', 
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          🛡️ The Solution
        </h2>
        <p style={{ color: '#cbd5e1', lineHeight: '1.8', marginBottom: '20px' }}>
          SUI Sweep combines multiple layers of protection:
        </p>
        <ul style={{ color: '#cbd5e1', lineHeight: '2', paddingLeft: '20px' }}>
          <li><strong style={{ color: '#00d4d4' }}>Curated Lists:</strong> A developer-maintained 
          list of known legitimate and malicious packages</li>
          <li><strong style={{ color: '#00d4d4' }}>AI Detection:</strong> Machine learning that 
          analyzes NFT images for common scam patterns</li>
          <li><strong style={{ color: '#00d4d4' }}>Keyword Analysis:</strong> Automatic flagging 
          of suspicious terms like "claim," "airdrop," and "verify"</li>
          <li><strong style={{ color: '#00d4d4' }}>Community Wisdom:</strong> Aggregate insights 
          from the entire Sui community (coming soon)</li>
        </ul>
      </div>

      <div style={{
        background: 'rgba(96, 165, 250, 0.05)',
        border: '1px solid rgba(96, 165, 250, 0.2)',
        borderRadius: '20px',
        padding: '40px',
      }}>
        <h2 style={{ 
          color: '#60a5fa', 
          fontSize: '24px', 
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          🎯 Our Mission
        </h2>
        <p style={{ color: '#cbd5e1', lineHeight: '1.8', marginBottom: '20px' }}>
          To make the Sui ecosystem safer, one wallet at a time. We believe that:
        </p>
        <ul style={{ color: '#cbd5e1', lineHeight: '2', paddingLeft: '20px' }}>
          <li>Security should be <strong style={{ color: '#60a5fa' }}>accessible</strong> to everyone, not just experts</li>
          <li>Users should have <strong style={{ color: '#60a5fa' }}>full control</strong> over what's in their wallet</li>
          <li>The community is <strong style={{ color: '#60a5fa' }}>stronger together</strong> against bad actors</li>
          <li>Web3 should be <strong style={{ color: '#60a5fa' }}>welcoming</strong>, not intimidating</li>
        </ul>
      </div>
    </div>
  );
}
