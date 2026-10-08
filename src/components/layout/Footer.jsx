import React from 'react';
import { Heart, Award, Shield, Sparkles } from 'lucide-react';

export const Footer = ({ onNavigate }) => {
  return (
    <footer
      className="hide-on-print"
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderTop: '1.5px solid var(--border-light)',
        padding: '36px 24px 80px', // padding bottom for mobile nav or audio player
        marginTop: '60px',
        transition: 'var(--transition-smooth)',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '24px',
        }}
      >
        {/* Brand & Tagline */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                fontWeight: '900',
                fontSize: '0.9rem',
              }}
            >
              A
            </span>
            <span style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-main)' }}>
              AKSARA
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              • Adaptive Learning System for Inclusive Education
            </span>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            “Belajar dengan Cara yang Sesuai untuk Setiap Anak.”
          </p>
        </div>

        {/* Competition Banner Info */}
        <div style={{ textAlign: 'right' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'var(--bg-subtle)',
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.8rem',
              fontWeight: '700',
              color: 'var(--text-main)',
              border: '1px solid var(--border-light)',
            }}
          >
            <Award size={14} color="var(--primary)" />
            <span>Lomba Inovasi Pendidikan 2026: Inovasi, Desain, dan Dampak Sosial</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-light)', marginTop: '4px' }}>
            Prototype LMS Inklusif Ramah Anak Berkebutuhan Khusus (ABK)
          </div>
        </div>
      </div>
    </footer>
  );
};
