import { useLanguage } from '../contexts/LanguageContext';

export function About() {
  const { t } = useLanguage();

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '20px 0' }}>
      <h1 style={{ fontSize: 'clamp(28px, 6vw, 42px)', fontWeight: '700', background: 'linear-gradient(135deg, #00d4d4, #60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '32px', textAlign: 'center' }}>{t.aboutTitle}</h1>

      <Section color="#00d4d4" title={t.ourStory}>
        <p>{t.ourStoryText1}</p>
        <p style={{ marginTop: '12px' }}>{t.ourStoryText2}</p>
      </Section>

      <Section color="#fbbf24" title={t.theProblem}>
        <p>{t.theProblemText}</p>
      </Section>

      <Section color="#34d399" title={t.theSolution}>
        <p>{t.theSolutionText}</p>
        <ul style={{ marginTop: '12px', paddingLeft: '20px' }}>
          <li><strong>{t.curatedLists}:</strong> {t.curatedListsDesc}</li>
          <li><strong>{t.aiDetection}:</strong> {t.aiDetectionDesc}</li>
          <li><strong>{t.keywordAnalysis}:</strong> {t.keywordAnalysisDesc}</li>
        </ul>
      </Section>

      <Section color="#60a5fa" title={t.ourMission}>
        <p>{t.ourMissionText}</p>
      </Section>
    </div>
  );
}

function Section({ color, title, children }: { color: string; title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: `${color}10`, border: `1px solid ${color}30`, borderRadius: '16px', padding: '24px', marginBottom: '20px' }}>
      <h2 style={{ color, fontSize: '20px', marginBottom: '16px' }}>{title}</h2>
      <div style={{ color: '#cbd5e1', lineHeight: '1.7', fontSize: '15px' }}>{children}</div>
    </div>
  );
}