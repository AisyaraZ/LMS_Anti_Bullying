import React, { useState } from 'react';
import { X, User, Sliders, RotateCcw, Check, Sparkles, Volume2, ShieldAlert } from 'lucide-react';
import { Button } from '../common/Button';
import { useLearningProgress } from '../../context/LearningProgressContext';
import { useAccessibility } from '../../context/AccessibilityContext';
import { useAudio } from '../../context/AudioContext';

export const SettingsModal = ({ isOpen, onClose }) => {
  const { userProfile, setUserProfile, resetAllProgress, loadDemoData } = useLearningProgress();
  const { resetSettings } = useAccessibility();
  const { soundEffectsEnabled, setSoundEffectsEnabled, playChime } = useAudio();

  const [studentName, setStudentName] = useState(userProfile.name);
  const [selectedAvatar, setSelectedAvatar] = useState(userProfile.avatar);
  const [savedToast, setSavedToast] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  if (!isOpen) return null;

  const avatarList = ['🦁', '🐱', '🐼', '🦊', '🐨', '🦄', '🐬', '🦉'];

  const handleSaveProfile = () => {
    playChime('click');
    setUserProfile((prev) => ({
      ...prev,
      name: studentName.trim() || 'Sahabat AKSARA',
      avatar: selectedAvatar,
    }));
    setSavedToast(true);
    setTimeout(() => {
      setSavedToast(false);
      onClose();
    }, 800);
  };

  const handleResetProgress = () => {
    playChime('click');
    resetAllProgress();
    resetSettings();
    setConfirmReset(false);
    onClose();
  };

  const handleLoadSample = () => {
    playChime('success');
    loadDemoData();
    onClose();
  };

  return (
    <div className="drawer-backdrop" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Pengaturan Akun dan Preferensi AKSARA"
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderRadius: 'var(--radius-xl)',
          maxWidth: '520px',
          width: '100%',
          padding: '28px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.25)',
          border: '2px solid var(--border-light)',
          animation: 'fadeIn 0.2s ease',
          boxSizing: 'border-box',
          maxHeight: '92vh',
          overflowY: 'auto',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                backgroundColor: 'var(--primary-light)',
                color: 'var(--primary)',
                padding: '8px',
                borderRadius: 'var(--radius-md)',
              }}
            >
              <User size={22} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-main)', margin: 0 }}>
                Pengaturan Siswa & Akun
              </h2>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0 }}>
                Kelola profil belajar dan data kemajuanmu
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

        {/* Profile Name */}
        <div style={{ marginBottom: '18px' }}>
          <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '800', marginBottom: '8px', color: 'var(--text-main)' }}>
            Nama Panggilan Siswa
          </label>
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            style={{
              width: '100%',
              minHeight: '48px',
              padding: '0 16px',
              borderRadius: 'var(--radius-md)',
              border: '1.5px solid var(--border-light)',
              backgroundColor: 'var(--bg-subtle)',
              color: 'var(--text-main)',
              fontSize: '1rem',
              fontWeight: '700',
              boxSizing: 'border-box',
            }}
            placeholder="Ketik nama panggilan..."
          />
        </div>

        {/* Avatar Picker */}
        <div style={{ marginBottom: '22px' }}>
          <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '800', marginBottom: '8px', color: 'var(--text-main)' }}>
            Pilih Karakter Avatar
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
            {avatarList.map((av) => (
              <button
                key={av}
                type="button"
                onClick={() => {
                  playChime('click');
                  setSelectedAvatar(av);
                }}
                style={{
                  minHeight: '48px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: selectedAvatar === av ? 'var(--primary-light)' : 'var(--bg-subtle)',
                  border: '2px solid',
                  borderColor: selectedAvatar === av ? 'var(--primary)' : 'var(--border-light)',
                  fontSize: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'var(--transition-smooth)',
                }}
              >
                {av}
              </button>
            ))}
          </div>
        </div>

        {/* Sound Effects Toggle */}
        <div
          style={{
            padding: '12px 16px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--bg-subtle)',
            border: '1px solid var(--border-light)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Volume2 size={18} color="var(--primary)" />
            <div>
              <div style={{ fontSize: '0.88rem', fontWeight: '800', color: 'var(--text-main)' }}>
                Efek Suara Sentuhan
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Bunyi lonceng lembut saat memilih jawaban
              </div>
            </div>
          </div>
          <button
            onClick={() => setSoundEffectsEnabled(!soundEffectsEnabled)}
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: soundEffectsEnabled ? 'var(--secondary)' : 'var(--bg-surface)',
              color: soundEffectsEnabled ? '#04422D' : 'var(--text-muted)',
              fontWeight: '800',
              fontSize: '0.8rem',
              border: '1px solid var(--border-light)',
            }}
          >
            {soundEffectsEnabled ? 'Aktif' : 'Mati'}
          </button>
        </div>

        {/* Data Management: Reset Progress vs Load Sample */}
        <div
          style={{
            padding: '14px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--bg-subtle)',
            border: '1px solid var(--border-light)',
            marginBottom: '24px',
          }}
        >
          <div style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '8px' }}>
            Kelola Kemajuan Belajar:
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button
              onClick={handleLoadSample}
              style={{
                flex: 1,
                minHeight: '38px',
                padding: '0 12px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-light)',
                color: 'var(--primary)',
                fontWeight: '700',
                fontSize: '0.82rem',
              }}
              title="Isi seluruh modul selesai untuk melihat sertifikat dan seluruh badge"
            >
              ⭐ Isi Contoh 100%
            </button>

            {!confirmReset ? (
              <button
                onClick={() => setConfirmReset(true)}
                style={{
                  flex: 1,
                  minHeight: '38px',
                  padding: '0 12px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border-light)',
                  color: 'var(--danger)',
                  fontWeight: '700',
                  fontSize: '0.82rem',
                }}
              >
                🔄 Reset Mulai dari 0%
              </button>
            ) : (
              <div style={{ display: 'flex', gap: '6px', flex: 1 }}>
                <button
                  onClick={handleResetProgress}
                  style={{
                    flex: 1,
                    minHeight: '38px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--danger)',
                    color: '#FFFFFF',
                    fontWeight: '800',
                    fontSize: '0.8rem',
                  }}
                >
                  Yakin Reset
                </button>
                <button
                  onClick={() => setConfirmReset(false)}
                  style={{
                    padding: '0 10px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-surface)',
                    border: '1px solid var(--border-light)',
                    fontSize: '0.8rem',
                    fontWeight: '700',
                  }}
                >
                  Batal
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <Button variant="secondary" size="md" onClick={onClose}>
            Batal
          </Button>
          <Button variant="primary" size="md" icon={savedToast ? Check : undefined} onClick={handleSaveProfile}>
            {savedToast ? 'Tersimpan ✓' : 'Simpan Profil'}
          </Button>
        </div>
      </div>
    </div>
  );
};
