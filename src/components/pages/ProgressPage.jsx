import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Award,
  BookOpen,
  Headphones,
  CheckCircle2,
  Sparkles,
  Printer,
  X,
  Shield,
  Heart,
  RotateCcw,
  ArrowRight,
} from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { ProgressBar } from '../common/ProgressBar';
import { AudioListenButton } from '../common/AudioListenButton';
import { useLearningProgress } from '../../context/LearningProgressContext';

export const ProgressPage = ({ onNavigate }) => {
  const {
    userProfile,
    progressPercent,
    completedLessons,
    completedActivities,
    listenedAudiosCount,
    achievements,
  } = useLearningProgress();

  const [showCertificateModal, setShowCertificateModal] = useState(false);

  const handleOpenCertificate = () => {
    setShowCertificateModal(true);
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.5 },
      });
    } catch (e) {
      // Fallback
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const progressSpeech = `
    Rapor Kemajuan Belajar Anda:
    Kemajuan Keseluruhan ${progressPercent} persen.
    Tiga dari lima pelajaran telah diselesaikan.
    Empat materi audio telah didengarkan.
    Dua aktivitas telah berhasil dituntaskan.
    Selamat, Anda telah meraih lencana Sahabat Inklusif AKSARA!
  `;

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', width: '100%' }}>
      {/* Title Header */}
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
            <span>Pencapaian & Evaluasi Belajar</span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)',
              fontWeight: '900',
              color: 'var(--text-main)',
              lineHeight: 1.2,
              margin: '0 0 6px',
            }}
          >
            My Learning Progress
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', margin: 0 }}>
            Pantau kemajuan belajar inklusifmu dan kumpulkan seluruh lencana keberanian.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <AudioListenButton
            text={progressSpeech}
            title="Ringkasan Rapor Belajar"
            audioId="progress-summary"
            size="sm"
          />
          <Button
            variant="accent"
            size="md"
            icon={Award}
            onClick={handleOpenCertificate}
          >
            Buka Sertifikat Kelulusan 🎓
          </Button>
        </div>
      </div>

      {/* 4 Stats Cards as per Section M */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
          gap: '16px',
          marginBottom: '32px',
        }}
      >
        {/* Overall Progress */}
        <Card padded style={{ borderTop: '5px solid var(--primary)' }}>
          <div style={{ fontSize: '0.82rem', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Overall Progress
          </div>
          <div
            style={{
              fontSize: '2.4rem',
              fontWeight: '900',
              color: 'var(--primary)',
              margin: '6px 0',
            }}
          >
            {progressPercent}%
          </div>
          <ProgressBar value={progressPercent} max={100} showLabel={false} height="8px" color="var(--primary)" />
          <div style={{ fontSize: '0.78rem', color: 'var(--text-light)', marginTop: '8px' }}>
            Kemajuan luar biasa!
          </div>
        </Card>

        {/* Lessons Completed */}
        <Card padded style={{ borderTop: '5px solid var(--secondary)' }}>
          <div style={{ fontSize: '0.82rem', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Lessons Completed
          </div>
          <div
            style={{
              fontSize: '2.4rem',
              fontWeight: '900',
              color: 'var(--secondary)',
              margin: '6px 0',
            }}
          >
            {completedLessons.length}/5
          </div>
          <ProgressBar value={completedLessons.length} max={5} showLabel={false} height="8px" color="var(--secondary)" />
          <div style={{ fontSize: '0.78rem', color: 'var(--text-light)', marginTop: '8px' }}>
            {completedLessons.length} dari 5 bab materi selesai.
          </div>
        </Card>

        {/* Audio Lessons */}
        <Card padded style={{ borderTop: '5px solid #FFD166' }}>
          <div style={{ fontSize: '0.82rem', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Audio Lessons
          </div>
          <div
            style={{
              fontSize: '2.4rem',
              fontWeight: '900',
              color: '#B45309',
              margin: '6px 0',
            }}
          >
            {listenedAudiosCount}
          </div>
          <ProgressBar value={listenedAudiosCount} max={5} showLabel={false} height="8px" color="#FFD166" />
          <div style={{ fontSize: '0.78rem', color: 'var(--text-light)', marginTop: '8px' }}>
            Materi didengarkan & dibaca.
          </div>
        </Card>

        {/* Activities Completed */}
        <Card padded style={{ borderTop: '5px solid #EF476F' }}>
          <div style={{ fontSize: '0.82rem', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Activities Completed
          </div>
          <div
            style={{
              fontSize: '2.4rem',
              fontWeight: '900',
              color: '#EF476F',
              margin: '6px 0',
            }}
          >
            {completedActivities.length}
          </div>
          <ProgressBar value={completedActivities.length} max={2} showLabel={false} height="8px" color="#EF476F" />
          <div style={{ fontSize: '0.78rem', color: 'var(--text-light)', marginTop: '8px' }}>
            Latihan tindakan tuntas.
          </div>
        </Card>
      </div>

      {/* Section 24: Empty State Protection */}
      {completedLessons.length === 0 && (
        <Card padded style={{ textAlign: 'center', padding: '40px 20px', marginBottom: '32px' }}>
          <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🌱</div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '6px' }}>Belum ada aktivitas belajar</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>Yuk mulai belajar mengenali dan mencegah bullying bersama AKSARA!</p>
          <Button variant="primary" size="lg" icon={ArrowRight} iconPosition="right" onClick={() => onNavigate('module')}>
            Mulai Belajar Sekarang
          </Button>
        </Card>
      )}

      {/* Achievements Section */}
      <div style={{ marginBottom: '36px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
          <div
            style={{
              backgroundColor: 'var(--primary-light)',
              color: 'var(--primary)',
              padding: '6px',
              borderRadius: 'var(--radius-sm)',
            }}
          >
            <Award size={22} />
          </div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--text-main)', margin: 0 }}>
            Lencana Prestasi (Badges & Achievements)
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '16px',
          }}
        >
          {achievements.map((item) => (
            <Card
              key={item.id}
              padded
              style={{
                backgroundColor: item.unlocked ? 'var(--bg-surface)' : 'var(--bg-subtle)',
                opacity: item.unlocked ? 1 : 0.65,
                border: item.unlocked ? '1.5px solid var(--border-light)' : '1px dashed var(--border-light)',
                display: 'flex',
                gap: '16px',
                alignItems: 'flex-start',
              }}
            >
              <div
                style={{
                  fontSize: '2rem',
                  backgroundColor: item.unlocked ? 'var(--primary-light)' : 'transparent',
                  width: '50px',
                  height: '50px',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {item.icon}
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <h3 style={{ fontSize: '1.02rem', fontWeight: '800', color: 'var(--text-main)', margin: 0 }}>
                    {item.title}
                  </h3>
                  {item.unlocked && <CheckCircle2 size={16} color="var(--secondary)" />}
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.4', margin: '4px 0 0' }}>
                  {item.desc}
                </p>
                <div
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: '800',
                    color: item.unlocked ? 'var(--secondary)' : 'var(--text-light)',
                    marginTop: '8px',
                  }}
                >
                  {item.unlocked ? '✓ Terbuka (Unlocked)' : '🔒 Terkunci'}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Certificate Modal */}
      {showCertificateModal && (
        <div className="drawer-backdrop" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Sertifikat Sahabat Inklusif AKSARA"
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-xl)',
              maxWidth: '720px',
              width: '100%',
              padding: '36px',
              position: 'relative',
              boxShadow: '0 24px 60px rgba(0,0,0,0.3)',
              border: '8px solid #5B5FEF',
              backgroundImage: 'radial-gradient(circle at 50% 50%, #FAF5FF 0%, #FFFFFF 100%)',
              color: '#25283D',
              boxSizing: 'border-box',
            }}
          >
            <button
              onClick={() => setShowCertificateModal(false)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                padding: '6px',
                borderRadius: '50%',
                backgroundColor: '#F3F4F6',
                color: '#4B5563',
              }}
              className="hide-on-print"
            >
              <X size={20} />
            </button>

            {/* Certificate Header */}
            <div style={{ textAlign: 'center', borderBottom: '2px solid #E5E7EB', paddingBottom: '16px', marginBottom: '20px' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#EEF0FF',
                  padding: '4px 14px',
                  borderRadius: '99px',
                  color: '#5B5FEF',
                  fontWeight: '800',
                  fontSize: '0.85rem',
                  marginBottom: '8px',
                }}
              >
                🎓 SERTIFIKAT KELULUSAN PEMBELAJARAN INKLUSIF
              </div>

              <h2
                style={{
                  fontSize: '2rem',
                  fontWeight: '900',
                  color: '#1E1B4B',
                  letterSpacing: '-0.02em',
                  margin: 0,
                }}
              >
                AKSARA
              </h2>
              <p style={{ fontSize: '0.85rem', color: '#6B7280', fontWeight: '600', margin: '4px 0 0' }}>
                Adaptive Learning System for Inclusive Education
              </p>
            </div>

            {/* Certificate Body */}
            <div style={{ textAlign: 'center', marginBottom: '26px' }}>
              <p style={{ fontSize: '0.95rem', color: '#4B5563', margin: '0 0 6px' }}>
                Dengan bangga menyatakan bahwa:
              </p>

              <h3
                style={{
                  fontSize: '2rem',
                  fontWeight: '900',
                  color: '#5B5FEF',
                  textDecoration: 'underline',
                  textUnderlineOffset: '6px',
                  margin: '0 0 8px',
                }}
              >
                {userProfile.name}
              </h3>

              <p style={{ fontSize: '0.92rem', color: '#374151', fontWeight: '700', margin: '0 0 14px' }}>
                {userProfile.grade} • {userProfile.school}
              </p>

              <p style={{ fontSize: '1rem', color: '#1F2937', lineHeight: '1.6', maxWidth: '520px', margin: '0 auto' }}>
                Telah berhasil menyelesaikan seluruh rangkaian materi{' '}
                <strong>Anti-Bullying, Cara Mencegah Kekerasan, dan Self-Love Menjaga Diri</strong>{' '}
                dengan predikat:
              </p>

              <div
                style={{
                  display: 'inline-block',
                  backgroundColor: '#FEF3C7',
                  color: '#92400E',
                  border: '2px solid #F59E0B',
                  padding: '8px 22px',
                  borderRadius: '99px',
                  fontWeight: '800',
                  fontSize: '1.1rem',
                  marginTop: '12px',
                }}
              >
                ⭐ Sahabat Inklusif & Teladan Anti-Bullying 2026
              </div>
            </div>

            {/* Certificate Signatures */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                borderTop: '2px dashed #E5E7EB',
                paddingTop: '16px',
              }}
            >
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '0.78rem', color: '#6B7280' }}>Tanggal Kelulusan:</div>
                <div style={{ fontSize: '0.88rem', fontWeight: '700', color: '#111827' }}>
                  7 Oktober 2026
                </div>
                <div style={{ fontSize: '0.72rem', color: '#9CA3AF' }}>ID: AKSARA-ABK-2026-089</div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.8rem', marginBottom: '2px' }}>🛡️❤️</div>
                <div style={{ fontSize: '0.85rem', fontWeight: '800', color: '#111827' }}>
                  Tim Pengembang AKSARA
                </div>
                <div style={{ fontSize: '0.72rem', color: '#6B7280' }}>
                  Lomba Inovasi Pendidikan Inklusif
                </div>
              </div>
            </div>

            {/* Actions */}
            <div
              style={{
                marginTop: '26px',
                display: 'flex',
                justifyContent: 'center',
                gap: '12px',
              }}
              className="hide-on-print"
            >
              <Button size="md" variant="primary" icon={Printer} onClick={handlePrint}>
                Cetak Sertifikat
              </Button>
              <Button size="md" variant="secondary" onClick={() => setShowCertificateModal(false)}>
                Tutup
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
