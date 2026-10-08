import React, { useState } from 'react';
import {
  MessageSquareWarning,
  HandMetal,
  Users,
  Smartphone,
  ChevronDown,
  ChevronUp,
  FileText,
  Sparkles,
} from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { AudioListenButton } from '../common/AudioListenButton';
import { LessonLayout } from '../common/LessonLayout';
import { useLearningProgress } from '../../context/LearningProgressContext';
import { useAccessibility } from '../../context/AccessibilityContext';

export const Lesson1JenisBullying = ({ onNavigate }) => {
  const { completeLesson } = useLearningProgress();
  const { readingMode } = useAccessibility();

  // Focus mode stepper index
  const [focusCardIndex, setFocusCardIndex] = useState(0);

  const [expandedCards, setExpandedCards] = useState({
    verbal: true,
    physical: false,
    social: false,
    cyber: false,
  });

  const toggleExpand = (key) => {
    setExpandedCards((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const cardsData = [
    {
      id: 'verbal',
      title: '1. Verbal Bullying',
      subtitle: 'Kata-Kata yang Menyakiti',
      definition: 'Perkataan yang menyakiti atau mengejek seseorang.',
      icon: MessageSquareWarning,
      color: '#5B5FEF',
      bgColor: 'var(--primary-light)',
      examples: [
        'Memanggil nama teman dengan julukan yang mengejek atau membuatnya sedih.',
        'Membentak atau menertawakan kekurangan seseorang di depan banyak orang.',
      ],
      friendlyTip: '💡 Tips Bijak: Kata-kata kita memiliki kekuatan. Gunakan kata yang menenangkan dan ramah untuk temanmu.',
      speech: 'Verbal Bullying adalah perkataan yang menyakiti atau mengejek seseorang. Contohnya memanggil julukan buruk atau menertawakan teman. Gunakan kata-kata yang baik.',
    },
    {
      id: 'physical',
      title: '2. Physical Bullying',
      subtitle: 'Tindakan yang Mengganggu Tubuh',
      definition: 'Tindakan yang menyakiti tubuh seseorang atau merusak barang miliknya.',
      icon: HandMetal,
      color: '#EF476F',
      bgColor: 'var(--danger-light)',
      examples: [
        'Mendorong, menarik, atau menyenggol teman dengan sengaja hingga ia merasa takut.',
        'Mengambil atau menyembunyikan barang milik teman tanpa izin.',
      ],
      friendlyTip: '💡 Tips Bijak: Tubuh kita dan teman kita berharga. Setiap anak berhak merasa aman dari sentuhan kasar.',
      speech: 'Physical Bullying adalah tindakan yang menyakiti tubuh seseorang atau merusak barang miliknya. Setiap anak berhak merasa aman secara fisik.',
    },
    {
      id: 'social',
      title: '3. Social Bullying',
      subtitle: 'Mengucilkan atau Menjauhkan Teman',
      definition: 'Mengucilkan atau sengaja membuat seseorang merasa tidak diterima dalam kelompok.',
      icon: Users,
      color: '#6CC5A3',
      bgColor: 'var(--secondary-light)',
      examples: [
        'Melarang teman lain untuk mengajak bicara atau bermain dengan seseorang.',
        'Menyebarkan kabar yang tidak benar agar teman tersebut dijauhi.',
      ],
      friendlyTip: '💡 Tips Bijak: Mengajak teman bermain dan tersenyum menyapa adalah cara mudah menyebarkan kebaikan.',
      speech: 'Social Bullying adalah mengucilkan atau sengaja membuat seseorang merasa tidak diterima. Selalu ajak teman bermain bersama dan hargai keberagaman.',
    },
    {
      id: 'cyber',
      title: '4. Cyberbullying',
      subtitle: 'Perlakuan Buruk di Internet',
      definition: 'Perilaku menyakiti atau mengejek seseorang melalui internet, media sosial, atau pesan chat.',
      icon: Smartphone,
      color: '#FFD166',
      bgColor: 'var(--accent-light)',
      examples: [
        'Mengirimkan pesan atau komentar kasar di media sosial.',
        'Membagikan foto atau video lucu teman dengan tujuan mempermalukannya.',
      ],
      friendlyTip: '💡 Tips Bijak: Jika ada yang membuatmu tidak nyaman di internet, segera beritahu orang tua atau gurumu.',
      speech: 'Cyberbullying adalah perilaku menyakiti atau mengejek seseorang melalui internet. Jika melihat pesan yang tidak nyaman, beritahu orang tua atau guru.',
    },
  ];

  const fullLessonText = `
    Pelajaran 1: Kenali Jenis Bullying.
    Bullying adalah perilaku yang dapat membuat seseorang merasa sedih, takut, atau tidak nyaman.
    Pertama, Verbal Bullying: perkataan yang menyakiti seseorang.
    Kedua, Physical Bullying: tindakan yang menyakiti tubuh atau merusak barang.
    Ketiga, Social Bullying: mengucilkan teman dari pergaulan.
    Keempat, Cyberbullying: mengejek teman melalui internet.
    Semua anak berhak merasa aman dan dihargai.
  `;

  const handleNext = () => {
    completeLesson('lesson-1');
    onNavigate('lesson-2');
  };

  // Section 12: Focus Mode View (Shows exactly 1 card at a time with clean controls)
  if (readingMode === 'focus') {
    const activeCard = cardsData[focusCardIndex];
    const CardIcon = activeCard.icon;

    return (
      <LessonLayout
        lessonNumber={1}
        totalLessons={5}
        title="Kenali Jenis Bullying"
        subtitle="Focus Mode: Pelajari satu bagian dengan tenang tanpa distraksi."
        onBack={() => {
          if (focusCardIndex > 0) setFocusCardIndex(focusCardIndex - 1);
          else onNavigate('module');
        }}
        onNext={() => {
          if (focusCardIndex < cardsData.length - 1) setFocusCardIndex(focusCardIndex + 1);
          else handleNext();
        }}
        backLabel={focusCardIndex === 0 ? 'Kembali ke Modul' : 'Materi Sebelumnya'}
        nextLabel={focusCardIndex === cardsData.length - 1 ? 'Lanjut ke Bab 2' : 'Lanjut Materi Berikutnya'}
      >
        <Card padded style={{ borderLeft: `8px solid ${activeCard.color}`, backgroundColor: 'var(--bg-surface)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: '800', color: activeCard.color }}>
              BAGIAN {focusCardIndex + 1} DARI {cardsData.length}
            </span>
            <AudioListenButton text={activeCard.speech} title={activeCard.title} audioId={`focus-1-${activeCard.id}`} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: activeCard.bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center', color: activeCard.color }}>
              <CardIcon size={26} />
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--text-muted)' }}>{activeCard.subtitle}</div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: '900', color: 'var(--text-main)', margin: 0 }}>{activeCard.title}</h2>
            </div>
          </div>

          <p style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--primary)', lineHeight: '1.5', marginBottom: '20px' }}>
            “{activeCard.definition}”
          </p>

          <div style={{ padding: '16px', borderRadius: '12px', backgroundColor: 'var(--bg-subtle)', marginBottom: '16px' }}>
            <div style={{ fontWeight: '800', fontSize: '0.9rem', marginBottom: '8px', color: 'var(--text-main)' }}>Contoh Sederhana:</div>
            <ul style={{ paddingLeft: '20px', lineHeight: '1.7', color: 'var(--text-muted)' }}>
              {activeCard.examples.map((ex, i) => (
                <li key={i}>{ex}</li>
              ))}
            </ul>
          </div>

          <div style={{ padding: '12px 16px', borderRadius: '8px', backgroundColor: 'var(--bg-surface)', border: '1px dashed var(--border-light)', fontSize: '0.95rem', fontWeight: '600' }}>
            {activeCard.friendlyTip}
          </div>
        </Card>
      </LessonLayout>
    );
  }

  // Standard & Easy Reading View
  return (
    <LessonLayout
      lessonNumber={1}
      totalLessons={5}
      title="Kenali Jenis Bullying"
      subtitle="Bullying adalah perilaku yang dapat membuat seseorang merasa sedih, takut, atau tidak nyaman. Kenali jenis-jenisnya agar kita bisa saling melindungi."
      onBack={() => onNavigate('module')}
      onNext={handleNext}
      backLabel="Kembali ke Modul"
      nextLabel="Lanjut ke Bab 2: Pencegahan"
      customHeaderRight={
        <AudioListenButton
          text={fullLessonText}
          title="Seluruh Materi: Kenali Jenis Bullying"
          audioId="lesson1-full-narration"
          variant="accent"
        />
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {cardsData.map((card) => {
          const Icon = card.icon;
          const isExpanded = expandedCards[card.id];

          return (
            <Card
              key={card.id}
              padded={false}
              interactive
              onClick={() => toggleExpand(card.id)}
              style={{
                borderLeft: `6px solid ${card.color}`,
                overflow: 'hidden',
                backgroundColor: 'var(--bg-surface)',
              }}
            >
              <div
                style={{
                  padding: '20px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '12px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      minWidth: '48px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: card.bgColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: card.color,
                    }}
                  >
                    <Icon size={24} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.78rem', fontWeight: '800', color: card.color, textTransform: 'uppercase' }}>
                      {card.subtitle}
                    </span>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-main)', margin: '2px 0 4px' }}>
                      {card.title}
                    </h2>
                    <p style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: '500', margin: 0 }}>
                      “{card.definition}”
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <AudioListenButton
                    text={card.speech}
                    title={card.title}
                    audioId={`lesson1-${card.id}`}
                    size="sm"
                  />
                  <Button
                    size="sm"
                    variant="secondary"
                    icon={isExpanded ? ChevronUp : ChevronDown}
                    iconPosition="right"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleExpand(card.id);
                    }}
                  >
                    {isExpanded ? 'Tutup' : 'Pelajari'}
                  </Button>
                </div>
              </div>

              {isExpanded && (
                <div
                  style={{
                    padding: '20px 24px 24px',
                    borderTop: '1px solid var(--border-light)',
                    backgroundColor: 'var(--bg-subtle)',
                  }}
                >
                  <div style={{ marginBottom: '14px' }}>
                    <div style={{ fontSize: '0.88rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '8px' }}>
                      Contoh Situasi Sehari-Hari:
                    </div>
                    <ul style={{ paddingLeft: '20px', color: 'var(--text-muted)', lineHeight: '1.7' }}>
                      {card.examples.map((ex, i) => (
                        <li key={i}>{ex}</li>
                      ))}
                    </ul>
                  </div>

                  <div
                    style={{
                      padding: '12px 16px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-surface)',
                      border: '1px dashed var(--border-light)',
                      fontSize: '0.92rem',
                      color: 'var(--text-main)',
                      fontWeight: '600',
                    }}
                  >
                    {card.friendlyTip}
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </LessonLayout>
  );
};
