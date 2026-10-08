import React from 'react';
import { useAccessibility } from '../../context/AccessibilityContext';

export const FloatingAccessibilityButton = () => {
  const { togglePanel, isPanelOpen } = useAccessibility();

  if (isPanelOpen) return null;

  return (
    <div
      className="floating-access-btn hide-on-print"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 880,
      }}
    >
      <button
        onClick={togglePanel}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          minHeight: '48px',
          padding: '0 18px',
          backgroundColor: 'var(--primary)',
          color: '#FFFFFF',
          borderRadius: 'var(--radius-full)',
          boxShadow: '0 8px 24px rgba(91, 95, 239, 0.4)',
          border: '2px solid rgba(255, 255, 255, 0.35)',
          fontWeight: '800',
          fontSize: '0.92rem',
          cursor: 'pointer',
          transition: 'all 0.22s ease',
          boxSizing: 'border-box',
        }}
        className="animate-gentle-bounce"
        aria-label="Buka Pengaturan Aksesibilitas"
        title="Buka Pengaturan Aksesibilitas (Reading & Display)"
      >
        <span style={{ fontSize: '1.25rem', lineHeight: 1 }}>♿</span>
        <span>Accessibility</span>
      </button>
    </div>
  );
};
