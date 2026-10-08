import React from 'react';
import { Home, BookOpen, Volume2, Target, Award } from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';

export const BottomNav = ({ currentView, onNavigate }) => {
  const { togglePanel } = useAccessibility();

  // Exactly 5 clean, focused menu items (Section 3)
  const navItems = [
    { id: 'landing', label: 'Home', icon: Home, aliases: ['landing'] },
    { id: 'module', label: 'Learn', icon: BookOpen, aliases: ['module', 'lesson-1', 'lesson-2', 'lesson-3'] },
    { id: 'audio-hub', label: 'Audio', icon: Volume2, aliases: ['audio-hub'] },
    { id: 'activity', label: 'Activity', icon: Target, aliases: ['activity', 'reflection'] },
    { id: 'progress', label: 'Progress', icon: Award, aliases: ['progress'] },
  ];

  return (
    <nav
      className="mobile-bottom-nav hide-on-print"
      role="navigation"
      aria-label="Navigasi Seluler Bawah"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '68px',
        backgroundColor: 'var(--bg-surface)',
        borderTop: '1.5px solid var(--border-light)',
        display: 'none', // Shown on mobile via CSS media query
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '0 8px calc(env(safe-area-inset-bottom, 0px))',
        zIndex: 850,
        boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.08)',
        boxSizing: 'border-box',
      }}
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = item.aliases.includes(currentView);

        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            style={{
              flex: 1,
              height: '100%',
              minHeight: '48px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              color: isActive ? 'var(--primary)' : 'var(--text-muted)',
              backgroundColor: 'transparent',
              position: 'relative',
              transition: 'var(--transition-smooth)',
              border: 'none',
              padding: '6px 0',
            }}
            aria-current={isActive ? 'page' : undefined}
          >
            {/* Top Indicator bar for active state */}
            {isActive && (
              <span
                style={{
                  position: 'absolute',
                  top: 0,
                  width: '32px',
                  height: '3px',
                  backgroundColor: 'var(--primary)',
                  borderRadius: '0 0 4px 4px',
                }}
              />
            )}
            <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: isActive ? '800' : '600',
                letterSpacing: '-0.01em',
              }}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
