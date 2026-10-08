import React, { useState } from 'react';
import {
  HeartHandshake,
  Users2,
  Ban,
  MessageCircle,
  FileText,
} from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { AudioListenButton } from '../common/AudioListenButton';
import { LessonLayout } from '../common/LessonLayout';
import { useLearningProgress } from '../../context/LearningProgressContext';
import { useAccessibility } from '../../context/AccessibilityContext';

export const Lesson2Pencegahan = ({ onNavigate }) => {
  const { completeLesson } = useLearningProgress();
  const { readingMode } = useAccessibility();
  const [focusStepIndex, setFocusStepIndex] = useState(0);

  const stepsData = [
    {
      step: '01',
      title: 'BE KIND',
      subtitle: 'Tebarkan Kebaikan',
      motto: 'Gunakan kata-kata yang baik.',
      desc: 'Perkataan yang ramah dapat membuat hari seseorang menjadi lebih indah. Sapa teman dengan senyuman dan kata yang menyejukkan.',
      icon: HeartHandshake,
      color: '#5B5FEF',
      actionExample: 'Contoh: Mengucapkan "terima kasih", "tolong", dan memuji usaha teman saat belajar bersama.',
      speech: 'Langkah pertama: Be Kind. Gunakan kata-kata yang baik. Perkataan yang ramah membuat suasana belajar menjadi hangat dan menyenangkan.',
    },
    {
      step: '02',
      title: 'RESPECT',
      subtitle: 'Hargai Keberagaman',
      motto: 'Hargai teman dan perbedaan.',
      desc: 'Setiap anak istimewa dengan bakat, penampilan, dan cara belajar yang berbeda. Perbedaan bukanlah alasan untuk merendahkan.',
      icon: Users2,
      color: '#6CC5A3',
      actionExample: 'Contoh: Mengajak teman berkebutuhan khusus bermain bersama dan mendengarkan pendapatnya dengan sabar.',
      speech: 'Langkah kedua: Respect. Hargai teman dan perbedaan. Setiap anak istimewa dan memiliki hak yang sama untuk merasa dihargai.',
    },
    {
      step: '03',
      title: "DON'T JOIN",
      subtitle: 'Tolak Ikut-ikutan',
      motto: 'Jangan ikut mengejek atau menyakiti.',
      desc: 'Jika melihat seseorang diejek atau disendirikan, jangan ikut tertawa atau menonton saja. Keberanian dimulai dengan tidak berpihak pada perilaku buruk.',
      icon: Ban,
      color: '#EF476F',
      actionExample: 'Contoh: Tidak ikut menyebarkan kabar buruk atau menertawakan teman yang sedang melakukan kesalahan.',
      speech: 'Langkah ketiga: Don’t Join. Jangan ikut mengejek atau menyakiti. Jangan menjadi penonton yang membiarkan teman disakiti.',
    },
    {
      step: '04',
      title: 'TELL SOMEONE',
      subtitle: 'Minta Bantuan Dewasa',
      motto: 'Ceritakan kepada orang dewasa yang dipercaya.',
      desc: 'Meminta bantuan bukanlah tanda kelemahan, melainkan tanda keberanian yang bijak. Laporkan situasi yang tidak aman kepada guru atau orang tua.',
      icon: MessageCircle,
      color: '#FFD166',
      actionExample: 'Contoh: Berbicara dengan guru kelas, guru pendamping, atau orang tua ketika kamu merasa tidak nyaman.',
      speech: 'Langkah keempat: Tell Someone. Ceritakan kepada orang dewasa yang dipercaya. Meminta bantuan adalah langkah bijak yang melindungi kita semua.',
    },
  ];

  const fullLessonText = `
    Pelajaran 2: Bagaimana Mencegah Bullying?
    Ada empat langkah penting:
    Langkah 1: Be Kind. Gunakan kata-kata yang baik.
    Langkah 2: Respect. Hargai teman dan perbedaan.
    Langkah 3: Don’t Join. Jangan ikut mengejek atau menyakiti.
    Langkah 4: Tell Someone. Ceritakan kepada orang dewasa yang dipercaya.
    Dengan saling menjaga, lingkungan sekolah kita menjadi tempat yang aman untuk semua anak.
  `;

  const handleNext = () => {
    completeLesson('lesson-2');
    onNavigate('lesson-3');
  };

  // Section 12: Focus Mode View
  if (readingMode === 'focus') {
    const activeStep = stepsData[focusStepIndex];
    const StepIcon = activeStep.icon;

    return (
      <LessonLayout
        lessonNumber={2}
        totalLessons={5}
        title="Bagaimana Mencegah Bullying?"
        subtitle="Focus Mode: Pelajari langkah pencegahan satu demi satu."
        onBack={() => {
          if (focusStepIndex > 0) setFocusStepIndex(focusStepIndex - 1);
          else onNavigate('lesson-1');
        }}
        onNext={() => {
          if (focusStepIndex < stepsData.length - 1) setFocusStepIndex(focusStepIndex + 1);
          else handleNext();
        }}
        backLabel={focusStepIndex === 0 ? 'Kembali ke Bab 1' : 'Langkah Sebelumnya'}
        nextLabel={focusStepIndex === stepsData.length - 1 ? 'Lanjut ke Bab 3' : 'Langkah Berikutnya'}
      >
        <Card padded style={{ borderTop: `8px solid ${activeStep.color}`, backgroundColor: 'var(--bg-surface)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ fontSize: '1.8rem', fontWeight: '900', color: activeStep.color, fontFamily: 'monospace' }}>
              LANGKAH {activeStep.step}
            </span>
            <AudioListenButton text={activeStep.speech} title={activeStep.title} audioId={`focus-2-${activeStep.step}`} />
          </div>

          <div style={{ fontSize: '0.82rem', fontWeight: '800', color: activeStep.color, textTransform: 'uppercase' }}>
            {activeStep.subtitle}
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: '900', color: 'var(--text-main)', margin: '4px 0 10px' }}>
            {activeStep.title}
          </h2>

          <p style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--primary)', marginBottom: '16px' }}>
            “{activeStep.motto}”
          </p>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '20px' }}>
            {activeStep.desc}
          </p>

          <div style={{ padding: '14px 18px', borderRadius: '10px', backgroundColor: 'var(--bg-subtle)', borderLeft: `4px solid ${activeStep.color}`, fontSize: '0.95rem' }}>
            {activeStep.actionExample}
          </div>
        </Card>
      </LessonLayout>
    );
  }

  // Standard & Easy Reading View
  return (
    <LessonLayout
      lessonNumber={2}
      totalLessons={5}
      title="Bagaimana Mencegah Bullying?"
      subtitle="Mencegah bullying dimulai dari hal-hal baik yang kita lakukan setiap hari. Ikuti 4 langkah sederhana ini."
      onBack={() => onNavigate('lesson-1')}
      onNext={handleNext}
      backLabel="Kembali ke Bab 1"
      nextLabel="Lanjut ke Bab 3: Self-Love"
      customHeaderRight={
        <AudioListenButton
          text={fullLessonText}
          title="Seluruh Materi: 4 Langkah Mencegah Bullying"
          audioId="lesson2-full-narration"
          variant="accent"
        />
      }
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
        }}
      >
        {stepsData.map((item) => {
          const Icon = item.icon;

          return (
            <Card
              key={item.step}
              padded
              style={{
                borderTop: `6px solid ${item.color}`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                backgroundColor: 'var(--bg-surface)',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <span style={{ fontSize: '1.6rem', fontWeight: '900', color: item.color, fontFamily: 'monospace' }}>
                    {item.step}
                  </span>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: item.color,
                    }}
                  >
                    <Icon size={22} />
                  </div>
                </div>

                <div style={{ fontSize: '0.78rem', fontWeight: '800', color: item.color, textTransform: 'uppercase' }}>
                  {item.subtitle}
                </div>
                <h2 style={{ fontSize: '1.35rem', fontWeight: '900', color: 'var(--text-main)', margin: '2px 0 8px' }}>
                  {item.title}
                </h2>
                <p style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--primary)', marginBottom: '10px' }}>
                  “{item.motto}”
                </p>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '16px' }}>
                  {item.desc}
                </p>

                <div
                  style={{
                    backgroundColor: 'var(--bg-subtle)',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.85rem',
                    color: 'var(--text-main)',
                    lineHeight: '1.5',
                    borderLeft: `3px solid ${item.color}`,
                  }}
                >
                  {item.actionExample}
                </div>
              </div>

              <div style={{ marginTop: '20px', paddingTop: '14px', borderTop: '1px solid var(--border-light)' }}>
                <AudioListenButton
                  text={item.speech}
                  title={`Langkah ${item.step}: ${item.title}`}
                  audioId={`lesson2-step-${item.step}`}
                  size="sm"
                />
              </div>
            </Card>
          );
        })}
      </div>
    </LessonLayout>
  );
};
