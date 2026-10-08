import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Heart,
  Shield,
  MessageCircle,
  Users2,
  CheckCircle2,
  Sparkles,
  Award,
} from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { AudioListenButton } from '../common/AudioListenButton';
import { LessonLayout } from '../common/LessonLayout';
import { useLearningProgress } from '../../context/LearningProgressContext';

export const ReflectionPage = ({ onNavigate }) => {
  const { saveReflection, userProfile } = useLearningProgress();

  const reflectionOptions = [
    {
      id: 'berharga',
      emoji: '❤️',
      icon: Heart,
      title: 'Aku berharga',
      desc: 'Aku memiliki nilai diri yang istimewa dan pantas dihormati.',
      color: '#EF476F',
      bgColor: 'var(--danger-light)',
    },
    {
      id: 'menjaga',
      emoji: '🛡️',
      icon: Shield,
      title: 'Aku harus menjaga diri',
      desc: 'Aku berhak merasa aman dan boleh menjauh dari hal yang tidak nyaman.',
      color: '#5B5FEF',
      bgColor: 'var(--primary-light)',
    },
    {
      id: 'bantuan',
      emoji: '💬',
      icon: MessageCircle,
      title: 'Aku boleh meminta bantuan',
      desc: 'Aku tidak sendiri. Ada guru dan orang tua yang siap mendengarkanku.',
      color: '#6CC5A3',
      bgColor: 'var(--secondary-light)',
    },
    {
      id: 'menghargai',
      emoji: '🤝',
      icon: Users2,
      title: 'Aku harus menghargai orang lain',
      desc: 'Aku akan selalu bertutur kata baik dan merangkul semua teman.',
      color: '#FFD166',
      bgColor: 'var(--accent-light)',
    },
  ];

  const [selectedIds, setSelectedIds] = useState(['berharga', 'menjaga', 'bantuan', 'menghargai']);
  const [committed, setCommitted] = useState(false);

  const toggleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleSaveReflection = () => {
    saveReflection(selectedIds);
    setCommitted(true);
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
      });
    } catch (e) {
      // Fallback
    }
  };

  const reflectionSpeech =
    'Hari ini aku belajar bahwa: Aku berharga, aku harus menjaga diri, aku boleh meminta bantuan, dan aku harus menghargai orang lain.';

  return (
    <LessonLayout
      lessonNumber={5}
      totalLessons={5}
      title="Let’s Take Care of Ourselves"
      subtitle="Hari ini aku belajar bahwa... Pilih hal-hal baik yang kamu rasakan dan pelajari hari ini."
      onBack={() => onNavigate('activity')}
      onNext={() => onNavigate('progress')}
      backLabel="Kembali ke Aktivitas"
      nextLabel="Lihat Rapor Belajar & Sertifikat"
      customHeaderRight={
        <AudioListenButton
          text={reflectionSpeech}
          title="Narasi Refleksi Diri"
          audioId="reflection-audio"
          variant="accent"
        />
      }
    >
      {/* 4 Multi-Select Commitment Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '18px',
          marginBottom: '32px',
        }}
      >
        {reflectionOptions.map((opt) => {
          const isSelected = selectedIds.includes(opt.id);

          return (
            <Card
              key={opt.id}
              interactive
              onClick={() => toggleSelect(opt.id)}
              style={{
                border: isSelected ? `2.5px solid ${opt.color}` : '2px solid var(--border-light)',
                backgroundColor: isSelected ? opt.bgColor : 'var(--bg-surface)',
                padding: '22px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'var(--transition-smooth)',
                minHeight: '160px',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <span style={{ fontSize: '2.2rem' }}>{opt.emoji}</span>
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: isSelected ? opt.color : 'var(--bg-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFFFFF',
                    }}
                  >
                    {isSelected && <CheckCircle2 size={18} />}
                  </div>
                </div>

                <h2 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--text-main)', margin: '0 0 6px' }}>
                  {opt.title}
                </h2>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5', margin: 0 }}>
                  {opt.desc}
                </p>
              </div>

              <div style={{ marginTop: '16px', paddingTop: '10px', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: '700', color: isSelected ? 'var(--text-main)' : 'var(--text-light)' }}>
                  {isSelected ? '✓ Terpilih dalam komitmen' : 'Ketuk untuk memilih'}
                </span>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Confirmation & Commitment Box */}
      <Card padded style={{ backgroundColor: 'var(--bg-surface)', border: '2px solid var(--secondary)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <Award size={20} color="var(--secondary)" />
              <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-main)', margin: 0 }}>
                Ikrar Sahabat AKSARA • {userProfile.name}
              </h3>
            </div>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', margin: 0 }}>
              {selectedIds.length} komitmen kebaikan terpilih untuk menjaga diri dan menghargai orang lain.
            </p>
          </div>

          <Button
            size="md"
            variant="secondary"
            icon={Heart}
            onClick={handleSaveReflection}
          >
            {committed ? 'Janji Tersimpan ❤️' : 'Simpan Janji Kebaikan'}
          </Button>
        </div>
      </Card>
    </LessonLayout>
  );
};
