import React, { useState } from 'react';
import './App.css';

// Context Providers
import { AccessibilityProvider } from './context/AccessibilityContext';
import { AudioProvider } from './context/AudioContext';
import { LearningProgressProvider } from './context/LearningProgressContext';

// Layout & Reusable Navigation
import { JudgesDemoBar } from './components/common/JudgesDemoBar';
import { Sidebar } from './components/layout/Sidebar';
import { TopHeader } from './components/layout/TopHeader';
import { BottomNav } from './components/layout/BottomNav';
import { Footer } from './components/layout/Footer';
import { AudioPlayerBar } from './components/common/AudioPlayerBar';
import { FloatingAccessibilityButton } from './components/common/FloatingAccessibilityButton';
import { AccessibilityPanel } from './components/common/AccessibilityPanel';

// Modals
import { SettingsModal } from './components/modals/SettingsModal';
import { HelpModal } from './components/modals/HelpModal';

// Pages
import { LandingPage } from './components/pages/LandingPage';
import { DashboardPage } from './components/pages/DashboardPage';
import { ModuleRoadmapPage } from './components/pages/ModuleRoadmapPage';
import { Lesson1JenisBullying } from './components/pages/Lesson1JenisBullying';
import { Lesson2Pencegahan } from './components/pages/Lesson2Pencegahan';
import { Lesson3SelfLove } from './components/pages/Lesson3SelfLove';
import { ActivityPage } from './components/pages/ActivityPage';
import { ReflectionPage } from './components/pages/ReflectionPage';
import { ProgressPage } from './components/pages/ProgressPage';
import { AudioHubPage } from './components/pages/AudioHubPage';
import { SocialImpactPage } from './components/pages/SocialImpactPage';

function AppContent() {
  const [currentView, setCurrentView] = useState('landing');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const handleNavigate = (viewId) => {
    setCurrentView(viewId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingPage onNavigate={handleNavigate} />;
      case 'dashboard':
        return <DashboardPage onNavigate={handleNavigate} onOpenSettings={() => setIsSettingsOpen(true)} />;
      case 'module':
        return <ModuleRoadmapPage onNavigate={handleNavigate} />;
      case 'lesson-1':
        return <Lesson1JenisBullying onNavigate={handleNavigate} />;
      case 'lesson-2':
        return <Lesson2Pencegahan onNavigate={handleNavigate} />;
      case 'lesson-3':
        return <Lesson3SelfLove onNavigate={handleNavigate} />;
      case 'activity':
        return <ActivityPage onNavigate={handleNavigate} />;
      case 'reflection':
        return <ReflectionPage onNavigate={handleNavigate} />;
      case 'progress':
        return <ProgressPage onNavigate={handleNavigate} />;
      case 'audio-hub':
        return <AudioHubPage onNavigate={handleNavigate} />;
      case 'social-impact':
        return <SocialImpactPage onNavigate={handleNavigate} />;
      default:
        return <LandingPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* 1. Presentation Sticky Quick-Demo Bar for Competition Jury */}
      <JudgesDemoBar onNavigate={handleNavigate} />

      {/* 2. Unified Responsive Application Frame */}
      <div className="app-container">
        {/* Desktop & Tablet Sidebar */}
        <div className="aksara-sidebar-wrapper">
          <Sidebar
            currentView={currentView}
            onNavigate={handleNavigate}
            onOpenSettings={() => setIsSettingsOpen(true)}
            onOpenHelp={() => setIsHelpOpen(true)}
          />
        </div>

        {/* Main Content Spine */}
        <div className="aksara-main-area">
          <TopHeader currentView={currentView} onNavigate={handleNavigate} />

          {/* Centered Content Container with Comfortable Max-Width */}
          <main className="aksara-content-container animate-fade-in">
            {renderCurrentView()}
          </main>

          <Footer onNavigate={handleNavigate} />
        </div>
      </div>

      {/* 3. Mobile Bottom Navigation Bar (Sticky at bottom, 48px touch targets) */}
      <BottomNav currentView={currentView} onNavigate={handleNavigate} />

      {/* 4. Global Interactive Audio Player with Tunarungu Transcript */}
      <AudioPlayerBar />

      {/* 5. Floating Accessibility Trigger */}
      <FloatingAccessibilityButton />

      {/* 6. Slide-in Accessibility & Adaptive Reading Drawer */}
      <AccessibilityPanel />

      {/* 7. Settings Modal */}
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />

      {/* 8. Help & Inclusive ABK Guide Modal */}
      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <AccessibilityProvider>
      <AudioProvider>
        <LearningProgressProvider>
          <AppContent />
        </LearningProgressProvider>
      </AudioProvider>
    </AccessibilityProvider>
  );
}
