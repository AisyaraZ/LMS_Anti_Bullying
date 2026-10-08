import React from 'react';
import { Volume2, Square, Pause, Play } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';
import { useLearningProgress } from '../../context/LearningProgressContext';

export const AudioListenButton = ({
  text,
  title = 'Narasi Materi',
  audioId,
  size = 'md',
  variant = 'primary',
  className = '',
}) => {
  const { isPlaying, isPaused, activeAudioId, speak, stop, pause, resume } = useAudio();
  const { recordAudioListen } = useLearningProgress();

  const isCurrent = activeAudioId === audioId;
  const isCurrentlySpeaking = isCurrent && isPlaying && !isPaused;

  const handleClick = (e) => {
    e.stopPropagation();
    if (isCurrentlySpeaking) {
      stop();
    } else if (isCurrent && isPaused) {
      resume();
    } else {
      speak(text, title, audioId);
      recordAudioListen(audioId);
    }
  };

  const getStyle = () => {
    if (isCurrentlySpeaking) {
      return {
        backgroundColor: 'var(--primary)',
        color: '#FFFFFF',
        borderColor: 'var(--primary)',
        boxShadow: '0 0 0 3px var(--primary-glow)',
      };
    }
    if (variant === 'accent') {
      return {
        backgroundColor: 'var(--accent-light)',
        color: '#7A4D05',
        borderColor: 'var(--accent)',
      };
    }
    return {
      backgroundColor: 'var(--primary-light)',
      color: 'var(--primary)',
      borderColor: 'rgba(91, 95, 239, 0.3)',
    };
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: size === 'sm' ? '6px 12px' : '10px 18px',
        fontSize: size === 'sm' ? '0.875rem' : '0.95rem',
        fontWeight: '600',
        borderRadius: 'var(--radius-full)',
        border: '1.5px solid',
        cursor: 'pointer',
        transition: 'var(--transition-smooth)',
        ...getStyle(),
      }}
      className={`aksara-audio-trigger ${isCurrentlySpeaking ? 'animate-glow' : ''} ${className}`}
      aria-label={isCurrentlySpeaking ? `Hentikan narasi ${title}` : `Dengarkan narasi ${title}`}
      title={isCurrentlySpeaking ? 'Klik untuk berhenti mendengar' : 'Klik untuk mendengarkan audio'}
    >
      {isCurrentlySpeaking ? (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
            <span className="audio-wave-bar" style={{ backgroundColor: '#FFFFFF', height: '12px' }} />
            <span className="audio-wave-bar" style={{ backgroundColor: '#FFFFFF', height: '16px' }} />
            <span className="audio-wave-bar" style={{ backgroundColor: '#FFFFFF', height: '10px' }} />
          </div>
          <span>Sedang dibacakan...</span>
        </>
      ) : (
        <>
          <Volume2 size={size === 'sm' ? 16 : 18} />
          <span>Dengarkan</span>
        </>
      )}
    </button>
  );
};
