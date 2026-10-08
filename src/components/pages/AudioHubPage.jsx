import React, { useState } from 'react';
import { Volume2, Play, Pause, FileText, CheckCircle2, Sparkles, BookOpen } from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { AudioListenButton } from '../common/AudioListenButton';
import { useAudio } from '../../context/AudioContext';
import { useAccessibility } from '../../context/AccessibilityContext';

export const AudioHubPage = ({ onNavigate }) => {
  const { isPlaying, activeAudioId } = useAudio();
  const { audioSpeed, setAudioSpeed } = useAccessibility();
  const [activeTranscriptId, setActiveTranscriptId] = useState(null);

  const audioList = [
    {
      id: 'audio-intro',
      title: '01. Pengantar AKSARA & Sahabat Inklusif',
      category: 'Pengantar',
      duration: '1 Menit',
      text: 'Selamat datang di AKSARA. Platform pembelajaran adaptif yang menghadirkan pengalaman belajar inklusif melalui teks, audio, dan pengaturan aksesibilitas. Setiap anak memiliki cara belajar yang unik dan berharga.',
      lessonView: 'landing',
    },
    {
      id: 'audio-lesson1',
      title: '02. Kenali Jenis-Jenis Bullying',
      category: 'Bab 01',
      duration: '2 Menit',
      text: 'Bullying adalah perilaku yang dapat membuat seseorang merasa sedih, takut, atau tidak nyaman. Terdapat empat jenis utama: Verbal Bullying melalui kata-kata mengejek, Physical Bullying yang menyakiti tubuh, Social Bullying yang mengucilkan teman, dan Cyberbullying melalui internet.',
      lessonView: 'lesson-1',
    },
    {
      id: 'audio-lesson2',
      title: '03. Empat Langkah Mencegah Bullying',
      category: 'Bab 02',
      duration: '2 Menit',
      text: 'Mencegah bullying dimulai dari kita sendiri: Langkah 1, Be Kind dengan menggunakan kata-kata yang baik. Langkah 2, Respect dengan menghargai teman dan perbedaan. Langkah 3, Don’t Join dengan tidak ikut mengejek. Langkah 4, Tell Someone dengan menceritakan kepada orang dewasa yang dipercaya.',
      lessonView: 'lesson-2',
    },
    {
      id: 'audio-lesson3',
      title: '04. Sayangi Dirimu (Self-Love & Keamanan)',
      category: 'Bab 03',
      duration: '2 Menit',
      text: 'Self-love bukan hanya tentang merasa percaya diri, tetapi juga mengetahui cara menjaga diri. Katakan pada dirimu: Aku berharga, aku berhak merasa aman, aku boleh berkata tidak ketika tidak nyaman, aku boleh meminta bantuan, dan aku senantiasa menjaga diriku.',
      lessonView: 'lesson-3',
    },
    {
      id: 'audio-reflection',
      title: '05. Ikrar Refleksi & Perlindungan Diri',
      category: 'Refleksi',
      duration: '1 Menit',
      text: 'Hari ini aku belajar bahwa aku berharga, aku harus menjaga diriku, aku boleh meminta bantuan orang dewasa, dan aku harus selalu menghargai orang lain.',
      lessonView: 'reflection',
    },
  ];

  return (
    <div style={{ maxWidth: '920px', margin: '0 auto', width: '100%' }}>
      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '4px 12px',
            backgroundColor: 'var(--primary-light)',
            color: 'var(--primary)',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.82rem',
            fontWeight: '800',
            marginBottom: '10px',
          }}
        >
          <Volume2 size={16} />
          <span>Pusat Pembelajaran Audio & Transkrip Visual</span>
        </div>

        <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', fontWeight: '900', color: 'var(--text-main)', marginBottom: '8px' }}>
          Audio Learning Hub
        </h1>
        <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
          Dengarkan seluruh narasi materi atau baca teks transkrip lengkap bagi sahabat tunarungu.
        </p>
      </div>

      {/* Speed Selector quick bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          padding: '14px 20px',
          backgroundColor: 'var(--bg-surface)',
          borderRadius: 'var(--radius-lg)',
          border: '1.5px solid var(--border-light)',
          marginBottom: '28px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '1.2rem' }}>🔊</span>
          <span style={{ fontSize: '0.92rem', fontWeight: '700', color: 'var(--text-main)' }}>
            Kecepatan Audio Aktif: <strong>{audioSpeed}x</strong>
          </span>
        </div>

        <div style={{ display: 'flex', gap: '6px' }}>
          {[0.75, 1, 1.25, 1.5].map((spd) => (
            <button
              key={spd}
              onClick={() => setAudioSpeed(spd)}
              style={{
                minHeight: '38px',
                padding: '0 12px',
                borderRadius: 'var(--radius-full)',
                fontWeight: '800',
                fontSize: '0.82rem',
                border: '1.5px solid',
                borderColor: audioSpeed === spd ? 'var(--primary)' : 'var(--border-light)',
                backgroundColor: audioSpeed === spd ? 'var(--primary)' : 'transparent',
                color: audioSpeed === spd ? '#FFFFFF' : 'var(--text-main)',
                transition: 'var(--transition-smooth)',
              }}
            >
              {spd}x
            </button>
          ))}
        </div>
      </div>

      {/* Audio Playlist Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {audioList.map((item) => {
          const isTranscriptOpen = activeTranscriptId === item.id;
          const isThisPlaying = isPlaying && activeAudioId === item.id;

          return (
            <Card
              key={item.id}
              padded
              style={{
                backgroundColor: isThisPlaying ? 'var(--primary-light)' : 'var(--bg-surface)',
                borderColor: isThisPlaying ? 'var(--primary)' : 'var(--border-light)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: '14px',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <span
                      style={{
                        backgroundColor: 'var(--bg-subtle)',
                        color: 'var(--text-muted)',
                        padding: '2px 8px',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.75rem',
                        fontWeight: '800',
                      }}
                    >
                      {item.category}
                    </span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-light)' }}>
                      • {item.duration}
                    </span>
                  </div>

                  <h2 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '8px' }}>
                    {item.title}
                  </h2>
                </div>

                {/* Right controls */}
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <AudioListenButton
                    text={item.text}
                    title={item.title}
                    audioId={item.id}
                    size="sm"
                  />

                  <Button
                    size="sm"
                    variant="secondary"
                    icon={FileText}
                    onClick={() => setActiveTranscriptId(isTranscriptOpen ? null : item.id)}
                  >
                    {isTranscriptOpen ? 'Tutup Teks' : 'Teks'}
                  </Button>

                  <Button
                    size="sm"
                    variant="tertiary"
                    onClick={() => onNavigate(item.lessonView)}
                  >
                    Buka Bab
                  </Button>
                </div>
              </div>

              {/* Transkrip Teks Tunarungu */}
              {isTranscriptOpen && (
                <div
                  style={{
                    marginTop: '16px',
                    padding: '14px 18px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-subtle)',
                    border: '1px solid var(--border-light)',
                    animation: 'fadeIn 0.2s ease',
                  }}
                >
                  <div style={{ fontSize: '0.78rem', fontWeight: '800', color: 'var(--primary)', marginBottom: '6px' }}>
                    📖 TRANSKRIP TEKS LENGKAP:
                  </div>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: '1.6', margin: 0 }}>
                    "{item.text}"
                  </p>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
};
