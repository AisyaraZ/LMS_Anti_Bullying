import React from 'react';
import {
  Sparkles,
  ArrowRight,
  Headphones,
  Type,
  ShieldCheck,
  Heart,
  Globe2,
  Sliders,
} from 'lucide-react';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { AudioListenButton } from '../common/AudioListenButton';
import { useAccessibility } from '../../context/AccessibilityContext';

export const LandingPage = ({ onNavigate }) => {
  const { togglePanel } = useAccessibility();

  const heroIntroSpeech =
    'Selamat datang di AKSARA. Platform pembelajaran adaptif yang menghadirkan pengalaman belajar inklusif melalui teks, audio, dan pengaturan aksesibilitas.';

  const featureCards = [
    {
      icon: Headphones,
      color: '#5B5FEF',
      bgColor: 'var(--primary-light)',
      title: '🎧 Audio Learning',
      desc: 'Dengarkan materi dengan nyaman dan intonasi ramah anak.',
      detail: 'Setiap penjelasan dilengkapi narasi suara jernih yang dapat diatur kecepatannya serta transkrip teks bagi sahabat tunarungu.',
    },
    {
      icon: Type,
      color: '#6CC5A3',
      bgColor: 'var(--secondary-light)',
      title: 'Aa Adaptive Text',
      desc: 'Atur ukuran dan tampilan teks sesuai kebutuhan.',
      detail: 'Tersedia pilihan ukuran teks (Small - Extra Large), font ramah disleksia (Lexend), Easy Reading Mode, dan kontras tinggi.',
    },
    {
      icon: Heart,
      color: '#EF476F',
      bgColor: 'var(--danger-light)',
      title: '❤️ Safe Learning',
      desc: 'Belajar tentang menjaga diri dan menghargai orang lain.',
      detail: 'Materi anti-bullying dirancang aman, ramah ABK, bebas dari konten traumatis, berfokus pada self-love dan perlindungan diri.',
    },
  ];

  const impactPoints = [
    {
      badge: 'ACCESS',
      title: 'Akses Pembelajaran Inklusif',
      desc: 'Membuka akses pembelajaran bagi anak dengan kebutuhan belajar yang beragam, disleksia, kesulitan visual, tunarungu, dan sensori sensitif.',
      icon: Globe2,
    },
    {
      badge: 'ADAPT',
      title: 'Pendekatan Adaptif',
      desc: 'Menyesuaikan pengalaman belajar berdasarkan kebutuhan dan kenyamanan setiap anak secara mandiri.',
      icon: Sliders,
    },
    {
      badge: 'EMPOWER',
      title: 'Pemberdayaan & Self-Love',
      desc: 'Membantu anak mengenali, menjaga, dan menghargai dirinya serta berani bersuara secara aman kepada orang dewasa terpercaya.',
      icon: ShieldCheck,
    },
  ];

  return (
    <div style={{ width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Hero Section */}
      <section
        style={{
          padding: '24px 0 48px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '36px',
          alignItems: 'center',
        }}
      >
        {/* Left Column: Headlines & Actions */}
        <div>
          {/* Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 12px',
              backgroundColor: 'var(--primary-light)',
              color: 'var(--primary)',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.82rem',
              fontWeight: '800',
              marginBottom: '14px',
              border: '1px solid rgba(91, 95, 239, 0.2)',
            }}
          >
            <Sparkles size={14} />
            <span>Lomba Inovasi Pendidikan 2026</span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)',
              fontWeight: '900',
              color: 'var(--text-main)',
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              margin: '0 0 10px',
            }}
          >
            AKSARA
          </h1>

          <p
            style={{
              fontSize: 'clamp(1.15rem, 2.2vw, 1.4rem)',
              fontWeight: '800',
              color: 'var(--primary)',
              margin: '0 0 14px',
              lineHeight: 1.3,
            }}
          >
            “Belajar dengan Cara yang Sesuai untuk Setiap Anak.”
          </p>

          <p
            style={{
              fontSize: '1rem',
              color: 'var(--text-muted)',
              margin: '0 0 24px',
              lineHeight: '1.7',
              maxWidth: '520px',
            }}
          >
            Platform pembelajaran adaptif yang menghadirkan pengalaman belajar inklusif
            melalui teks, audio, dan pengaturan aksesibilitas yang dirancang penuh kasih sayang untuk Anak Berkebutuhan Khusus (ABK).
          </p>

          {/* Action buttons (Section 13: strict minHeight 48px) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              flexWrap: 'wrap',
              marginBottom: '20px',
            }}
          >
            <Button
              size="md"
              variant="primary"
              icon={ArrowRight}
              iconPosition="right"
              onClick={() => onNavigate('module')}
            >
              Mulai Belajar
            </Button>

            <Button
              size="md"
              variant="secondary"
              onClick={() => onNavigate('social-impact')}
            >
              Kenali AKSARA
            </Button>
          </div>

          {/* Audio Quick Listen Pill */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <AudioListenButton
              text={heroIntroSpeech}
              title="Pengenalan Singkat AKSARA"
              audioId="hero-intro"
              size="sm"
            />
            <span style={{ fontSize: '0.82rem', color: 'var(--text-light)' }}>
              Dengarkan pengantar suara
            </span>
          </div>
        </div>

        {/* Right Column: Hero Illustration Card */}
        <div>
          <div
            style={{
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-md)',
              border: '2px solid var(--border-light)',
              backgroundColor: 'var(--bg-surface)',
            }}
          >
            <img
              src="/hero-illustration.jpg"
              alt="Anak-anak beragam sedang belajar bersama dalam lingkungan aman"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                maxHeight: '340px',
                objectFit: 'cover',
              }}
            />
            <div
              style={{
                padding: '14px 18px',
                backgroundColor: 'var(--bg-surface)',
                borderTop: '1px solid var(--border-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1.2rem' }}>🌟</span>
                <span style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--text-main)' }}>
                  Aman • Inklusif • Ramah Anak
                </span>
              </div>
              <button
                onClick={togglePanel}
                style={{
                  fontSize: '0.8rem',
                  fontWeight: '800',
                  color: 'var(--primary)',
                  backgroundColor: 'var(--primary-light)',
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-full)',
                }}
              >
                ♿ Uji Aksesibilitas
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Section: "Belajar tanpa batas, dengan cara yang sesuai" */}
      <section style={{ padding: '36px 0 48px' }}>
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 36px' }}>
          <span
            style={{
              fontSize: '0.82rem',
              fontWeight: '800',
              color: 'var(--primary)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '6px',
              display: 'inline-block',
            }}
          >
            Fitur Utama Inklusif
          </span>
          <h2
            style={{
              fontSize: 'clamp(1.6rem, 3vw, 2.1rem)',
              fontWeight: '900',
              color: 'var(--text-main)',
              lineHeight: 1.25,
              margin: '0 0 8px',
            }}
          >
            Belajar tanpa batas, dengan cara yang sesuai.
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
            AKSARA mengintegrasikan teks adaptif, narasi audio dengan transkrip, dan pendekatan emosional yang memberdayakan.
          </p>
        </div>

        {/* 3 Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
          }}
        >
          {featureCards.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <Card
                key={idx}
                interactive
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '24px',
                  backgroundColor: 'var(--bg-surface)',
                }}
              >
                <div>
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: feat.bgColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '16px',
                      color: feat.color,
                    }}
                  >
                    <Icon size={24} />
                  </div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--text-main)', margin: '0 0 6px' }}>
                    {feat.title}
                  </h3>
                  <p style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--primary)', margin: '0 0 8px', lineHeight: 1.4 }}>
                    “{feat.desc}”
                  </p>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
                    {feat.detail}
                  </p>
                </div>

                <div style={{ marginTop: '20px', paddingTop: '14px', borderTop: '1px solid var(--border-light)' }}>
                  <AudioListenButton
                    text={`${feat.title}. ${feat.desc}. ${feat.detail}`}
                    title={feat.title}
                    audioId={`feat-${idx}`}
                    size="sm"
                  />
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Social Impact Summary Box */}
      <section style={{ padding: '0 0 36px' }}>
        <div
          style={{
            backgroundColor: 'var(--bg-subtle)',
            border: '2px solid var(--primary-glow)',
            borderRadius: 'var(--radius-xl)',
            padding: '36px 28px',
          }}
        >
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 28px' }}>
            <span
              style={{
                fontSize: '0.8rem',
                fontWeight: '800',
                color: 'var(--primary)',
                textTransform: 'uppercase',
                backgroundColor: 'var(--primary-light)',
                padding: '4px 12px',
                borderRadius: 'var(--radius-full)',
                display: 'inline-block',
                marginBottom: '10px',
              }}
            >
              Tema: Inovasi, Desain, dan Dampak Sosial
            </span>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--text-main)', margin: '0 0 10px' }}>
              Why AKSARA Matters
            </h2>
            <p style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--primary)', fontStyle: 'italic', margin: 0 }}>
              “Setiap anak memiliki cara belajar yang berbeda. AKSARA hadir untuk memastikan perbedaan bukan menjadi hambatan untuk belajar.”
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '16px',
              marginBottom: '28px',
            }}
          >
            {impactPoints.map((pt, i) => {
              const Icon = pt.icon;
              return (
                <div
                  key={i}
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    padding: '20px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-light)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ backgroundColor: 'var(--primary)', color: '#FFFFFF', fontWeight: '800', fontSize: '0.72rem', padding: '2px 8px', borderRadius: 'var(--radius-full)' }}>
                      {pt.badge}
                    </span>
                    <Icon size={18} color="var(--primary)" />
                  </div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-main)', margin: '0 0 6px' }}>
                    {pt.title}
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.5', margin: 0 }}>
                    {pt.desc}
                  </p>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <Button variant="primary" size="md" icon={ArrowRight} iconPosition="right" onClick={() => onNavigate('module')}>
              Masuk ke Modul Pembelajaran
            </Button>
            <Button variant="secondary" size="md" onClick={() => onNavigate('social-impact')}>
              Pelajari Dampak Sosial Lengkap
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
