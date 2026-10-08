import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  Sparkles,
  RefreshCw,
  HelpCircle,
  FileText,
} from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { AudioListenButton } from '../common/AudioListenButton';
import { LessonLayout } from '../common/LessonLayout';
import { useLearningProgress } from '../../context/LearningProgressContext';

export const ActivityPage = ({ onNavigate }) => {
  const { completeActivity } = useLearningProgress();

  const scenarios = [
    {
      id: 1,
      title: 'Situasi 1: Di Lapangan Sekolah',
      situation:
        'Seorang teman mengejekmu dan membuatmu merasa tidak nyaman. Apa yang sebaiknya kamu lakukan?',
      options: [
        {
          key: 'A',
          text: 'Membalas dengan mengejek lebih keras.',
          isCorrect: false,
          explanation: 'Membalas mengejek bisa membuat suasana semakin tegang dan tidak membuatmu aman.',
        },
        {
          key: 'B',
          text: 'Diam saja dan menyimpan kesedihan semuanya sendiri.',
          isCorrect: false,
          explanation: 'Menyimpan kesedihan sendiri bisa membuatmu tertekan. Kamu berhak didengar dan dibantu.',
        },
        {
          key: 'C',
          text: 'Menjauh dari teman tersebut dan meminta bantuan orang dewasa yang dipercaya.',
          isCorrect: true,
          explanation: 'Bagus! Meminta bantuan orang dewasa adalah pilihan yang aman dan sangat bijaksana.',
        },
      ],
      correctFeedback: '✓ Pilihanmu Benar! Meminta bantuan adalah pilihan yang aman.',
      gentleFeedback: 'Tidak apa-apa. Coba pikirkan pilihan yang membuatmu tetap aman.',
    },
    {
      id: 2,
      title: 'Situasi 2: Di Ruang Kelas',
      situation:
        'Saat jam istirahat, kamu melihat ada teman yang sendirian di pojok kelas dan ada yang menertawakannya. Apa tindakan terbaik yang bisa kamu lakukan?',
      options: [
        {
          key: 'A',
          text: 'Ikut menertawakan agar dianggap keren oleh teman lain.',
          isCorrect: false,
          explanation: 'Ikut menertawakan dapat menyakiti hati temanmu yang sedang sedih.',
        },
        {
          key: 'B',
          text: 'Mendekati teman tersebut dengan ramah, mengajaknya bicara, atau memberitahu bapak/ibu guru.',
          isCorrect: true,
          explanation: 'Hebat sekali! Menunjukkan empati membuktikan bahwa kamu adalah sahabat yang baik.',
        },
        {
          key: 'C',
          text: 'Pura-pura tidak melihat dan langsung pergi meninggalkan kelas.',
          isCorrect: false,
          explanation: 'Kita bisa berbuat lebih baik dengan memberitahu bapak/ibu guru agar teman tersebut terbantu.',
        },
      ],
      correctFeedback: '✓ Hebat! Sikap pedulimu menghadirkan kehangatan bagi teman di kelas.',
      gentleFeedback: 'Tidak apa-apa. Mari kita coba pilih tindakan yang ramah dan saling mendukung.',
    },
  ];

  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [selectedOptionKey, setSelectedOptionKey] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const currentScenario = scenarios[currentScenarioIndex];

  const handleSelectOption = (key) => {
    setSelectedOptionKey(key);
    setSubmitted(false);
  };

  const handleSubmit = () => {
    if (!selectedOptionKey) return;
    setSubmitted(true);

    const chosenOption = currentScenario.options.find((opt) => opt.key === selectedOptionKey);
    if (chosenOption && chosenOption.isCorrect) {
      completeActivity(`act-${currentScenario.id}`);
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.65 },
        });
      } catch (e) {
        // Fallback
      }
    }
  };

  const handleNextStep = () => {
    if (currentScenarioIndex < scenarios.length - 1) {
      setCurrentScenarioIndex(currentScenarioIndex + 1);
      setSelectedOptionKey(null);
      setSubmitted(false);
    } else {
      onNavigate('reflection');
    }
  };

  const selectedOpt = currentScenario.options.find((opt) => opt.key === selectedOptionKey);
  const isAnswerCorrect = selectedOpt ? selectedOpt.isCorrect : false;

  return (
    <LessonLayout
      lessonNumber={4}
      totalLessons={5}
      title="Pilih Tindakan yang Tepat"
      subtitle={`Latihan Interaktif (${currentScenarioIndex + 1} dari ${scenarios.length}): Berlatih mengambil keputusan yang aman dan bijak dalam situasi sehari-hari.`}
      onBack={() => {
        if (currentScenarioIndex > 0) {
          setCurrentScenarioIndex(currentScenarioIndex - 1);
          setSelectedOptionKey(null);
          setSubmitted(false);
        } else {
          onNavigate('lesson-3');
        }
      }}
      onNext={handleNextStep}
      backLabel={currentScenarioIndex > 0 ? 'Situasi Sebelumnya' : 'Kembali ke Bab 3'}
      nextLabel={currentScenarioIndex < scenarios.length - 1 ? 'Lanjut ke Situasi 2' : 'Lanjut ke Refleksi Diri'}
      isNextDisabled={!submitted || !isAnswerCorrect}
    >
      <Card padded style={{ backgroundColor: 'var(--bg-surface)' }}>
        {/* Scenario Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
          <span
            style={{
              backgroundColor: 'var(--primary-light)',
              color: 'var(--primary)',
              padding: '4px 10px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.85rem',
              fontWeight: '800',
            }}
          >
            {currentScenario.title}
          </span>

          <AudioListenButton
            text={`Situasi: ${currentScenario.situation}`}
            title={currentScenario.title}
            audioId={`act-scenario-${currentScenario.id}`}
            size="sm"
          />
        </div>

        {/* Situation Description */}
        <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-main)', lineHeight: '1.6', marginBottom: '24px' }}>
          “{currentScenario.situation}”
        </h2>

        {/* Options (Minimum 48px touch target) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
          {currentScenario.options.map((option) => {
            const isSelected = selectedOptionKey === option.key;

            let borderColor = 'var(--border-light)';
            let bgColor = 'var(--bg-surface)';

            if (isSelected && !submitted) {
              borderColor = 'var(--primary)';
              bgColor = 'var(--primary-light)';
            } else if (submitted && isSelected) {
              borderColor = option.isCorrect ? 'var(--secondary)' : 'var(--accent)';
              bgColor = option.isCorrect ? 'var(--secondary-light)' : 'var(--accent-light)';
            }

            return (
              <button
                key={option.key}
                type="button"
                onClick={() => handleSelectOption(option.key)}
                style={{
                  minHeight: 'var(--touch-target)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '14px 18px',
                  borderRadius: 'var(--radius-lg)',
                  border: `2px solid ${borderColor}`,
                  backgroundColor: bgColor,
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'var(--transition-smooth)',
                }}
              >
                <span
                  style={{
                    width: '36px',
                    height: '36px',
                    minWidth: '36px',
                    borderRadius: '50%',
                    backgroundColor: isSelected ? 'var(--primary)' : 'var(--bg-subtle)',
                    color: isSelected ? '#FFFFFF' : 'var(--text-main)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '800',
                    fontSize: '1rem',
                  }}
                >
                  {option.key}
                </span>

                <span style={{ fontSize: '1.02rem', fontWeight: isSelected ? '800' : '500', color: 'var(--text-main)', flex: 1, lineHeight: '1.4' }}>
                  {option.text}
                </span>

                {submitted && isSelected && option.isCorrect && (
                  <CheckCircle2 size={24} color="var(--secondary)" />
                )}
              </button>
            );
          })}
        </div>

        {/* Submit Verification Button */}
        {!submitted && (
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              size="md"
              variant="primary"
              disabled={!selectedOptionKey}
              onClick={handleSubmit}
            >
              Periksa Pilihan Saya ✨
            </Button>
          </div>
        )}

        {/* Positive & Gentle Feedback Card (Section 19 & 21: Icon + Text feedback) */}
        {submitted && (
          <div
            style={{
              padding: '18px 20px',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: isAnswerCorrect ? 'var(--secondary-light)' : 'var(--accent-light)',
              border: `2px solid ${isAnswerCorrect ? 'var(--secondary)' : 'var(--accent)'}`,
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              animation: 'fadeIn 0.25s ease',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '1.8rem' }}>{isAnswerCorrect ? '🌟' : '🌱'}</span>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: isAnswerCorrect ? '#065F46' : '#713F12', margin: 0 }}>
                    {isAnswerCorrect ? currentScenario.correctFeedback : currentScenario.gentleFeedback}
                  </h3>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-main)', margin: '4px 0 0' }}>
                    {selectedOpt.explanation}
                  </p>
                </div>
              </div>

              <AudioListenButton
                text={isAnswerCorrect ? `${currentScenario.correctFeedback} ${selectedOpt.explanation}` : `${currentScenario.gentleFeedback} ${selectedOpt.explanation}`}
                title="Dengarkan Umpan Balik"
                audioId={`act-feedback-${currentScenario.id}`}
                size="sm"
              />
            </div>

            {!isAnswerCorrect && (
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6px' }}>
                <Button size="sm" variant="secondary" icon={RefreshCw} onClick={() => { setSelectedOptionKey(null); setSubmitted(false); }}>
                  Coba Pilihan Lain
                </Button>
              </div>
            )}
          </div>
        )}
      </Card>
    </LessonLayout>
  );
};
