import React from 'react';
import {
  BookOpen,
  CheckCircle2,
  PlayCircle,
  ArrowRight,
  Shield,
  Heart,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { ProgressBar } from '../common/ProgressBar';
import { AudioListenButton } from '../common/AudioListenButton';
import { useLearningProgress } from '../../context/LearningProgressContext';

export const ModuleRoadmapPage = ({ onNavigate }) => {
  const { completedLessons, completedActivities, completedReflections, progressPercent } = useLearningProgress();

  const roadmapSteps = [
    {
      step: '01',
      id: 'lesson-1',
      title: 'Jenis-Jenis Bullying',
      desc: 'Kenali perbedaan antara perkataan kasar (verbal), tindakan fisik, pengucilan sosial, dan bullying di dunia maya.',
      isCompleted: completedLessons.includes('lesson-1'),
      statusText: completedLessons.includes('lesson-1') ? 'Selesai Dipelajari' : 'Siap Mulai',
      icon: AlertCircle,
      targetView: 'lesson-1',
      badgeColor: '#5B5FEF',
    },
    {
      step: '02',
      id: 'lesson-2',
      title: 'Cara Mencegah Bullying',
      desc: '4 Langkah penting: Be Kind, Respect, Don’t Join, dan Tell Someone kepada orang dewasa yang dipercaya.',
      isCompleted: completedLessons.includes('lesson-2'),
      statusText: completedLessons.includes('lesson-2') ? 'Selesai Dipelajari' : 'Siap Mulai',
      icon: Shield,
      targetView: 'lesson-2',
      badgeColor: '#6CC5A3',
    },
    {
      step: '03',
      id: 'lesson-3',
      title: 'Self-Love & Menjaga Diri',
      desc: 'Mengetahui bahwa dirimu berharga, berhak merasa aman, dan berani berkata tidak ketika sesuatu membuatmu tidak nyaman.',
      isCompleted: completedLessons.includes('lesson-3'),
      statusText: completedLessons.includes('lesson-3') ? 'Selesai' : 'Sedang Dipelajari 📍',
      icon: Heart,
      targetView: 'lesson-3',
      badgeColor: '#FFD166',
    },
    {
      step: '04',
      id: 'activity',
      title: 'Aktivitas: Pilih Tindakan yang Tepat',
      desc: 'Latihan interaktif mengambil keputusan yang aman dan bijak dalam situasi sehari-hari tanpa menyakiti diri maupun teman.',
      isCompleted: completedActivities.length > 0,
      statusText: completedActivities.length > 0 ? 'Selesai Dikerjakan' : 'Latihan Interaktif',
      icon: PlayCircle,
      targetView: 'activity',
      badgeColor: '#EF476F',
    },
    {
      step: '05',
      id: 'reflection',
      title: 'Refleksi & Ikrar Sahabat Inklusif',
      desc: 'Menyimpulkan apa yang telah dipelajari dan mengukir komitmen kebaikan untuk saling menyayangi.',
      isCompleted: completedReflections.length > 0,
      statusText: completedReflections.length > 0 ? 'Selesai' : 'Refleksi Akhir',
      icon: Sparkles,
      targetView: 'reflection',
      badgeColor: '#8B5CF6',
    },
  ];

  const roadmapSpeech =
    'Modul Anti-Bullying AKSARA. Belajar mengenali, mencegah, dan menjaga diri melalui lima langkah pembelajaran adaptif.';

  return (
    <div style={{ maxWidth: '920px', margin: '0 auto', width: '100%' }}>
      {/* Module Header */}
      <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 32px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '4px 14px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--primary-light)',
            color: 'var(--primary)',
            fontSize: '0.85rem',
            fontWeight: '800',
            marginBottom: '12px',
          }}
        >
          <BookOpen size={16} />
          <span>Alur Pembelajaran Inklusif</span>
        </div>

        <h1
          style={{
            fontSize: 'clamp(2rem, 4vw, 2.5rem)',
            fontWeight: '900',
            color: 'var(--text-main)',
            marginBottom: '8px',
            lineHeight: 1.2,
          }}
        >
          Anti-Bullying
        </h1>

        <p style={{ fontSize: '1.15rem', color: 'var(--primary)', fontWeight: '700', margin: '0 0 12px' }}>
          “Belajar mengenali, mencegah, dan menjaga diri.”
        </p>

        <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: '0 0 18px' }}>
          Ikuti peta perjalanan belajar di bawah ini. Kamu bebas belajar dengan teks adaptif maupun narasi audio ramah anak.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <AudioListenButton text={roadmapSpeech} title="Pengantar Roadmap Anti-Bullying" audioId="roadmap-intro" />
        </div>
      </div>

      {/* Progress Card */}
      <div style={{ marginBottom: '32px' }}>
        <Card padded style={{ backgroundColor: 'var(--bg-surface)' }}>
          <ProgressBar
            value={progressPercent}
            max={100}
            label="Progres Perjalanan Belajarmu"
            sublabel="Selesaikan setiap bab untuk membuka lencana dan Sertifikat Sahabat Inklusif."
            color="var(--primary)"
            height="14px"
          />
        </Card>
      </div>

      {/* Roadmap List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {roadmapSteps.map((step, idx) => {
          const StepIcon = step.icon;
          const isCurrent = step.statusText.includes('Sedang');

          return (
            <div key={step.step} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              {/* Step indicator node */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, width: '48px' }}>
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: step.isCompleted ? 'var(--secondary)' : isCurrent ? 'var(--primary)' : 'var(--bg-subtle)',
                    color: step.isCompleted || isCurrent ? '#FFFFFF' : 'var(--text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '900',
                    fontSize: '1.1rem',
                    boxShadow: isCurrent ? '0 0 0 4px var(--primary-light)' : 'none',
                    border: '2px solid',
                    borderColor: step.isCompleted ? 'var(--secondary)' : isCurrent ? 'var(--primary)' : 'var(--border-light)',
                  }}
                >
                  {step.isCompleted ? <CheckCircle2 size={24} /> : step.step}
                </div>

                {idx < roadmapSteps.length - 1 && (
                  <div
                    style={{
                      width: '3px',
                      height: '60px',
                      backgroundColor: step.isCompleted ? 'var(--secondary)' : 'var(--border-light)',
                      marginTop: '6px',
                      borderRadius: '99px',
                    }}
                  />
                )}
              </div>

              {/* Step Card */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <Card
                  interactive
                  onClick={() => onNavigate(step.targetView)}
                  style={{
                    padding: '20px 22px',
                    borderLeft: `6px solid ${step.badgeColor}`,
                    backgroundColor: isCurrent ? 'var(--primary-light)' : 'var(--bg-surface)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '8px' }}>
                    <div>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', fontWeight: '800', color: step.badgeColor, textTransform: 'uppercase', marginBottom: '4px' }}>
                        <StepIcon size={14} />
                        <span>LANGKAH {step.step} • {step.statusText}</span>
                      </div>
                      <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-main)', margin: 0 }}>
                        {step.title}
                      </h2>
                    </div>

                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <AudioListenButton text={`${step.title}. ${step.desc}`} title={step.title} audioId={`roadmap-${step.step}`} size="sm" />
                      <Button
                        size="sm"
                        variant={step.isCompleted ? 'secondary' : isCurrent ? 'primary' : 'tertiary'}
                        icon={ArrowRight}
                        iconPosition="right"
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigate(step.targetView);
                        }}
                      >
                        {step.isCompleted ? 'Buka Kembali' : isCurrent ? 'Lanjutkan' : 'Buka'}
                      </Button>
                    </div>
                  </div>

                  <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
                    {step.desc}
                  </p>
                </Card>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
