import React, { useState } from 'react';
import {
  Heart,
  Shield,
  Hand,
  MessageCircle,
  Sprout,
  CheckCircle2,
  Sparkles,
  Smile,
  ShieldCheck,
} from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { AudioListenButton } from '../common/AudioListenButton';
import { LessonLayout } from '../common/LessonLayout';
import { useLearningProgress } from '../../context/LearningProgressContext';
import { useAccessibility } from '../../context/AccessibilityContext';

export const Lesson3SelfLove = ({ onNavigate }) => {
  const { completeLesson } = useLearningProgress();
  const { readingMode } = useAccessibility();
  const [focusAffirmationIndex, setFocusAffirmationIndex] = useState(0);

  // Practiced affirmations state (Tap to store in heart)
  const [practicedAffirmations, setPracticedAffirmations] = useState({
    berharga: true,
    aman: false,
    tidak: false,
    bantuan: false,
    menjaga: false,
  });

  // Section 9: Tunawicara feeling check-in (Tap without speaking)
  const [selectedFeeling, setSelectedFeeling] = useState(null);

  const affirmationCards = [
    {
      id: 'berharga',
      icon: Heart,
      iconEmoji: '❤️',
      title: 'Aku Berharga',
      affirmation: '“Aku adalah seseorang yang berharga.”',
      explanation: 'Kamu unik, memiliki kebaikan di hatimu, dan berhak dicintai tanpa syarat oleh orang-orang di sekitarmu.',
      speech: 'Aku Berharga. Aku adalah seseorang yang berharga dan istimewa dengan segala kebaikanku.',
      color: '#EF476F',
      bgColor: 'var(--danger-light)',
    },
    {
      id: 'aman',
      icon: Shield,
      iconEmoji: '🛡️',
      title: 'Aku Berhak Merasa Aman',
      affirmation: '“Aku boleh menjauh dari sesuatu yang membuatku tidak nyaman.”',
      explanation: 'Keamanan diri adalah hakmu. Jika ada tempat, perkataan, atau perlakuan yang membuatmu cemas, kamu boleh mencari tempat yang aman.',
      speech: 'Aku Berhak Merasa Aman. Aku boleh menjauh dari sesuatu yang membuatku tidak nyaman.',
      color: '#5B5FEF',
      bgColor: 'var(--primary-light)',
    },
    {
      id: 'tidak',
      icon: Hand,
      iconEmoji: '✋',
      title: 'Aku Boleh Berkata Tidak',
      affirmation: '“Aku boleh mengatakan tidak ketika sesuatu membuatku tidak nyaman.”',
      explanation: 'Suaramu berharga. Berkata "Tidak, tolong jangan lakukan itu" adalah bentuk ketegasan yang baik dan terhormat.',
      speech: 'Aku Boleh Berkata Tidak. Aku boleh mengatakan tidak dengan tenang ketika ada perlakuan yang membuatku tidak nyaman.',
      color: '#FFD166',
      bgColor: 'var(--accent-light)',
    },
    {
      id: 'bantuan',
      icon: MessageCircle,
      iconEmoji: '💬',
      title: 'Aku Boleh Meminta Bantuan',
      affirmation: '“Aku tidak harus menghadapi masalah sendirian.”',
      explanation: 'Selalu ada orang dewasa yang peduli—seperti orang tua, guru, atau konselor—yang siap mendengarkan dan melindungimu.',
      speech: 'Aku Boleh Meminta Bantuan. Aku tidak harus menghadapi masalah sendirian. Orang dewasa yang kupercaya siap membantuku.',
      color: '#6CC5A3',
      bgColor: 'var(--secondary-light)',
    },
    {
      id: 'menjaga',
      icon: Sprout,
      iconEmoji: '🌱',
      title: 'Aku Menjaga Diriku',
      affirmation: '“Aku menjaga tubuh, pikiran, dan perasaanku.”',
      explanation: 'Self-love berarti istirahat saat lelah, makan makanan bergizi, dan mengelilingi diri dengan teman-teman yang suportif.',
      speech: 'Aku Menjaga Diriku. Aku menjaga tubuh, pikiran, dan perasaanku agar tetap sehat dan bahagia.',
      color: '#8B5CF6',
      bgColor: '#F3E8FF',
    },
  ];

  const fullLessonSpeech = `
    Pelajaran 3: Sayangi dan Jaga Dirimu.
    Self-love bukan hanya tentang merasa percaya diri, tetapi juga mengetahui cara menjaga diri.
    Katakan pada dirimu sendiri:
    Satu, Aku Berharga.
    Dua, Aku Berhak Merasa Aman.
    Tiga, Aku Boleh Berkata Tidak.
    Empat, Aku Boleh Meminta Bantuan.
    Lima, Aku Menjaga Diriku.
    Kamu adalah anak yang hebat dan berharga.
  `;

  const togglePractice = (id) => {
    setPracticedAffirmations((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleNext = () => {
    completeLesson('lesson-3');
    onNavigate('activity');
  };

  // Section 12: Focus Mode View
  if (readingMode === 'focus') {
    const activeCard = affirmationCards[focusAffirmationIndex];

    return (
      <LessonLayout
        lessonNumber={3}
        totalLessons={5}
        title="Sayangi dan Jaga Dirimu"
        subtitle="Focus Mode: Renungkan satu afirmasi perlindungan diri dengan tenang."
        onBack={() => {
          if (focusAffirmationIndex > 0) setFocusAffirmationIndex(focusAffirmationIndex - 1);
          else onNavigate('lesson-2');
        }}
        onNext={() => {
          if (focusAffirmationIndex < affirmationCards.length - 1) setFocusAffirmationIndex(focusAffirmationIndex + 1);
          else handleNext();
        }}
        backLabel={focusAffirmationIndex === 0 ? 'Kembali ke Bab 2' : 'Afirmasi Sebelumnya'}
        nextLabel={focusAffirmationIndex === affirmationCards.length - 1 ? 'Lanjut ke Aktivitas' : 'Afirmasi Berikutnya'}
      >
        <Card padded style={{ borderLeft: `8px solid ${activeCard.color}`, backgroundColor: 'var(--bg-surface)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: '800', color: activeCard.color }}>
              AFIRMASI {focusAffirmationIndex + 1} DARI {affirmationCards.length}
            </span>
            <AudioListenButton text={activeCard.speech} title={activeCard.title} audioId={`focus-3-${activeCard.id}`} />
          </div>

          <div style={{ fontSize: '3rem', marginBottom: '10px' }}>{activeCard.iconEmoji}</div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: '900', color: 'var(--text-main)', marginBottom: '8px' }}>
            {activeCard.title}
          </h2>

          <p style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--primary)', lineHeight: '1.4', marginBottom: '16px' }}>
            {activeCard.affirmation}
          </p>

          <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '24px' }}>
            {activeCard.explanation}
          </p>

          <Button
            size="md"
            variant={practicedAffirmations[activeCard.id] ? 'secondary' : 'primary'}
            icon={practicedAffirmations[activeCard.id] ? CheckCircle2 : Sparkles}
            onClick={() => togglePractice(activeCard.id)}
          >
            {practicedAffirmations[activeCard.id] ? '✓ Tersimpan dalam Hati' : 'Simpan Afirmasi Ini (Tap)'}
          </Button>
        </Card>
      </LessonLayout>
    );
  }

  // Standard & Easy Reading View
  return (
    <LessonLayout
      lessonNumber={3}
      totalLessons={5}
      title="Sayangi dan Jaga Dirimu"
      subtitle="Self-love bukan hanya tentang merasa percaya diri, tetapi juga mengetahui cara menjaga diri dari hal-hal yang membuatmu tidak nyaman."
      onBack={() => onNavigate('lesson-2')}
      onNext={handleNext}
      backLabel="Kembali ke Bab 2"
      nextLabel="Lanjut ke Aktivitas Pilihan Aman"
      customHeaderRight={
        <AudioListenButton
          text={fullLessonSpeech}
          title="Seluruh Materi: Sayangi dan Jaga Dirimu"
          audioId="lesson3-full-narration"
          variant="accent"
        />
      }
    >
      {/* 5 Affirmation Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginBottom: '36px' }}>
        {affirmationCards.map((card) => {
          const isPracticed = practicedAffirmations[card.id];

          return (
            <Card
              key={card.id}
              padded
              interactive
              onClick={() => togglePractice(card.id)}
              style={{
                borderLeft: `6px solid ${card.color}`,
                backgroundColor: isPracticed ? 'var(--primary-light)' : 'var(--bg-surface)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: '16px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', flex: 1, minWidth: '260px' }}>
                  <div
                    style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: card.bgColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.6rem',
                      flexShrink: 0,
                    }}
                  >
                    {card.iconEmoji}
                  </div>
                  <div>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-main)', margin: '0 0 4px' }}>
                      {card.title}
                    </h2>
                    <p style={{ fontSize: '1.08rem', fontWeight: '800', color: 'var(--primary)', margin: '0 0 6px', lineHeight: '1.4' }}>
                      {card.affirmation}
                    </p>
                    <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
                      {card.explanation}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <AudioListenButton
                    text={card.speech}
                    title={card.title}
                    audioId={`lesson3-${card.id}`}
                    size="sm"
                  />

                  <Button
                    size="sm"
                    variant={isPracticed ? 'secondary' : 'tertiary'}
                    icon={isPracticed ? CheckCircle2 : Sparkles}
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePractice(card.id);
                    }}
                  >
                    {isPracticed ? 'Disimpan ✓' : 'Pilih Afirmasi'}
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Section 9: Tunawicara Non-Spoken Feeling Check-in */}
      <Card padded style={{ backgroundColor: 'var(--bg-subtle)', border: '1.5px dashed var(--secondary)' }}>
        <div style={{ marginBottom: '14px' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--secondary)', textTransform: 'uppercase', marginBottom: '4px' }}>
            Check-In Perasaan (Aksesibel Tunawicara)
          </div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-main)', margin: 0 }}>
            Bagaimana perasaanmu setelah mempelajari self-love hari ini?
          </h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
          {[
            { key: 'safe', emoji: '🛡️', text: 'Aku Merasa Lebih Aman', feedback: 'Hebat! Kamu tahu hakmu untuk selalu terlindungi.' },
            { key: 'happy', emoji: '😊', text: 'Aku Tahu Aku Berharga', feedback: 'Bagus sekali! Kamu anak yang istimewa dan bernilai tinggi.' },
            { key: 'ask', emoji: '💬', text: 'Aku Berani Minta Bantuan', feedback: 'Luar biasa! Orang dewasa terpercaya siap membantumu kapan saja.' },
          ].map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setSelectedFeeling(item)}
              style={{
                minHeight: '48px',
                padding: '12px 14px',
                borderRadius: 'var(--radius-md)',
                border: '2px solid',
                borderColor: selectedFeeling?.key === item.key ? 'var(--secondary)' : 'var(--border-light)',
                backgroundColor: selectedFeeling?.key === item.key ? 'var(--secondary-light)' : 'var(--bg-surface)',
                color: selectedFeeling?.key === item.key ? '#044E36' : 'var(--text-main)',
                fontWeight: '700',
                fontSize: '0.92rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                textAlign: 'left',
                transition: 'var(--transition-smooth)',
              }}
            >
              <span style={{ fontSize: '1.3rem' }}>{item.emoji}</span>
              <span>{item.text}</span>
            </button>
          ))}
        </div>

        {selectedFeeling && (
          <div
            style={{
              marginTop: '14px',
              padding: '12px 16px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-light)',
              fontSize: '0.92rem',
              color: 'var(--text-main)',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <CheckCircle2 size={18} color="var(--secondary)" />
            <span>{selectedFeeling.feedback}</span>
          </div>
        )}
      </Card>
    </LessonLayout>
  );
};
