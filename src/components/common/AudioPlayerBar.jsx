import React, { useState } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Square,
  Volume2,
  VolumeX,
  FileText,
  ChevronDown,
  ChevronUp,
  Maximize2,
  Minimize2,
  Sparkles,
} from 'lucide-react';
import { useAudio } from '../../context/AudioContext';
import { useAccessibility } from '../../context/AccessibilityContext';

export const AudioPlayerBar = () => {
  const {
    isPlaying,
    isPaused,
    currentTitle,
    currentText,
    progress,
    volume,
    setVolume,
    pause,
    resume,
    replay,
    stop,
  } = useAudio();

  const { audioSpeed, setAudioSpeed } = useAccessibility();
  const [showTranscript, setShowTranscript] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  // If no audio has ever been triggered, don't show the bar
  if (!currentText && !isPlaying) {
    return null;
  }

  const speedOptions = [0.75, 1, 1.25, 1.5];

  const toggleMute = () => {
    if (volume > 0) setVolume(0);
    else setVolume(1);
  };

  // Minimized floating pill
  if (isMinimized) {
    return (
      <div
        className="aksara-audio-bar hide-on-print"
        style={{
          position: 'fixed',
          bottom: '80px',
          left: '20px',
          zIndex: 890,
          backgroundColor: 'var(--bg-surface)',
          border: '2px solid var(--primary)',
          borderRadius: 'var(--radius-full)',
          padding: '8px 16px',
          boxShadow: 'var(--shadow-lg)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
          <span className="audio-wave-bar" />
          <span className="audio-wave-bar" />
          <span className="audio-wave-bar" />
        </div>
        <span style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--primary)' }}>
          {isPlaying && !isPaused ? 'Sedang Diputar...' : 'Audio Dijeda'}
        </span>
        <button
          onClick={() => setIsMinimized(false)}
          style={{ padding: '4px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}
          title="Buka Pemutar Penuh"
        >
          <Maximize2 size={16} />
        </button>
      </div>
    );
  }

  return (
    <div
      role="region"
      aria-label="Pemutar Audio Pembelajaran & Transkrip Tunarungu"
      className="aksara-audio-bar hide-on-print"
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'calc(100% - 32px)',
        maxWidth: '820px',
        zIndex: 900,
        backgroundColor: 'var(--bg-surface)',
        border: '2px solid var(--primary)',
        borderRadius: 'var(--radius-xl)',
        padding: '16px 20px',
        boxShadow: '0 12px 36px rgba(37, 40, 61, 0.22)',
        backdropFilter: 'blur(12px)',
        transition: 'var(--transition-smooth)',
        boxSizing: 'border-box',
      }}
    >
      {/* 1. Header Row: Audio Status, Title, Transcript Toggle & Controls */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '10px',
          flexWrap: 'wrap',
          gap: '8px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              backgroundColor: 'var(--primary-light)',
              padding: '4px 10px',
              borderRadius: 'var(--radius-full)',
              flexShrink: 0,
            }}
          >
            {isPlaying && !isPaused ? (
              <>
                <span className="audio-wave-bar" style={{ height: '12px' }} />
                <span className="audio-wave-bar" style={{ height: '16px' }} />
                <span className="audio-wave-bar" style={{ height: '10px' }} />
                <span
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: '800',
                    color: 'var(--primary)',
                    marginLeft: '4px',
                  }}
                >
                  Sedang diputar
                </span>
              </>
            ) : (
              <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)' }}>
                ⏸️ Audio Dijeda
              </span>
            )}
          </div>

          <span
            style={{
              fontSize: '0.95rem',
              fontWeight: '800',
              color: 'var(--text-main)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '300px',
            }}
          >
            {currentTitle || 'Narasi Pembelajaran'}
          </span>
        </div>

        {/* Right Action: Transcript toggle (Section 8) & Minimize / Close */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Transcript toggle button specifically for Tunarungu / Hearing impaired */}
          <button
            onClick={() => setShowTranscript(!showTranscript)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              padding: '6px 12px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: showTranscript ? 'var(--secondary)' : 'var(--bg-subtle)',
              color: showTranscript ? '#04422D' : 'var(--text-main)',
              fontSize: '0.82rem',
              fontWeight: '700',
              border: '1px solid var(--border-light)',
            }}
            title="Tampilkan teks transkrip untuk tunarungu atau kenyamanan membaca"
            aria-expanded={showTranscript}
          >
            <FileText size={15} />
            <span>{showTranscript ? 'Tutup Transkrip' : 'Lihat Teks Audio'}</span>
            {showTranscript ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>

          <button
            onClick={() => setIsMinimized(true)}
            style={{ padding: '6px', color: 'var(--text-muted)' }}
            title="Kecilkan Pemutar"
            aria-label="Kecilkan pemutar audio"
          >
            <Minimize2 size={16} />
          </button>

          <button
            onClick={stop}
            style={{ padding: '6px', color: 'var(--danger)' }}
            title="Hentikan Audio"
            aria-label="Hentikan audio"
          >
            <Square size={16} />
          </button>
        </div>
      </div>

      {/* 2. Visual Progress Bar */}
      <div
        style={{
          width: '100%',
          height: '6px',
          backgroundColor: 'var(--bg-subtle)',
          borderRadius: 'var(--radius-full)',
          overflow: 'hidden',
          marginBottom: '12px',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${progress}%`,
            backgroundColor: 'var(--primary)',
            transition: 'width 0.2s linear',
          }}
        />
      </div>

      {/* 3. Controls Row: Play/Pause, Replay, Volume, Speed */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        {/* Playback Buttons (touch target 44px) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {isPlaying && !isPaused ? (
            <button
              onClick={pause}
              style={{
                backgroundColor: 'var(--primary)',
                color: '#FFFFFF',
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'var(--shadow-sm)',
              }}
              title="Jeda narasi"
              aria-label="Jeda narasi audio"
            >
              <Pause size={18} />
            </button>
          ) : (
            <button
              onClick={resume}
              style={{
                backgroundColor: 'var(--primary)',
                color: '#FFFFFF',
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'var(--shadow-sm)',
              }}
              title="Lanjutkan narasi"
              aria-label="Lanjutkan narasi audio"
            >
              <Play size={18} style={{ marginLeft: '2px' }} />
            </button>
          )}

          <button
            onClick={replay}
            style={{
              backgroundColor: 'var(--bg-subtle)',
              color: 'var(--text-main)',
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid var(--border-light)',
            }}
            title="Putar ulang dari awal"
            aria-label="Putar ulang narasi"
          >
            <RotateCcw size={16} />
          </button>

          <button
            onClick={toggleMute}
            style={{
              backgroundColor: 'var(--bg-subtle)',
              color: 'var(--text-main)',
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid var(--border-light)',
            }}
            title={volume === 0 ? 'Buka suara' : 'Bisukan suara'}
            aria-label="Pengaturan suara"
          >
            {volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
        </div>

        {/* Speed Pills (Section C) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)' }}>
            Kecepatan:
          </span>
          {speedOptions.map((spd) => (
            <button
              key={spd}
              onClick={() => setAudioSpeed(spd)}
              style={{
                padding: '4px 10px',
                minHeight: '34px',
                fontSize: '0.8rem',
                fontWeight: '800',
                borderRadius: 'var(--radius-full)',
                border: '1.5px solid',
                borderColor: audioSpeed === spd ? 'var(--primary)' : 'var(--border-light)',
                backgroundColor: audioSpeed === spd ? 'var(--primary-light)' : 'transparent',
                color: audioSpeed === spd ? 'var(--primary)' : 'var(--text-muted)',
                transition: 'var(--transition-smooth)',
              }}
              aria-label={`Atur kecepatan audio ke ${spd}x`}
            >
              {spd}x
            </button>
          ))}
        </div>
      </div>

      {/* 4. Transkrip Teks Audio (Khusus untuk Tunarungu & Pembaca Visual - Section 8) */}
      {showTranscript && (
        <div
          style={{
            marginTop: '14px',
            padding: '14px 16px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--bg-subtle)',
            border: '1.5px solid var(--border-light)',
            animation: 'fadeIn 0.2s ease',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.75rem',
              fontWeight: '800',
              color: 'var(--primary)',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              marginBottom: '6px',
            }}
          >
            <FileText size={14} />
            <span>Transkrip Teks Suara (Aksesibel Tunarungu)</span>
          </div>
          <p
            style={{
              fontSize: '0.95rem',
              lineHeight: '1.6',
              color: 'var(--text-main)',
              fontWeight: '500',
            }}
          >
            "{currentText}"
          </p>
        </div>
      )}
    </div>
  );
};
