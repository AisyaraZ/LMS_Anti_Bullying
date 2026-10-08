import React from 'react';
import {
  Heart,
  Globe2,
  Sliders,
  ShieldCheck,
  Award,
  Sparkles,
  ArrowRight,
  BookOpen,
  Users,
  Target,
} from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { AudioListenButton } from '../common/AudioListenButton';

export const SocialImpactPage = ({ onNavigate }) => {
  const pillars = [
    {
      badge: 'ACCESS',
      title: 'Akses Pembelajaran Inklusif',
      statement: 'Membuka akses pembelajaran bagi anak dengan kebutuhan belajar yang beragam.',
      details: [
        'Anak dengan disleksia didukung font khusus Lexend dan pengaturan jarak huruf.',
        'Anak dengan sensory sensitivity dan ADHD didukung Focus Mode yang meredam distraksi visual.',
        'Anak tunanetra/gangguan penglihatan didukung kontras tinggi dan narasi suara penuh.',
      ],
      icon: Globe2,
      color: '#5B5FEF',
      bgColor: 'var(--primary-light)',
    },
    {
      badge: 'ADAPT',
      title: 'Pendekatan Adaptif Mandiri',
      statement: 'Menyesuaikan pengalaman belajar berdasarkan kebutuhan pengguna.',
      details: [
        'Tidak memaksakan satu format belajar kaku ke seluruh anak.',
        'Pengguna bebas memilih antara membaca mandiri, mendengarkan audio, atau kombinasi keduanya.',
        'Ukuran teks dapat diperbesar secara dinamis tanpa merusak susunan antarmuka.',
      ],
      icon: Sliders,
      color: '#6CC5A3',
      bgColor: 'var(--secondary-light)',
    },
    {
      badge: 'EMPOWER',
      title: 'Pemberdayaan & Self-Love',
      statement: 'Membantu anak mengenali, menjaga, dan menghargai dirinya.',
      details: [
        'Materi anti-bullying difokuskan pada perlindungan diri tanpa konten traumatis.',
        'Membangun keberanian anak untuk berkata "tidak" dan meminta bantuan orang dewasa terpercaya.',
        'Menumbuhkan rasa harga diri (self-worth) dan budaya saling menyayangi di sekolah.',
      ],
      icon: ShieldCheck,
      color: '#FFD166',
      bgColor: 'var(--accent-light)',
    },
  ];

  const speechText = `
    Why AKSARA Matters.
    Tema Lomba: Mengubah Pendidikan melalui Inovasi, Desain, dan Dampak Sosial.
    Tiga pilar utama AKSARA adalah:
    Akses: Membuka akses pembelajaran bagi anak dengan kebutuhan belajar yang beragam.
    Adaptasi: Menyesuaikan pengalaman belajar berdasarkan kebutuhan pengguna.
    Pemberdayaan: Membantu anak mengenali, menjaga, dan menghargai dirinya.
    Setiap anak memiliki cara belajar yang berbeda. AKSARA hadir untuk memastikan perbedaan bukan menjadi hambatan untuk belajar.
  `;

  return (
    <div style={{ maxWidth: '1040px', margin: '0 auto', padding: '36px 20px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 40px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            backgroundColor: 'var(--primary-light)',
            color: 'var(--primary)',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.85rem',
            fontWeight: '700',
            marginBottom: '14px',
          }}
        >
          <Award size={16} />
          <span>Lomba Inovasi Pendidikan 2026</span>
        </div>

        <h1
          style={{
            fontSize: 'clamp(2.2rem, 4vw, 2.8rem)',
            fontWeight: '900',
            color: 'var(--text-main)',
            marginBottom: '14px',
            lineHeight: 1.15,
          }}
        >
          Why AKSARA Matters
        </h1>

        <p
          style={{
            fontSize: '1.25rem',
            fontWeight: '700',
            color: 'var(--primary)',
            lineHeight: 1.5,
            marginBottom: '18px',
          }}
        >
          “Mengubah Pendidikan melalui Inovasi, Desain, dan Dampak Sosial”
        </p>

        <p
          style={{
            fontSize: '1.1rem',
            color: 'var(--text-main)',
            fontStyle: 'italic',
            fontWeight: '600',
            backgroundColor: 'var(--bg-surface)',
            padding: '16px 24px',
            borderRadius: 'var(--radius-lg)',
            border: '2px dashed var(--primary)',
            lineHeight: '1.6',
            marginBottom: '24px',
          }}
        >
          “Setiap anak memiliki cara belajar yang berbeda.
          AKSARA hadir untuk memastikan perbedaan bukan menjadi hambatan untuk belajar.”
        </p>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <AudioListenButton
            text={speechText}
            title="Narasi Dampak Sosial AKSARA"
            audioId="social-impact-full"
            variant="accent"
          />
        </div>
      </div>

      {/* 3 Pillars Deep Dive */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '48px' }}>
        {pillars.map((pil) => {
          const Icon = pil.icon;
          return (
            <Card
              key={pil.badge}
              padded
              style={{
                borderLeft: `8px solid ${pil.color}`,
                backgroundColor: 'var(--bg-surface)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '14px',
                  flexWrap: 'wrap',
                  gap: '12px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: pil.bgColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: pil.color,
                    }}
                  >
                    <Icon size={24} />
                  </div>
                  <div>
                    <span
                      style={{
                        backgroundColor: pil.color,
                        color: '#FFFFFF',
                        fontWeight: '800',
                        fontSize: '0.72rem',
                        letterSpacing: '0.06em',
                        padding: '2px 8px',
                        borderRadius: 'var(--radius-full)',
                      }}
                    >
                      {pil.badge}
                    </span>
                    <h2
                      style={{
                        fontSize: '1.35rem',
                        fontWeight: '800',
                        color: 'var(--text-main)',
                        marginTop: '4px',
                      }}
                    >
                      {pil.title}
                    </h2>
                  </div>
                </div>

                <AudioListenButton
                  text={`${pil.title}. ${pil.statement}`}
                  title={pil.title}
                  audioId={`pillar-${pil.badge}`}
                  size="sm"
                />
              </div>

              <p
                style={{
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  color: 'var(--primary)',
                  marginBottom: '16px',
                  lineHeight: '1.5',
                }}
              >
                “{pil.statement}”
              </p>

              <div
                style={{
                  backgroundColor: 'var(--bg-subtle)',
                  padding: '16px 20px',
                  borderRadius: 'var(--radius-md)',
                }}
              >
                <div style={{ fontSize: '0.88rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '8px' }}>
                  Implementasi Nyata pada Desain & Teknologi:
                </div>
                <ul style={{ paddingLeft: '20px', color: 'var(--text-muted)', lineHeight: '1.7', fontSize: '0.95rem' }}>
                  {pil.details.map((dt, i) => (
                    <li key={i}>{dt}</li>
                  ))}
                </ul>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Sustainable Development Goals & Conclusion Callout */}
      <div
        style={{
          backgroundColor: 'var(--primary-light)',
          borderRadius: 'var(--radius-xl)',
          padding: '32px',
          border: '2px solid rgba(91, 95, 239, 0.3)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '24px',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Sparkles size={20} color="var(--primary)" />
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--primary)' }}>
              Mendukung SDG 4: Quality & Inclusive Education
            </h3>
          </div>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-main)', maxWidth: '620px', lineHeight: '1.6' }}>
            AKSARA membuktikan bahwa teknologi ramah anak berkebutuhan khusus dapat diciptakan secara estetis, cepat, interaktif, dan penuh martabat.
          </p>
        </div>

        <Button
          size="lg"
          variant="primary"
          icon={ArrowRight}
          iconPosition="right"
          onClick={() => onNavigate('dashboard')}
        >
          Masuk ke Dashboard
        </Button>
      </div>
    </div>
  );
};
