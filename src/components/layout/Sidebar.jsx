import React from 'react';
import {
  Home,
  BookOpen,
  Volume2,
  Target,
  Award,
  Sliders,
  Settings,
  HelpCircle,
  Sparkles,
} from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { useLearningProgress } from '../../context/LearningProgressContext';

export const Sidebar = ({ currentView, onNavigate, onOpenSettings, onOpenHelp }) => {
  const { togglePanel } = useAccessibility();
  const { userProfile, progressPercent } = useLearningProgress();

  // Primary 5 Navigation items (Section 2)
  const primaryMenuItems = [
    { id: 'landing', label: 'Home', icon: Home, badge: null },
    {
      id: 'module',
      label: 'Learning',
      icon: BookOpen,
      badge: '5 Bab',
      activeAliases: ['module', 'lesson-1', 'lesson-2', 'lesson-3'],
    },
    { id: 'audio-hub', label: 'Audio', icon: Volume2, badge: 'Narasi' },
    { id: 'activity', label: 'Activities', icon: Target, badge: 'Kuis' },
    { id: 'progress', label: 'Progress', icon: Award, badge: `${progressPercent}%` },
  ];

  // Secondary items
  const secondaryMenuItems = [
    {
      id: 'accessibility',
      label: 'Accessibility',
      icon: Sliders,
      isEmoji: true,
      emoji: '♿',
      action: togglePanel,
      highlight: true,
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      action: onOpenSettings,
    },
    {
      id: 'help',
      label: 'Help',
      icon: HelpCircle,
      action: onOpenHelp,
    },
  ];

  const handleMenuClick = (item) => {
    if (item.action) {
      item.action();
    } else {
      onNavigate(item.id);
    }
  };

  const isItemActive = (item) => {
    if (item.activeAliases) {
      return item.activeAliases.includes(currentView);
    }
    return currentView === item.id;
  };

  return (
    <aside
      className="aksara-sidebar hide-on-print"
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'var(--bg-surface)',
        borderRight: '1.5px solid var(--border-light)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '24px 16px',
        boxSizing: 'border-box',
        overflowY: 'auto',
      }}
    >
      {/* Top Block: AKSARA Brand Logo + Primary Nav */}
      <div>
        {/* AKSARA Brand Logo Container */}
        <div
          onClick={() => onNavigate('landing')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '4px 8px 24px',
            cursor: 'pointer',
            userSelect: 'none',
            borderBottom: '1px solid var(--border-light)',
            marginBottom: '20px',
          }}
          title="Beranda AKSARA"
        >
          <div
            style={{
              width: '44px',
              height: '44px',
              minWidth: '44px',
              borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              fontWeight: '900',
              fontSize: '1.35rem',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            A
          </div>
          <div className="aksara-logo-text" style={{ overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span
                style={{
                  fontSize: '1.3rem',
                  fontWeight: '900',
                  color: 'var(--text-main)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                }}
              >
                AKSARA
              </span>
              <span
                style={{
                  backgroundColor: 'var(--primary-light)',
                  color: 'var(--primary)',
                  fontSize: '0.65rem',
                  fontWeight: '800',
                  padding: '2px 6px',
                  borderRadius: 'var(--radius-full)',
                }}
              >
                LMS
              </span>
            </div>
            <p
              style={{
                fontSize: '0.72rem',
                color: 'var(--text-muted)',
                lineHeight: 1.2,
                marginTop: '2px',
                whiteSpace: 'nowrap',
              }}
            >
              Adaptive Learning System
            </p>
          </div>
        </div>

        {/* Primary Navigation Menu List (Consistent 48px Touch Target) */}
        <nav
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
          }}
          aria-label="Navigasi Utama"
        >
          {primaryMenuItems.map((item) => {
            const Icon = item.icon;
            const active = isItemActive(item);

            return (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item)}
                className={`sidebar-nav-btn ${active ? 'sidebar-btn-active' : ''}`}
                style={{
                  width: '100%',
                  minHeight: 'var(--touch-target)',
                  height: 'var(--touch-target)',
                  padding: '0 14px',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: active ? 'var(--primary-light)' : 'transparent',
                  color: active ? 'var(--primary)' : 'var(--text-main)',
                  border: active ? '1.5px solid rgba(91, 95, 239, 0.3)' : '1.5px solid transparent',
                  position: 'relative',
                  transition: 'var(--transition-smooth)',
                  fontWeight: active ? '800' : '600',
                  fontSize: '0.95rem',
                  boxSizing: 'border-box',
                }}
                title={item.label}
                aria-current={active ? 'page' : undefined}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                  {/* Active Indicator Bar on Left */}
                  {active && (
                    <span
                      style={{
                        position: 'absolute',
                        left: '0',
                        top: '8px',
                        bottom: '8px',
                        width: '4px',
                        backgroundColor: 'var(--primary)',
                        borderRadius: '0 4px 4px 0',
                      }}
                    />
                  )}
                  <Icon
                    size={20}
                    color={active ? 'var(--primary)' : 'var(--text-muted)'}
                    strokeWidth={active ? 2.5 : 2}
                    style={{ flexShrink: 0 }}
                  />
                  <span className="sidebar-label" style={{ whiteSpace: 'nowrap' }}>
                    {item.label}
                  </span>
                </div>

                {item.badge && (
                  <span
                    className="sidebar-badge"
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: '800',
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: active ? 'var(--primary)' : 'var(--bg-subtle)',
                      color: active ? '#FFFFFF' : 'var(--text-muted)',
                      flexShrink: 0,
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Block: Divider + Accessibility, Settings, Help + Student Profile */}
      <div style={{ marginTop: '20px' }}>
        <div
          style={{
            height: '1px',
            backgroundColor: 'var(--border-light)',
            margin: '0 4px 16px',
          }}
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {secondaryMenuItems.map((item) => {
            const Icon = item.icon;
            const isHighlight = item.highlight;

            return (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item)}
                className="sidebar-nav-btn"
                style={{
                  width: '100%',
                  minHeight: 'var(--touch-target)',
                  height: 'var(--touch-target)',
                  padding: '0 14px',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  backgroundColor: isHighlight ? 'var(--secondary-light)' : 'transparent',
                  color: isHighlight ? '#044E36' : 'var(--text-muted)',
                  border: isHighlight ? '1.5px solid rgba(108, 197, 163, 0.4)' : '1.5px solid transparent',
                  transition: 'var(--transition-smooth)',
                  fontWeight: isHighlight ? '800' : '600',
                  fontSize: '0.92rem',
                }}
                title={item.label}
              >
                {item.isEmoji ? (
                  <span style={{ fontSize: '1.25rem', lineHeight: 1 }}>{item.emoji}</span>
                ) : (
                  <Icon size={20} strokeWidth={2} style={{ flexShrink: 0 }} />
                )}
                <span className="sidebar-label" style={{ whiteSpace: 'nowrap' }}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Small Learner Profile Mini Card */}
        <div
          onClick={() => onNavigate('dashboard')}
          className="sidebar-learner-card"
          style={{
            marginTop: '16px',
            padding: '10px 12px',
            backgroundColor: 'var(--bg-subtle)',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
            transition: 'var(--transition-smooth)',
          }}
          title="Buka Dasbor Siswa"
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              minWidth: '36px',
              borderRadius: '50%',
              backgroundColor: 'var(--primary-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.3rem',
            }}
          >
            {userProfile.avatar}
          </div>
          <div style={{ lineHeight: 1.2, overflow: 'hidden' }}>
            <div
              style={{
                fontSize: '0.85rem',
                fontWeight: '800',
                color: 'var(--text-main)',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
              }}
            >
              {userProfile.name}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--primary)', fontWeight: '700' }}>
              {progressPercent}% Belajar
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
