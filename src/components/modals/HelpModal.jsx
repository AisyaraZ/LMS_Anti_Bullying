import React from 'react';
import { X, HelpCircle, Heart, Ear, MessageSquare, BookOpen, Hand } from 'lucide-react';
import { Button } from '../common/Button';

export const HelpModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const guideItems = [
    {
      icon: Ear,
      title: 'Khusus Sahabat Tunarungu',
      desc: 'Semua materi audio memiliki teks tertulis. Klik tombol “Lihat Teks Audio” di bilah pemutar untuk membaca seluruh kalimat secara visual.',
    },
    {
      icon: MessageSquare,
      title: 'Khusus Sahabat Tunawicara',
      desc: 'Tidak ada aktivitas yang mewajibkan berbicara. Semua pertanyaan, kuis, dan refleksi dapat dijawab cukup dengan menekan kartu pilihan.',
    },
    {
      icon: BookOpen,
      title: 'Khusus Anak dengan Disleksia / ADHD',
      desc: 'Buka menu Aksesibilitas (♿) dan aktifkan “Dyslexia Friendly” (font Lexend) atau “Easy Reading Mode” agar materi lebih ringkas dan spasi lebih lega.',
    },
    {
      icon: Hand,
      title: 'Kemudahan Motorik (Easy Touch)',
      desc: 'Seluruh tombol dirancang dengan ukuran minimal 48px dan jarak lega agar tidak mudah salah tekan saat menggunakan layar sentuh maupun tetikus.',
    },
  ];

  return (
    <div className="drawer-backdrop" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Pusat Bantuan dan Panduan Inklusif AKSARA"
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderRadius: 'var(--radius-xl)',
          maxWidth: '560px',
          width: '100%',
          padding: '28px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.25)',
          border: '2px solid var(--border-light)',
          animation: 'fadeIn 0.2s ease',
          boxSizing: 'border-box',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                backgroundColor: 'var(--secondary-light)',
                color: 'var(--secondary)',
                padding: '8px',
                borderRadius: 'var(--radius-md)',
              }}
            >
              <HelpCircle size={22} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-main)', margin: 0 }}>
                Panduan Belajar Inklusif
              </h2>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0 }}>
                Dukungan belajar adaptif untuk setiap kebutuhan
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              padding: '6px',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text-muted)',
              backgroundColor: 'var(--bg-subtle)',
            }}
            title="Tutup"
          >
            <X size={20} />
          </button>
        </div>

        {/* Inclusive Guides */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
          {guideItems.map((guide, idx) => {
            const Icon = guide.icon;
            return (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  gap: '14px',
                  padding: '14px 16px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-subtle)',
                  border: '1px solid var(--border-light)',
                  alignItems: 'flex-start',
                }}
              >
                <div
                  style={{
                    backgroundColor: 'var(--primary-light)',
                    color: 'var(--primary)',
                    padding: '8px',
                    borderRadius: 'var(--radius-md)',
                    flexShrink: 0,
                  }}
                >
                  <Icon size={18} />
                </div>
                <div>
                  <h3 style={{ fontSize: '0.98rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '4px' }}>
                    {guide.title}
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.5', margin: 0 }}>
                    {guide.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Emergency contact note */}
        <div
          style={{
            padding: '14px 18px',
            backgroundColor: 'var(--primary-light)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(91, 95, 239, 0.3)',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <Heart size={20} color="var(--primary)" style={{ flexShrink: 0 }} />
          <span style={{ fontSize: '0.88rem', color: 'var(--text-main)', fontWeight: '600' }}>
            Jika kamu mengalami perlakuan bullying atau merasa tidak aman, segera ceritakan pada guru atau orang tua yang kamu percaya. Kamu tidak sendirian.
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="primary" size="md" onClick={onClose}>
            Saya Mengerti
          </Button>
        </div>
      </div>
    </div>
  );
};
