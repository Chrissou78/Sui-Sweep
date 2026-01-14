import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { LANGUAGES } from '../lib/i18n';

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = LANGUAGES.find(l => l.code === language);

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '8px 12px',
          borderRadius: '10px',
          border: '1px solid rgba(0, 212, 212, 0.2)',
          background: 'rgba(0, 0, 0, 0.2)',
          color: '#e2e8f0',
          cursor: 'pointer',
          fontSize: '14px',
          minHeight: '40px',
        }}
      >
        <span>{currentLang?.flag}</span>
        <span style={{ display: 'none' }} className="lang-name">{currentLang?.code.toUpperCase()}</span>
        <span style={{ fontSize: '10px', opacity: 0.6 }}>▼</span>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setIsOpen(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 998,
            }}
          />
          
          {/* Dropdown */}
          <div style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            marginTop: '8px',
            background: '#0d1526',
            border: '1px solid rgba(0, 212, 212, 0.3)',
            borderRadius: '12px',
            overflow: 'hidden',
            zIndex: 999,
            minWidth: '150px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
          }}>
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  width: '100%',
                  padding: '12px 16px',
                  border: 'none',
                  background: language === lang.code ? 'rgba(0, 212, 212, 0.15)' : 'transparent',
                  color: language === lang.code ? '#00d4d4' : '#e2e8f0',
                  cursor: 'pointer',
                  fontSize: '14px',
                  textAlign: 'left',
                  transition: 'background 0.2s ease',
                }}
              >
                <span style={{ fontSize: '18px' }}>{lang.flag}</span>
                <span>{lang.name}</span>
              </button>
            ))}
          </div>
        </>
      )}

      <style>{`
        @media (min-width: 500px) {
          .lang-name {
            display: inline !important;
          }
        }
      `}</style>
    </div>
  );
}