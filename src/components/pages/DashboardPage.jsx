import React from 'react';
import {
  BookOpen,
  Headphones,
  Award,
  Sparkles,
  ArrowRight,
  Clock,
  Target,
  Sliders,
} from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { ProgressBar } from '../common/ProgressBar';
import { AudioListenButton } from '../common/AudioListenButton';
import { useLearningProgress } from '../../context/LearningProgressContext';
import { useAccessibility } from '../../context/AccessibilityContext';

export const DashboardPage = ({ onNavigate, onOpenSettings }) => {
  const {
    userProfile,
    progressPercent,
    completedLessons,
    listenedAudiosCount,
    achievements,
  } = useLearningProgress();
  const { togglePanel } = useAccessibility();

  const dashboardGreeting = `Selamat datang kembali, ${userProfile.name}! Hari ini kita melanjutkan perjalanan belajar anti-bullying dengan aman dan penuh percaya diri.`;

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', width: '100%' }}>
      {/* Welcome Header & Profile Card */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '28px',
        }}
      >
        <div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 12px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--secondary-light)',
              color: '#064E3B',
              fontSize: '0.82rem',
              fontWeight: '800',
              marginBottom: '8px',
            }}
          >
            <Sparkles size={14} />
            <span>Ruang Belajar Mandiri & Inklusif</span>
          </div>
          <h1
            style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 2.3rem)',
              fontWeight: '900',
              color: 'var(--text-main)',
              lineHeight: 1.2,
              margin: '0 0 4px',
            }}
          >
            Selamat datang, {userProfile.name}! 👋
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', margin: 0 }}>
            Lanjutkan perjalanan belajarmu dengan cara yang nyaman dan menyenangkan.
          </p>
        </div>

        {/* Profile Card & Avatar */}
        <div
          onClick={onOpenSettings}
          style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1.5px solid var(--border-light)',
            borderRadius: 'var(--radius-lg)',
            padding: '12px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: 'var(--shadow-sm)',
            cursor: 'pointer',
          }}
          title="Klik untuk ubah avatar dan nama"
        >
          <div
            style={{
              fontSize: '2rem',
              backgroundColor: 'var(--primary-light)',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid var(--primary)',
            }}
          >
            {userProfile.avatar}
          </div>
          <div>
            <div style={{ fontWeight: '800', fontSize: '0.95rem', color: 'var(--text-main)' }}>
              {userProfile.name}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              {userProfile.grade} • Ganti Avatar ⚙️
            </div>
          </div>
        </div>
      </div>

      {/* Audio greeting banner */}
      <div
        style={{
          backgroundColor: 'var(--primary-light)',
          borderRadius: 'var(--radius-lg)',
          padding: '14px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '28px',
          border: '1.5px solid rgba(91, 95, 239, 0.25)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '1.4rem' }}>🔊</span>
          <div>
            <div style={{ fontSize: '0.9rem', fontWeight: '800', color: 'var(--primary)' }}>
              Sapaan Suara Hari Ini
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>
              "{dashboardGreeting}"
            </div>
          </div>
        </div>
        <AudioListenButton text={dashboardGreeting} title="Sapaan Dasbor" audioId="dashboard-greet" size="sm" />
      </div>

      {/* Progress & Continue Section (Grid) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
          marginBottom: '32px',
        }}
      >
        {/* Your Learning Journey Card */}
        <Card padded variant="default" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ backgroundColor: 'var(--secondary-light)', color: 'var(--secondary)', padding: '6px', borderRadius: 'var(--radius-sm)' }}>
                  <Award size={18} />
                </div>
                <h2 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-main)', margin: 0 }}>
                  Your Learning Journey
                </h2>
              </div>
              <span style={{ fontSize: '0.82rem', fontWeight: '800', color: 'var(--primary)' }}>
                {completedLessons.length} of 5 lessons completed
              </span>
            </div>

            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Dedikasi belajarmu sangat baik dalam memahami cara saling menghargai dan menjaga diri.
            </p>

            <ProgressBar
              value={progressPercent}
              max={100}
              label="Progres Modul Anti-Bullying"
              sublabel={`🌟 ${completedLessons.length} dari 3 Bab Utama Selesai.`}
              color="var(--secondary)"
              height="14px"
            />
          </div>

          <div style={{ marginTop: '20px', paddingTop: '14px', borderTop: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Lencana: <strong>{achievements.filter((a) => a.unlocked).length} / 4</strong>
            </span>
            <Button size="sm" variant="tertiary" onClick={() => onNavigate('progress')}>
              Lihat Rapor Belajar
            </Button>
          </div>
        </Card>

        {/* Continue Learning Card */}
        <Card padded variant="primary" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '3px 8px',
                backgroundColor: 'var(--accent)',
                color: '#3B2400',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.72rem',
                fontWeight: '800',
                textTransform: 'uppercase',
                marginBottom: '10px',
              }}
            >
              <Clock size={12} />
              Continue Learning
            </div>

            <div style={{ fontSize: '0.82rem', color: 'var(--primary)', fontWeight: '800', marginBottom: '2px' }}>
              Anti-Bullying • Modul Inti
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: 'var(--text-main)', margin: '0 0 8px' }}>
              Lesson 3 — Self-Love & Protecting Yourself
            </h3>

            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.5', margin: '0 0 16px' }}>
              Pelajari bagaimana menyayangi dirimu, mengetahui bahwa kamu berharga, dan berani berkata tidak ketika tidak nyaman.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <Button
              size="md"
              variant="primary"
              icon={ArrowRight}
              iconPosition="right"
              onClick={() => onNavigate('lesson-3')}
            >
              Lanjutkan (Continue)
            </Button>
            <AudioListenButton
              text="Lesson 3: Sayangi dan Jaga Dirimu. Kamu berharga, berhak merasa aman, dan boleh berkata tidak."
              title="Ringkasan Lesson 3"
              audioId="dash-cont-lesson"
              size="sm"
            />
          </div>
        </Card>
      </div>

      {/* Main Menu Quick Navigation (Section F) */}
      <div>
        <h2 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '14px' }}>
          Menu Cepat Pembelajaran
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '14px' }}>
          {[
            { id: 'landing', icon: '🏠', title: 'Home', subtitle: 'Beranda' },
            { id: 'module', icon: '📚', title: 'Learning', subtitle: 'Roadmap 5 Bab' },
            { id: 'audio-hub', icon: '🎧', title: 'Audio', subtitle: 'Pusat Narasi' },
            { id: 'activity', icon: '🎯', title: 'Activities', subtitle: 'Kuis Pilihan' },
            { id: 'progress', icon: '📊', title: 'Progress', subtitle: 'Rapor & Prestasi' },
          ].map((item) => (
            <Card
              key={item.id}
              interactive
              onClick={() => onNavigate(item.id)}
              style={{ padding: '16px', textAlign: 'center', backgroundColor: 'var(--bg-surface)' }}
            >
              <div style={{ fontSize: '1.8rem', marginBottom: '4px' }}>{item.icon}</div>
              <div style={{ fontWeight: '800', fontSize: '0.92rem', color: 'var(--text-main)' }}>{item.title}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{item.subtitle}</div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
