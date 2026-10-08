import React, { createContext, useContext, useState, useEffect } from 'react';

const LearningProgressContext = createContext();

const STORAGE_KEY = 'aksara_lms_student_state_v1';

export const LearningProgressProvider = ({ children }) => {
  // Load saved state or default
  const getInitialState = () => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          return JSON.parse(saved);
        }
      } catch (e) {
        console.warn('Gagal membaca localStorage:', e);
      }
    }
    return null;
  };

  const savedData = getInitialState();

  const [userProfile, setUserProfile] = useState(
    savedData?.userProfile || {
      name: 'Budi Pratama',
      avatar: '🦁',
      grade: 'Kelas 4 - Inklusif',
      school: 'SD Inklusi Nusantara',
    }
  );

  const [completedLessons, setCompletedLessons] = useState(
    savedData?.completedLessons || ['lesson-1']
  );

  const [completedActivities, setCompletedActivities] = useState(
    savedData?.completedActivities || []
  );

  const [completedReflections, setCompletedReflections] = useState(
    savedData?.completedReflections || ['Aku berharga', 'Aku harus menjaga diri']
  );

  const [listenedAudios, setListenedAudios] = useState(
    new Set(savedData?.listenedAudios || ['intro', 'audio-lesson1'])
  );

  const [personalJournal, setPersonalJournal] = useState(
    savedData?.personalJournal || 'Hari ini aku belajar bahwa aku berhak merasa aman dan boleh meminta bantuan.'
  );

  const totalLessons = 5; // Roadmap: 01 Jenis, 02 Pencegahan, 03 Self-Love, 04 Aktivitas, 05 Refleksi

  // Save to localStorage on any state change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const payload = {
          userProfile,
          completedLessons,
          completedActivities,
          completedReflections,
          listenedAudios: Array.from(listenedAudios),
          personalJournal,
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      } catch (e) {
        console.warn('Gagal menyimpan ke localStorage:', e);
      }
    }
  }, [userProfile, completedLessons, completedActivities, completedReflections, listenedAudios, personalJournal]);

  // Compute dynamic percentage based on actual completed milestones
  const calculateProgress = () => {
    let points = 0;
    if (completedLessons.includes('lesson-1')) points += 1;
    if (completedLessons.includes('lesson-2')) points += 1;
    if (completedLessons.includes('lesson-3')) points += 1;
    if (completedActivities.length > 0) points += 1;
    if (completedReflections.length > 0) points += 1;
    return Math.min(100, Math.round((points / totalLessons) * 100));
  };

  const progressPercent = calculateProgress();

  const completeLesson = (lessonId) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons((prev) => [...prev, lessonId]);
    }
  };

  const completeActivity = (actId) => {
    if (!completedActivities.includes(actId)) {
      setCompletedActivities((prev) => [...prev, actId]);
    }
  };

  const saveReflection = (reflectionsArray) => {
    setCompletedReflections(reflectionsArray);
  };

  const recordAudioListen = (audioId) => {
    setListenedAudios((prev) => new Set(prev).add(audioId));
  };

  // Reset function to start completely from scratch (Real LMS behavior)
  const resetAllProgress = () => {
    setCompletedLessons([]);
    setCompletedActivities([]);
    setCompletedReflections([]);
    setListenedAudios(new Set());
    setPersonalJournal('');
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  // Function to load pre-filled demo data for competition presentations
  const loadDemoData = () => {
    setCompletedLessons(['lesson-1', 'lesson-2', 'lesson-3']);
    setCompletedActivities(['act-1', 'act-2']);
    setCompletedReflections(['berharga', 'menjaga', 'bantuan', 'menghargai']);
    setListenedAudios(new Set(['audio-intro', 'audio-lesson1', 'audio-lesson2', 'audio-lesson3', 'audio-reflection']));
    setPersonalJournal('Aku berharga, berhak merasa aman, dan siap saling menghormati.');
  };

  const achievements = [
    {
      id: 'first-step',
      icon: '🌱',
      title: 'Langkah Pertama (First Step)',
      desc: 'Berhasil mempelajari jenis-jenis bullying dengan baik.',
      unlocked: completedLessons.includes('lesson-1'),
    },
    {
      id: 'kind-learner',
      icon: '❤️',
      title: 'Sahabat Peduli (Kind Learner)',
      desc: 'Memahami cara mencegah bullying dan saling menghormati perbedaan.',
      unlocked: completedLessons.includes('lesson-2'),
    },
    {
      id: 'self-protector',
      icon: '🛡️',
      title: 'Penjaga Diri (Self Protector)',
      desc: 'Mengenali nilai diri sendiri dan berani berkata tidak saat tidak nyaman.',
      unlocked: completedLessons.includes('lesson-3'),
    },
    {
      id: 'champion',
      icon: '⭐',
      title: 'Duta Inklusif AKSARA',
      desc: 'Menuntaskan seluruh materi, aktivitas pilihan, dan refleksi diri.',
      unlocked: progressPercent >= 80,
    },
  ];

  return (
    <LearningProgressContext.Provider
      value={{
        userProfile,
        setUserProfile,
        completedLessons,
        completedActivities,
        completedReflections,
        listenedAudiosCount: listenedAudios.size,
        progressPercent,
        totalLessons,
        personalJournal,
        setPersonalJournal,
        completeLesson,
        completeActivity,
        saveReflection,
        recordAudioListen,
        resetAllProgress,
        loadDemoData,
        achievements,
      }}
    >
      {children}
    </LearningProgressContext.Provider>
  );
};

export const useLearningProgress = () => {
  const context = useContext(LearningProgressContext);
  if (!context) {
    throw new Error('useLearningProgress must be used within LearningProgressProvider');
  }
  return context;
};
