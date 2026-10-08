import React, { useState } from 'react';
import { Award, Sparkles, ChevronDown, ChevronUp, Type, BookOpen, Volume2, HeartHandshake, Shield } from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { useAudio } from '../../context/AudioContext';

export const JudgesDemoBar = ({ onNavigate }) => {
  // Collapsed by default so the web feels like a real, authentic LMS application
  const [isOpen, setIsOpen] = useState(false);
  const { setTextSize, setReadingMode, readingMode, textSize } = useAccessibility();
  const { speak, playChime } = useAudio();
  const [activeToast, setActiveToast] = useState(null);

  const showDemoToast = (msg) => {
    playChime('click');
    setActiveToast(msg);
    setTimeout(() => setActiveToast(null), 3500);
  };

  const handleDemoAdaptiveText = () => {
    const nextSize = textSize === 'large' ? 'xlarge' : textSize === 'xlarge' ? 'medium' : 'large';
    setTextSize(nextSize);
    showDemoToast(`✨ Adaptive Text: Ukuran teks kini ${nextSize.toUpperCase()}. Seluruh modul otomatis berubah.`);
  };

  const handleDemoEasyReading = () => {
    const nextMode = readingMode === 'easy' ? 'standard' : 'easy';
    setReadingMode(nextMode);
    showDemoToast(
      nextMode === 'easy'
        ? '📖 Easy Reading Mode Aktif: Layout lebih lapang & minim distraksi.'
        : '📖 Mode Standar kembali aktif.'
    );
  };

  const handleDemoAudio = () => {
    speak(
      'Selamat datang di AKSARA. Platform pembelajaran adaptif yang menghadirkan pengalaman belajar inklusif melalui teks, audio, dan pengaturan aksesibilitas.',
      'Narasi Suara Ramah Anak',
      'demo-audio'
    );
    showDemoToast('🔊 Narasi Suara Aktif.');
  };

  const handleDemoActivity = () => {
    if (onNavigate) onNavigate('activity');
    showDemoToast('🧩 Membuka Aktivitas Interaktif.');
  };

  const handleDemoSelfLove = () => {
    if (onNavigate) onNavigate('lesson-3');
    showDemoToast('❤️ Membuka Modul Self-Love & Menjaga Diri.');
  };

  return (
    <>
      {activeToast && (
        <div
          role="status"
          style={{
            position: 'fixed',
            top: '70px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'var(--text-main)',
            color: '#FFFFFF',
            padding: '10px 22px',
            borderRadius: 'var(--radius-full)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            zIndex: 1200,
            fontSize: '0.88rem',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            border: '2px solid var(--accent)',
            animation: 'fadeIn 0.25s ease',
          }}
        >
          <Sparkles size={16} color="var(--accent)" />
          <span>{activeToast}</span>
        </div>
      )}

      {/* Retractable Innovation Tool Bar */}
      <div
        className="aksara-demo-bar hide-on-print"
        style={{
          backgroundColor: '#1E2338',
          color: '#FFFFFF',
          borderBottom: isOpen ? '2px solid var(--primary)' : 'none',
          fontSize: '0.82rem',
          transition: 'var(--transition-smooth)',
          zIndex: 850,
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: isOpen ? '8px 20px' : '4px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '8px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: isOpen ? 'var(--accent)' : 'rgba(255,255,255,0.12)',
                color: isOpen ? '#2A1800' : '#E2E8F0',
                padding: '3px 10px',
                borderRadius: 'var(--radius-full)',
                fontWeight: '800',
                fontSize: '0.72rem',
                textTransform: 'uppercase',
                border: 'none',
              }}
              title="Klik untuk membuka/menutup bilah inovasi edukasi"
            >
              <Award size={12} />
              <span>{isOpen ? 'Tutup Bilah Inovasi' : '💡 Bilah Inovasi Pendidikan (Klik Disini)'}</span>
              {isOpen ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            </button>
            {!isOpen && (
              <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>
                AKSARA Adaptive Learning System
              </span>
            )}
          </div>

          {isOpen && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
              <button
                onClick={handleDemoAdaptiveText}
                style={{
                  backgroundColor: 'rgba(255,255,255,0.12)',
                  color: '#FFFFFF',
                  padding: '5px 10px',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  fontSize: '0.78rem',
                  fontWeight: '700',
                  border: '1px solid rgba(255,255,255,0.2)',
                }}
              >
                <Type size={13} color="#FFD166" />
                Adaptive Text ({textSize.toUpperCase()})
              </button>

              <button
                onClick={handleDemoEasyReading}
                style={{
                  backgroundColor: readingMode === 'easy' ? 'var(--secondary)' : 'rgba(255,255,255,0.12)',
                  color: readingMode === 'easy' ? '#063826' : '#FFFFFF',
                  padding: '5px 10px',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  fontSize: '0.78rem',
                  fontWeight: '700',
                  border: '1px solid rgba(255,255,255,0.2)',
                }}
              >
                <BookOpen size={13} />
                Easy Reading {readingMode === 'easy' ? '(Aktif)' : ''}
              </button>

              <button
                onClick={handleDemoAudio}
                style={{
                  backgroundColor: 'rgba(255,255,255,0.12)',
                  color: '#FFFFFF',
                  padding: '5px 10px',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  fontSize: '0.78rem',
                  fontWeight: '700',
                  border: '1px solid rgba(255,255,255,0.2)',
                }}
              >
                <Volume2 size={13} color="#6CC5A3" />
                Uji Audio
              </button>

              <button
                onClick={handleDemoActivity}
                style={{
                  backgroundColor: 'rgba(255,255,255,0.12)',
                  color: '#FFFFFF',
                  padding: '5px 10px',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  fontSize: '0.78rem',
                  fontWeight: '700',
                  border: '1px solid rgba(255,255,255,0.2)',
                }}
              >
                <HeartHandshake size={13} color="#FF8FA3" />
                Aktivitas
              </button>

              <button
                onClick={handleDemoSelfLove}
                style={{
                  backgroundColor: 'rgba(255,255,255,0.12)',
                  color: '#FFFFFF',
                  padding: '5px 10px',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  fontSize: '0.78rem',
                  fontWeight: '700',
                  border: '1px solid rgba(255,255,255,0.2)',
                }}
              >
                <Shield size={13} color="#A78BFA" />
                Self-Love
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
