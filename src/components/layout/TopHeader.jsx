import React from 'react';
import { ChevronRight, ArrowLeft, Sliders, Sparkles, Volume2, Shield } from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { useAudio } from '../../context/AudioContext';
import { useLearningProgress } from '../../context/LearningProgressContext';

export const TopHeader = ({ currentView, onNavigate }) => {
  const { togglePanel } = useAccessibility();
  const { isPlaying, currentTitle } = useAudio();
  const { userProfile } = useLearningProgress();

  // Compute breadcrumb path based on currentView
  const getBreadcrumbs = () => {
    switch (currentView) {
      case 'landing':
        return [{ label: 'Home', id: 'landing' }];
      case 'dashboard':
        return [
          { label: 'Home', id: 'landing' },
          { label: 'Dashboard Siswa', id: 'dashboard' },
        ];
      case 'module':
        return [
          { label: 'Home', id: 'landing' },
          { label: 'Learning', id: 'module' },
          { label: 'Anti-Bullying Roadmap', id: 'module' },
        ];
      case 'lesson-1':
        return [
          { label: 'Home', id: 'landing' },
          { label: 'Learning', id: 'module' },
          { label: 'Anti-Bullying', id: 'module' },
          { label: '01. Jenis Bullying', id: 'lesson-1' },
        ];
      case 'lesson-2':
        return [
          { label: 'Home', id: 'landing' },
          { label: 'Learning', id: 'module' },
          { label: 'Anti-Bullying', id: 'module' },
          { label: '02. Pencegahan', id: 'lesson-2' },
        ];
      case 'lesson-3':
        return [
          { label: 'Home', id: 'landing' },
          { label: 'Learning', id: 'module' },
          { label: 'Anti-Bullying', id: 'module' },
          { label: '03. Self-Love & Menjaga Diri', id: 'lesson-3' },
        ];
      case 'activity':
        return [
          { label: 'Home', id: 'landing' },
          { label: 'Activities', id: 'activity' },
          { label: 'Pilih Tindakan Aman', id: 'activity' },
        ];
      case 'reflection':
        return [
          { label: 'Home', id: 'landing' },
          { label: 'Refleksi', id: 'reflection' },
          { label: 'Komitmen Diri', id: 'reflection' },
        ];
      case 'progress':
        return [
          { label: 'Home', id: 'landing' },
          { label: 'Progress Belajar', id: 'progress' },
        ];
      case 'audio-hub':
        return [
          { label: 'Home', id: 'landing' },
          { label: 'Audio Learning Hub', id: 'audio-hub' },
        ];
      case 'social-impact':
        return [
          { label: 'Home', id: 'landing' },
          { label: 'Dampak Sosial (Why AKSARA)', id: 'social-impact' },
        ];
      default:
        return [{ label: 'Home', id: 'landing' }];
    }
  };

  const breadcrumbs = getBreadcrumbs();
  const currentCrumb = breadcrumbs[breadcrumbs.length - 1];

  const handleMobileBack = () => {
    if (['lesson-1', 'lesson-2', 'lesson-3', 'activity', 'reflection'].includes(currentView)) {
      onNavigate('module');
    } else {
      onNavigate('landing');
    }
  };

  return (
    <header
      className="aksara-top-header hide-on-print"
      style={{
        height: '62px',
        backgroundColor: 'var(--bg-surface)',
        borderBottom: '1px solid var(--border-light)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        position: 'sticky',
        top: 0,
        zIndex: 550,
      }}
    >
      {/* Left: Desktop Breadcrumb / Mobile Back Link */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
        {/* Mobile View: Back arrow + page title */}
        <div
          className="mobile-only-breadcrumb"
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          {currentView !== 'landing' && (
            <button
              onClick={handleMobileBack}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--bg-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-main)',
              }}
              title="Kembali"
              aria-label="Kembali ke halaman sebelumnya"
            >
              <ArrowLeft size={18} />
            </button>
          )}
          <span
            style={{
              fontSize: '1rem',
              fontWeight: '800',
              color: 'var(--text-main)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '220px',
            }}
          >
            {currentCrumb.label}
          </span>
        </div>

        {/* Desktop View: Full Breadcrumbs */}
        <nav
          className="desktop-only-breadcrumb"
          aria-label="Breadcrumb"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.88rem',
          }}
        >
          {breadcrumbs.map((crumb, idx) => {
            const isLast = idx === breadcrumbs.length - 1;
            return (
              <React.Fragment key={crumb.id + idx}>
                {idx > 0 && <ChevronRight size={14} color="var(--text-light)" />}
                <button
                  onClick={() => onNavigate(crumb.id)}
                  style={{
                    color: isLast ? 'var(--primary)' : 'var(--text-muted)',
                    fontWeight: isLast ? '800' : '500',
                    cursor: isLast ? 'default' : 'pointer',
                    padding: '4px 6px',
                    borderRadius: 'var(--radius-sm)',
                  }}
                  disabled={isLast}
                >
                  {crumb.label}
                </button>
              </React.Fragment>
            );
          })}
        </nav>
      </div>

      {/* Right Controls: Audio Status, Accessibility shortcut, Student Chip */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
        {/* Audio playing mini indicator */}
        {isPlaying && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'var(--primary-light)',
              padding: '6px 12px',
              borderRadius: 'var(--radius-full)',
              color: 'var(--primary)',
              fontSize: '0.8rem',
              fontWeight: '700',
            }}
            className="hide-on-mobile"
          >
            <span className="audio-wave-bar" style={{ height: '10px' }} />
            <span className="audio-wave-bar" style={{ height: '14px' }} />
            <span>Sedang dibacakan</span>
          </div>
        )}

        {/* Global Accessibility Quick Button */}
        <button
          onClick={togglePanel}
          style={{
            minHeight: '40px',
            height: '40px',
            padding: '0 14px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--bg-subtle)',
            border: '1.5px solid var(--border-light)',
            color: 'var(--text-main)',
            fontSize: '0.85rem',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'var(--transition-smooth)',
          }}
          title="Buka Pengaturan Aksesibilitas (Reading & Display)"
        >
          <span>♿</span>
          <span className="hide-on-mobile">Aksesibilitas</span>
        </button>

        {/* Student Profile Avatar */}
        <div
          onClick={() => onNavigate('dashboard')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '4px 8px 4px 4px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--bg-subtle)',
            border: '1px solid var(--border-light)',
            cursor: 'pointer',
          }}
          title="Profil Siswa"
        >
          <span
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: 'var(--primary-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.15rem',
            }}
          >
            {userProfile.avatar}
          </span>
          <span
            className="hide-on-mobile"
            style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--text-main)', paddingRight: '4px' }}
          >
            {userProfile.name.split(' ')[0]}
          </span>
        </div>
      </div>
    </header>
  );
};
