import React, { useState } from 'react';
import {
  Menu,
  X,
  Sliders,
  Sparkles,
  BookOpen,
  LayoutDashboard,
  Home,
  Award,
  Heart,
  Volume2,
} from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { useLearningProgress } from '../../context/LearningProgressContext';

export const Navbar = ({ currentView, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { togglePanel } = useAccessibility();
  const { userProfile, progressPercent } = useLearningProgress();

  const navLinks = [
    { id: 'landing', label: 'Beranda', icon: Home },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'module', label: 'Modul Belajar', icon: BookOpen },
    { id: 'progress', label: 'Progress & Sertifikat', icon: Award },
    { id: 'social-impact', label: 'Dampak Sosial', icon: Heart },
  ];

  const handleNavClick = (id) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderBottom: '1.5px solid var(--border-light)',
        position: 'sticky',
        top: 0,
        zIndex: 700,
        transition: 'var(--transition-smooth)',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '14px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Brand Logo */}
        <div
          onClick={() => handleNavClick('landing')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer',
            userSelect: 'none',
          }}
        >
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              fontWeight: '900',
              fontSize: '1.3rem',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            A
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  fontSize: '1.4rem',
                  fontWeight: '800',
                  color: 'var(--text-main)',
                  letterSpacing: '-0.02em',
                }}
              >
                AKSARA
              </span>
              <span
                style={{
                  backgroundColor: 'var(--primary-light)',
                  color: 'var(--primary)',
                  fontSize: '0.68rem',
                  fontWeight: '800',
                  padding: '2px 8px',
                  borderRadius: 'var(--radius-full)',
                  letterSpacing: '0.04em',
                }}
              >
                INCLUSIVE LMS
              </span>
            </div>
            <p
              style={{
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                lineHeight: 1.1,
                display: 'none',
              }}
              className="lg-show-tagline"
            >
              Adaptive Learning System
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
          className="desktop-nav"
        >
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  borderRadius: 'var(--radius-md)',
                  fontWeight: '600',
                  fontSize: '0.9rem',
                  color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                  backgroundColor: isActive ? 'var(--primary-light)' : 'transparent',
                  transition: 'var(--transition-smooth)',
                }}
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Student profile & Accessibility toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Accessibility button */}
          <button
            onClick={togglePanel}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: 'var(--radius-full)',
              border: '1.5px solid var(--border-light)',
              backgroundColor: 'var(--bg-subtle)',
              color: 'var(--text-main)',
              fontSize: '0.85rem',
              fontWeight: '700',
              transition: 'var(--transition-smooth)',
            }}
            title="Buka Pengaturan Aksesibilitas"
          >
            <span>♿</span>
            <span className="hide-on-mobile">Aksesibilitas</span>
          </button>

          {/* Student Profile Pill */}
          <div
            onClick={() => handleNavClick('dashboard')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 12px 6px 8px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--bg-subtle)',
              border: '1px solid var(--border-light)',
              cursor: 'pointer',
            }}
            title="Buka Dashboard Siswa"
          >
            <span
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                backgroundColor: 'var(--primary-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.1rem',
              }}
            >
              {userProfile.avatar}
            </span>
            <div style={{ lineHeight: 1.1 }}>
              <div style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-main)' }}>
                {userProfile.name.split(' ')[0]}
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--primary)', fontWeight: '600' }}>
                {progressPercent}% Belajar
              </div>
            </div>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              padding: '8px',
              color: 'var(--text-main)',
              display: 'none',
            }}
            className="mobile-menu-btn"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          style={{
            padding: '16px 24px',
            backgroundColor: 'var(--bg-surface)',
            borderTop: '1px solid var(--border-light)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
          className="mobile-dropdown"
        >
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  fontWeight: '600',
                  color: isActive ? 'var(--primary)' : 'var(--text-main)',
                  backgroundColor: isActive ? 'var(--primary-light)' : 'transparent',
                  textAlign: 'left',
                }}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
