import React, { createContext, useContext, useState, useEffect } from 'react';

const AccessibilityContext = createContext();

const SETTINGS_KEY = 'aksara_accessibility_prefs_v1';

export const AccessibilityProvider = ({ children }) => {
  const getInitialSettings = () => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(SETTINGS_KEY);
        if (saved) return JSON.parse(saved);
      } catch (e) {
        console.warn('Gagal membaca preferensi aksesibilitas:', e);
      }
    }
    return null;
  };

  const initial = getInitialSettings();

  // text size: 'small', 'medium', 'large', 'xlarge'
  const [textSize, setTextSize] = useState(initial?.textSize || 'medium');
  // line spacing: 'normal', 'relaxed', 'wide'
  const [lineSpacing, setLineSpacing] = useState(initial?.lineSpacing || 'normal');
  // letter spacing: 'normal', 'medium', 'wide'
  const [letterSpacing, setLetterSpacing] = useState(initial?.letterSpacing || 'normal');
  // reading mode: 'standard', 'easy', 'focus'
  const [readingMode, setReadingMode] = useState(initial?.readingMode || 'standard');
  // contrast: 'normal', 'high'
  const [contrastMode, setContrastMode] = useState(initial?.contrastMode || 'normal');
  // font: 'standard', 'dyslexic'
  const [fontMode, setFontMode] = useState(initial?.fontMode || 'standard');
  // audio speed: 0.75, 1, 1.25, 1.5
  const [audioSpeed, setAudioSpeed] = useState(initial?.audioSpeed || 1);
  // panel open/close
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  // Save settings to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const payload = {
          textSize,
          lineSpacing,
          letterSpacing,
          readingMode,
          contrastMode,
          fontMode,
          audioSpeed,
        };
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(payload));
      } catch (e) {
        console.warn('Gagal menyimpan preferensi aksesibilitas:', e);
      }
    }
  }, [textSize, lineSpacing, letterSpacing, readingMode, contrastMode, fontMode, audioSpeed]);

  // Apply changes to document.body and root CSS variables
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    // Font size scale
    const scaleMap = {
      small: 0.9,
      medium: 1.0,
      large: 1.18,
      xlarge: 1.35,
    };
    root.style.setProperty('--aksara-scale', scaleMap[textSize] || 1.0);

    // Line spacing
    const lineSpacingMap = {
      normal: '1.6',
      relaxed: '1.9',
      wide: '2.3',
    };
    root.style.setProperty('--aksara-line-height', lineSpacingMap[lineSpacing] || '1.6');

    // Letter spacing
    const letterSpacingMap = {
      normal: 'normal',
      medium: '0.04em',
      wide: '0.09em',
    };
    root.style.setProperty('--aksara-letter-spacing', letterSpacingMap[letterSpacing] || 'normal');

    // Font family
    if (fontMode === 'dyslexic') {
      root.style.setProperty('--aksara-font-family', "'Lexend', 'OpenDyslexic', sans-serif");
    } else {
      root.style.setProperty('--aksara-font-family', "'Plus Jakarta Sans', system-ui, sans-serif");
    }

    // High Contrast class
    if (contrastMode === 'high') {
      body.classList.add('high-contrast');
    } else {
      body.classList.remove('high-contrast');
    }

    // Reading Modes class
    body.classList.remove('mode-easy', 'mode-focus');
    if (readingMode === 'easy') {
      body.classList.add('mode-easy');
    } else if (readingMode === 'focus') {
      body.classList.add('mode-focus');
    }
  }, [textSize, lineSpacing, letterSpacing, readingMode, contrastMode, fontMode]);

  const resetSettings = () => {
    setTextSize('medium');
    setLineSpacing('normal');
    setLetterSpacing('normal');
    setReadingMode('standard');
    setContrastMode('normal');
    setFontMode('standard');
    setAudioSpeed(1);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(SETTINGS_KEY);
    }
  };

  const togglePanel = () => setIsPanelOpen((prev) => !prev);
  const closePanel = () => setIsPanelOpen(false);

  return (
    <AccessibilityContext.Provider
      value={{
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
        isPanelOpen,
        setIsPanelOpen,
        togglePanel,
        closePanel,
        resetSettings,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider');
  }
  return context;
};
