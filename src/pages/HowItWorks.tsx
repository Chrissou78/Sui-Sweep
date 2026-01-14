import { useLanguage } from '../contexts/LanguageContext';

export function HowItWorks() {
  const { t } = useLanguage();

  const steps = [
    { number: t.step01, title: t.step01Title, description: t.step01Desc, icon: '🔗', color: '#00d4d4' },
    { number: t.step02, title: t.step02Title, description: t.step02Desc, icon: '🔍', color: '#60a5fa' },
    { number: t.step03, title: t.step03Title, description: t.step03Desc, icon: '📊', color: '#fbbf24' },
    { number: t.step04, title: t.step04Title, description: t.step04Desc, icon: '⚡', color: '#34d399' },
  ];

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '20px 0' }}>
      <h1 style={{ fontSize: 'clamp(28px, 6vw, 42px)', fontWeight: '700', background: 'linear-gradient(135deg, #00d4d4, #60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '32px', textAlign: 'center' }}>{t.howItWorksTitle}</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {steps.map((step) => (
          <div key={step.number} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', background: 'rgba(0, 0, 0, 0.2)', border: `1px solid ${step.color}30`, borderRadius: '14px', padding: '20px' }}>
            <div style={{ fontSize: '32px', flexShrink: 0 }}>{step.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ color: step.color, fontSize: '11px', fontWeight: '700', opacity: 0.7, marginBottom: '4px' }}>{step.number}</div>
              <h3 style={{ color: '#ffffff', fontSize: '18px', fontWeight: '600', marginBottom: '6px' }}>{step.title}</h3>
              <p style={{ color: '#94a3b8', lineHeight: '1.5', fontSize: '14px', margin: 0 }}>{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '24px', background: 'linear-gradient(135deg, rgba(0, 212, 212, 0.1) 0%, rgba(96, 165, 250, 0.1) 100%)', border: '1px solid rgba(0, 212, 212, 0.3)', borderRadius: '16px', padding: '24px' }}>
        <h2 style={{ color: '#00d4d4', fontSize: '18px', marginBottom: '12px' }}>{t.aboutHide}</h2>
        <p style={{ color: '#cbd5e1', lineHeight: '1.6', fontSize: '14px' }}>{t.aboutHideText}</p>
      </div>

      <div style={{ marginTop: '16px', background: 'rgba(251, 191, 36, 0.05)', border: '1px solid rgba(251, 191, 36, 0.2)', borderRadius: '16px', padding: '24px' }}>
        <h2 style={{ color: '#fbbf24', fontSize: '18px', marginBottom: '12px' }}>{t.proTips}</h2>
        <ul style={{ color: '#cbd5e1', lineHeight: '1.8', paddingLeft: '20px', margin: 0, fontSize: '14px' }}>
          <li>{t.tip1}</li>
          <li>{t.tip2}</li>
          <li>{t.tip3}</li>
        </ul>
      </div>
    </div>
  );
}