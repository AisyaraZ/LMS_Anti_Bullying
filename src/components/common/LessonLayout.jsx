import React from 'react';
import { ArrowLeft, ArrowRight, BookOpen, Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from './Button';
import { ProgressBar } from './ProgressBar';
import { useAccessibility } from '../../context/AccessibilityContext';

export const LessonLayout = ({
  lessonNumber = 1,
  totalLessons = 5,
  title,
  subtitle,
  children,
  onBack,
  onNext,
  backLabel = 'Kembali',
  nextLabel = 'Lanjut',
  isNextDisabled = false,
  customHeaderRight,
  showRoadmapPrompt = true,
}) => {
  const { readingMode } = useAccessibility();
  const progressPercent = Math.round((lessonNumber / totalLessons) * 100);

  return (
    <div className={`lesson-container ${readingMode === 'focus' ? 'focus-container' : ''}`} style={{ width: '100%' }}>
      {/* 1. Standardized Lesson Header (Section 15: Atas) */}
      <div
        style={{
          marginBottom: '28px',
          paddingBottom: '20px',
          borderBottom: '1.5px solid var(--border-light)',
        }}
      >
        {/* Top Meta: Module Title, Lesson Indicator, and Custom Quick Action */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
            marginBottom: '14px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                backgroundColor: 'var(--primary-light)',
                color: 'var(--primary)',
                padding: '4px 10px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.8rem',
                fontWeight: '800',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              Anti-Bullying
            </span>
            <span
              style={{
                backgroundColor: 'var(--bg-subtle)',
                color: 'var(--text-main)',
                border: '1px solid var(--border-light)',
                padding: '4px 12px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.82rem',
                fontWeight: '800',
              }}
            >
              Lesson {lessonNumber} of {totalLessons}
            </span>
            {readingMode === 'easy' && (
              <span
                style={{
                  backgroundColor: 'var(--secondary-light)',
                  color: '#064E3B',
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.75rem',
                  fontWeight: '800',
                }}
              >
                📖 Easy Reading Aktif
              </span>
            )}
          </div>

          {customHeaderRight && <div>{customHeaderRight}</div>}
        </div>

        {/* Progress Bar (Always consistent on top) */}
        <ProgressBar
          value={progressPercent}
          max={100}
          label={`Kemajuan Bab ${lessonNumber}`}
          color="var(--primary)"
          height="10px"
          showLabel={false}
        />

        {/* Title & Subtitle */}
        <div style={{ marginTop: '20px' }}>
          <h1
            style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)',
              fontWeight: '900',
              color: 'var(--text-main)',
              lineHeight: 1.2,
              marginBottom: subtitle ? '8px' : '0',
            }}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              style={{
                fontSize: '1.05rem',
                color: 'var(--text-muted)',
                lineHeight: '1.6',
              }}
            >
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* 2. Middle Content: Lesson Material (Section 15: Tengah) */}
      <div style={{ marginBottom: '40px' }}>
        {children}
      </div>

      {/* 3. Standardized Lesson Footer (Section 15: Bawah: [← Kembali] [Lanjut →]) */}
      <footer
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          paddingTop: '24px',
          borderTop: '2px solid var(--border-light)',
          marginTop: '40px',
        }}
      >
        {onBack ? (
          <Button
            variant="secondary"
            size="md"
            icon={ArrowLeft}
            iconPosition="left"
            onClick={onBack}
          >
            {backLabel}
          </Button>
        ) : (
          <div />
        )}

        {onNext && (
          <Button
            variant="primary"
            size="md"
            icon={ArrowRight}
            iconPosition="right"
            onClick={onNext}
            disabled={isNextDisabled}
          >
            {nextLabel}
          </Button>
        )}
      </footer>
    </div>
  );
};
