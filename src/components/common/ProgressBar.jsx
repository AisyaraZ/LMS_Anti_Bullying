import React from 'react';

export const ProgressBar = ({
  value = 0,
  max = 100,
  label,
  sublabel,
  color = 'var(--primary)',
  height = '14px',
  showLabel = true,
  className = '',
}) => {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  return (
    <div className={`aksara-progress-container ${className}`} style={{ width: '100%' }}>
      {showLabel && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '8px',
            fontSize: '0.95rem',
            fontWeight: '600',
            color: 'var(--text-main)',
          }}
        >
          <span>{label || 'Kemajuan Belajar'}</span>
          <span
            style={{
              color: 'var(--primary)',
              backgroundColor: 'var(--primary-light)',
              padding: '2px 10px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.85rem',
              fontWeight: '700',
            }}
          >
            {percentage}%
          </span>
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-label={label || 'Kemajuan Belajar'}
        style={{
          width: '100%',
          height: height,
          backgroundColor: 'var(--bg-subtle)',
          borderRadius: 'var(--radius-full)',
          overflow: 'hidden',
          border: '1px solid var(--border-light)',
          position: 'relative',
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            height: '100%',
            backgroundColor: color,
            borderRadius: 'var(--radius-full)',
            transition: 'width 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 100%)',
          }}
        />
      </div>
      {sublabel && (
        <div
          style={{
            marginTop: '6px',
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          {sublabel}
        </div>
      )}
    </div>
  );
};
