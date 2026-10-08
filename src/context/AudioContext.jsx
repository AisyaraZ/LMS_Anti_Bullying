import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useAccessibility } from './AccessibilityContext';

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const { audioSpeed } = useAccessibility();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const [currentTitle, setCurrentTitle] = useState('');
  const [activeAudioId, setActiveAudioId] = useState(null);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [soundEffectsEnabled, setSoundEffectsEnabled] = useState(true);

  const utteranceRef = useRef(null);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);
  const estimatedDurationRef = useRef(5000);
  const voicesRef = useRef([]);

  // Load voices asynchronously
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const updateVoices = () => {
        voicesRef.current = window.speechSynthesis.getVoices();
      };
      updateVoices();
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }
  }, []);

  // Web Audio API soft tactile chime sounds
  const playChime = (type = 'success') => {
    if (!soundEffectsEnabled || typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;

      if (type === 'success') {
        // Joyful major chord chime: C5 -> E5 -> G5
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(659.25, now + 0.1);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
        osc.start(now);
        osc.stop(now + 0.45);
      } else if (type === 'complete') {
        // Celebratory fanfare
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.setValueAtTime(554.37, now + 0.12);
        osc.frequency.setValueAtTime(659.25, now + 0.24);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
        osc.start(now);
        osc.stop(now + 0.6);
      } else if (type === 'click') {
        // Soft tactile click
        osc.type = 'sine';
        osc.frequency.setValueAtTime(380, now);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      }
    } catch (e) {
      // AudioContext muted/unsupported
    }
  };

  // Stop audio
  const stop = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsPlaying(false);
    setIsPaused(false);
    setProgress(0);
    setActiveAudioId(null);
  };

  const pause = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.pause();
    }
    setIsPaused(true);
  };

  const resume = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.resume();
    }
    setIsPaused(false);
  };

  const replay = () => {
    if (currentText) {
      speak(currentText, currentTitle, activeAudioId);
    }
  };

  const speak = (text, title = 'Narasi Pelajaran', audioId = 'default') => {
    stop();
    playChime('click');

    setCurrentText(text);
    setCurrentTitle(title);
    setActiveAudioId(audioId);
    setIsPlaying(true);
    setIsPaused(false);
    setProgress(0);

    const wordCount = text.split(/\s+/).length;
    const wordsPerSecond = (140 / 60) * audioSpeed;
    const estimatedDurationMs = Math.max(3000, (wordCount / wordsPerSecond) * 1000);
    estimatedDurationRef.current = estimatedDurationMs;
    startTimeRef.current = Date.now();

    // Progress bar updater
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const currentPct = Math.min(100, Math.round((elapsed / estimatedDurationRef.current) * 100));
      setProgress(currentPct);
      if (currentPct >= 100) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }, 100);

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = audioSpeed;
        utterance.volume = volume;

        // Try selecting Indonesian voice
        const voices = voicesRef.current.length > 0 ? voicesRef.current : window.speechSynthesis.getVoices();
        const idVoice = voices.find((v) => v.lang.startsWith('id') || v.lang.includes('ID') || v.name.toLowerCase().includes('indonesia'));
        if (idVoice) {
          utterance.voice = idVoice;
        }

        utterance.onend = () => {
          setIsPlaying(false);
          setIsPaused(false);
          setProgress(100);
          if (intervalRef.current) clearInterval(intervalRef.current);
        };

        utterance.onerror = () => {
          setTimeout(() => {
            setIsPlaying(false);
            setIsPaused(false);
            setProgress(100);
            if (intervalRef.current) clearInterval(intervalRef.current);
          }, estimatedDurationMs);
        };

        utteranceRef.current = utterance;
        window.speechSynthesis.speak(utterance);
      } catch (e) {
        console.warn('Speech synthesis fallback:', e);
      }
    } else {
      setTimeout(() => {
        setIsPlaying(false);
        setIsPaused(false);
        setProgress(100);
        if (intervalRef.current) clearInterval(intervalRef.current);
      }, estimatedDurationMs);
    }
  };

  useEffect(() => {
    if (isPlaying && currentText) {
      speak(currentText, currentTitle, activeAudioId);
    }
  }, [audioSpeed]);

  useEffect(() => {
    return () => {
      stop();
    };
  }, []);

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        isPaused,
        currentText,
        currentTitle,
        activeAudioId,
        progress,
        volume,
        setVolume,
        soundEffectsEnabled,
        setSoundEffectsEnabled,
        playChime,
        speak,
        pause,
        resume,
        stop,
        replay,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within AudioProvider');
  }
  return context;
};
