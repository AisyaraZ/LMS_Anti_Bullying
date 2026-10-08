import React from 'react';
import {
  X,
  RotateCcw,
  Sliders,
  Type,
  Sun,
  Moon,
  AlignLeft,
  Volume2,
  Eye,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';

export const AccessibilityPanel = () => {
  const {
    isPanelOpen,
    closePanel,
    textSize,
    setTextSize,
    lineSpacing,
    setLineSpacing,
    letterSpacing,
    setLetterSpacing,
    readingMode,
    setReadingMode,
    contrastMode,
    setContrastMode,
    fontMode,
    setFontMode,
    audioSpeed,
    setAudioSpeed,
    resetSettings,
  } = useAccessibility();

  if (!isPanelOpen) return null;

  const textSizeLevels = [
    { key: 'small', label: 'A-', title: 'Kecil' },
    { key: 'medium', label: 'A', title: 'Sedang' },
    { key: 'large', label: 'A+', title: 'Besar' },
    { key: 'xlarge', label: 'A++', title: 'Sangat Besar' },
  ];

  const lineSpacingOptions = [
    { key: 'normal', label: 'Normal' },
    { key: 'relaxed', label: 'Relaxed' },
    { key: 'wide', label: 'Wide' },
  ];

  const letterSpacingOptions = [
    { key: 'normal', label: 'Normal' },
    { key: 'medium', label: 'Medium' },
    { key: 'wide', label: 'Wide' },
  ];

  const readingModeOptions = [
    { key: 'standard', label: 'Standard', desc: 'Tampilan default yang kaya visual' },
    { key: 'easy', label: 'Easy Reading', desc: 'Teks lebih besar, jarak renggang, minim distraksi' },
    { key: 'focus', label: 'Focus Mode', desc: 'Fokus pada satu bagian materi, latar redup' },
  ];

  const fontOptions = [
    { key: 'standard', label: 'Standard (Plus Jakarta)', sample: 'Teks Normal' },
    { key: 'dyslexic', label: 'Dyslexia Friendly (Lexend)', sample: 'Ramah Disleksia' },
  ];

  const contrastOptions = [
    { key: 'normal', label: 'Normal', icon: Sun },
    { key: 'high', label: 'High Contrast', icon: Moon },
  ];

  const speedOptions = [0.75, 1, 1.25, 1.5];

  return (
    <>
      {/* Backdrop */}
      <div
        className="drawer-backdrop"
        onClick={closePanel}
        aria-hidden="true"
      />

      {/* Drawer Container */}
      <aside
        role="dialog"
        aria-label="Panel Pengaturan Aksesibilitas dan Adaptasi Baca"
        aria-modal="true"
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          maxWidth: '460px',
          backgroundColor: 'var(--bg-surface)',
          borderLeft: '2px solid var(--border-light)',
          boxShadow: '-10px 0 30px rgba(0, 0, 0, 0.15)',
          zIndex: 1100,
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
          animation: 'slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '22px 24px',
            borderBottom: '1.5px solid var(--border-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            backgroundColor: 'var(--bg-surface)',
            zIndex: 10,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                backgroundColor: 'var(--primary-light)',
                color: 'var(--primary)',
                padding: '8px',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Sliders size={22} />
            </div>
            <div>
              <h2
                style={{
                  fontSize: '1.15rem',
                  fontWeight: '800',
                  color: 'var(--text-main)',
                  lineHeight: 1.2,
                }}
              >
                Reading & Accessibility
              </h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Sesuaikan kenyamanan belajar Anda
              </p>
            </div>
          </div>
          <button
            onClick={closePanel}
            style={{
              padding: '8px',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-muted)',
              backgroundColor: 'var(--bg-subtle)',
            }}
            title="Tutup Panel"
            aria-label="Tutup panel aksesibilitas"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content body */}
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '26px' }}>
          {/* Live Preview Card */}
          <div
            style={{
              backgroundColor: 'var(--bg-subtle)',
              border: '1.5px dashed var(--primary)',
              borderRadius: 'var(--radius-lg)',
              padding: '16px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.75rem',
                fontWeight: '700',
                color: 'var(--primary)',
                textTransform: 'uppercase',
                marginBottom: '8px',
              }}
            >
              <Sparkles size={14} />
              <span>Pratinjau Langsung (Live Preview)</span>
            </div>
            <p
              style={{
                fontSize: 'calc(0.95rem * var(--aksara-scale))',
                lineHeight: 'var(--aksara-line-height)',
                letterSpacing: 'var(--aksara-letter-spacing)',
                color: 'var(--text-main)',
              }}
            >
              "Setiap anak memiliki cara belajar yang unik. Bersama AKSARA, belajar menjadi aman, nyaman, dan ramah untuk semua."
            </p>
          </div>

          {/* 1. Text Size */}
          <section>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '10px',
              }}
            >
              <label
                style={{
                  fontSize: '0.95rem',
                  fontWeight: '700',
                  color: 'var(--text-main)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <Type size={18} color="var(--primary)" />
                1. Text Size (Ukuran Teks)
              </label>
              <span
                style={{
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  color: 'var(--primary)',
                  backgroundColor: 'var(--primary-light)',
                  padding: '2px 8px',
                  borderRadius: 'var(--radius-full)',
                }}
              >
                {textSize.toUpperCase()}
              </span>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '8px',
              }}
            >
              {textSizeLevels.map((lvl) => (
                <button
                  key={lvl.key}
                  type="button"
                  onClick={() => setTextSize(lvl.key)}
                  style={{
                    padding: '10px 4px',
                    borderRadius: 'var(--radius-md)',
                    border: '1.5px solid',
                    borderColor: textSize === lvl.key ? 'var(--primary)' : 'var(--border-light)',
                    backgroundColor: textSize === lvl.key ? 'var(--primary)' : 'var(--bg-surface)',
                    color: textSize === lvl.key ? '#FFFFFF' : 'var(--text-main)',
                    fontWeight: '700',
                    fontSize: lvl.key === 'small' ? '0.85rem' : lvl.key === 'xlarge' ? '1.25rem' : '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '2px',
                    transition: 'var(--transition-smooth)',
                  }}
                  aria-pressed={textSize === lvl.key}
                >
                  <span>{lvl.label}</span>
                  <span style={{ fontSize: '0.7rem', opacity: 0.85, fontWeight: '500' }}>
                    {lvl.title}
                  </span>
                </button>
              ))}
            </div>
          </section>

          {/* 2. Line Spacing */}
          <section>
            <label
              style={{
                fontSize: '0.95rem',
                fontWeight: '700',
                color: 'var(--text-main)',
                display: 'block',
                marginBottom: '10px',
              }}
            >
              2. Line Spacing (Jarak Antarbaris)
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              {lineSpacingOptions.map((opt) => (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => setLineSpacing(opt.key)}
                  style={{
                    padding: '10px 8px',
                    borderRadius: 'var(--radius-md)',
                    border: '1.5px solid',
                    borderColor: lineSpacing === opt.key ? 'var(--primary)' : 'var(--border-light)',
                    backgroundColor: lineSpacing === opt.key ? 'var(--primary-light)' : 'var(--bg-surface)',
                    color: lineSpacing === opt.key ? 'var(--primary)' : 'var(--text-main)',
                    fontWeight: '700',
                    fontSize: '0.9rem',
                    transition: 'var(--transition-smooth)',
                  }}
                  aria-pressed={lineSpacing === opt.key}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </section>

          {/* 3. Letter Spacing */}
          <section>
            <label
              style={{
                fontSize: '0.95rem',
                fontWeight: '700',
                color: 'var(--text-main)',
                display: 'block',
                marginBottom: '10px',
              }}
            >
              3. Letter Spacing (Jarak Huruf)
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              {letterSpacingOptions.map((opt) => (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => setLetterSpacing(opt.key)}
                  style={{
                    padding: '10px 8px',
                    borderRadius: 'var(--radius-md)',
                    border: '1.5px solid',
                    borderColor: letterSpacing === opt.key ? 'var(--primary)' : 'var(--border-light)',
                    backgroundColor: letterSpacing === opt.key ? 'var(--primary-light)' : 'var(--bg-surface)',
                    color: letterSpacing === opt.key ? 'var(--primary)' : 'var(--text-main)',
                    fontWeight: '700',
                    fontSize: '0.9rem',
                    transition: 'var(--transition-smooth)',
                  }}
                  aria-pressed={letterSpacing === opt.key}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </section>

          {/* 4. Reading Mode */}
          <section>
            <label
              style={{
                fontSize: '0.95rem',
                fontWeight: '700',
                color: 'var(--text-main)',
                display: 'block',
                marginBottom: '10px',
              }}
            >
              4. Reading Mode (Mode Membaca)
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {readingModeOptions.map((opt) => (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => setReadingMode(opt.key)}
                  style={{
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-md)',
                    border: '1.5px solid',
                    borderColor: readingMode === opt.key ? 'var(--primary)' : 'var(--border-light)',
                    backgroundColor: readingMode === opt.key ? 'var(--primary-light)' : 'var(--bg-surface)',
                    textAlign: 'left',
                    transition: 'var(--transition-smooth)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                  }}
                  aria-pressed={readingMode === opt.key}
                >
                  <div>
                    <div
                      style={{
                        fontWeight: '700',
                        fontSize: '0.95rem',
                        color: readingMode === opt.key ? 'var(--primary)' : 'var(--text-main)',
                        marginBottom: '2px',
                      }}
                    >
                      • {opt.label}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {opt.desc}
                    </div>
                  </div>
                  {readingMode === opt.key && (
                    <CheckCircle2 size={18} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  )}
                </button>
              ))}
            </div>
          </section>

          {/* 5. Contrast Mode */}
          <section>
            <label
              style={{
                fontSize: '0.95rem',
                fontWeight: '700',
                color: 'var(--text-main)',
                display: 'block',
                marginBottom: '10px',
              }}
            >
              5. Contrast Mode (Kontras Warna)
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
              {contrastOptions.map((opt) => {
                const IconComponent = opt.icon;
                const isSelected = contrastMode === opt.key;
                return (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => setContrastMode(opt.key)}
                    style={{
                      padding: '12px 14px',
                      borderRadius: 'var(--radius-md)',
                      border: '1.5px solid',
                      borderColor: isSelected ? 'var(--primary)' : 'var(--border-light)',
                      backgroundColor: isSelected ? 'var(--primary-light)' : 'var(--bg-surface)',
                      color: isSelected ? 'var(--primary)' : 'var(--text-main)',
                      fontWeight: '700',
                      fontSize: '0.9rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      transition: 'var(--transition-smooth)',
                    }}
                    aria-pressed={isSelected}
                  >
                    <IconComponent size={18} />
                    <span>{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* 6. Font Family */}
          <section>
            <label
              style={{
                fontSize: '0.95rem',
                fontWeight: '700',
                color: 'var(--text-main)',
                display: 'block',
                marginBottom: '10px',
              }}
            >
              6. Font (Jenis Huruf)
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {fontOptions.map((opt) => (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => setFontMode(opt.key)}
                  style={{
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-md)',
                    border: '1.5px solid',
                    borderColor: fontMode === opt.key ? 'var(--primary)' : 'var(--border-light)',
                    backgroundColor: fontMode === opt.key ? 'var(--primary-light)' : 'var(--bg-surface)',
                    color: fontMode === opt.key ? 'var(--primary)' : 'var(--text-main)',
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontFamily: opt.key === 'dyslexic' ? "'Lexend', sans-serif" : "'Plus Jakarta Sans', sans-serif",
                    transition: 'var(--transition-smooth)',
                  }}
                  aria-pressed={fontMode === opt.key}
                >
                  <div>
                    <div style={{ fontWeight: '700', fontSize: '0.95rem' }}>{opt.label}</div>
                    <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Contoh: {opt.sample}</div>
                  </div>
                  {fontMode === opt.key && <CheckCircle2 size={18} color="var(--primary)" />}
                </button>
              ))}
            </div>
          </section>

          {/* 7. Audio Speed */}
          <section>
            <label
              style={{
                fontSize: '0.95rem',
                fontWeight: '700',
                color: 'var(--text-main)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '10px',
              }}
            >
              <Volume2 size={18} color="var(--primary)" />
              7. Audio Speed (Kecepatan Suara)
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
              {speedOptions.map((spd) => (
                <button
                  key={spd}
                  type="button"
                  onClick={() => setAudioSpeed(spd)}
                  style={{
                    padding: '10px 4px',
                    borderRadius: 'var(--radius-md)',
                    border: '1.5px solid',
                    borderColor: audioSpeed === spd ? 'var(--primary)' : 'var(--border-light)',
                    backgroundColor: audioSpeed === spd ? 'var(--primary)' : 'var(--bg-surface)',
                    color: audioSpeed === spd ? '#FFFFFF' : 'var(--text-main)',
                    fontWeight: '700',
                    fontSize: '0.9rem',
                    transition: 'var(--transition-smooth)',
                  }}
                  aria-pressed={audioSpeed === spd}
                >
                  {spd}x
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* Footer / Reset button */}
        <div
          style={{
            padding: '20px 24px',
            borderTop: '1.5px solid var(--border-light)',
            backgroundColor: 'var(--bg-surface)',
            position: 'sticky',
            bottom: 0,
            display: 'flex',
            gap: '12px',
          }}
        >
          <button
            type="button"
            onClick={resetSettings}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '12px',
              borderRadius: 'var(--radius-md)',
              border: '1.5px solid var(--border-light)',
              backgroundColor: 'var(--bg-subtle)',
              color: 'var(--text-main)',
              fontWeight: '700',
              fontSize: '0.95rem',
              transition: 'var(--transition-smooth)',
            }}
          >
            <RotateCcw size={16} />
            <span>Reset Settings</span>
          </button>
          <button
            type="button"
            onClick={closePanel}
            style={{
              flex: 1,
              padding: '12px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--primary)',
              color: '#FFFFFF',
              fontWeight: '700',
              fontSize: '0.95rem',
              transition: 'var(--transition-smooth)',
            }}
          >
            Simpan & Tutup
          </button>
        </div>
      </aside>
    </>
  );
};
