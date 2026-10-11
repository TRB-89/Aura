import React, { useState, useEffect } from 'react';
import { ActiveRoute } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SafetyModal } from './components/SafetyModal';

// Landing Sections
import { HeroSection } from './components/sections/HeroSection';
import { ProductIntroSection } from './components/sections/ProductIntroSection';
import { VoiceExperienceSection } from './components/sections/VoiceExperienceSection';
import { AiConversationSection } from './components/sections/AiConversationSection';
import { JournalSection } from './components/sections/JournalSection';
import { PresenceModeSection } from './components/sections/PresenceModeSection';
import { ResetBreathingSection } from './components/sections/ResetBreathingSection';
import { InsightsSection } from './components/sections/InsightsSection';
import { PrivacySection } from './components/sections/PrivacySection';
import { TestimonialSection } from './components/sections/TestimonialSection';
import { SafetySection } from './components/sections/SafetySection';
import { FinalCtaSection } from './components/sections/FinalCtaSection';

// Dedicated App Views
import { DashboardView } from './components/views/DashboardView';
import { ChatView } from './components/views/ChatView';
import { VoiceView } from './components/views/VoiceView';
import { JournalView } from './components/views/JournalView';
import { ResetView } from './components/views/ResetView';
import { PresenceView } from './components/views/PresenceView';
import { InsightsView } from './components/views/InsightsView';
import { PrivacyView } from './components/views/PrivacyView';
import { SettingsView } from './components/views/SettingsView';

export function App() {
  const [currentRoute, setCurrentRoute] = useState<ActiveRoute>('landing');
  const [isSafetyModalOpen, setIsSafetyModalOpen] = useState(false);

  const handleRouteChange = (route: ActiveRoute) => {
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-root">
      {/* Floating minimal luxury navbar */}
      <Navbar
        currentRoute={currentRoute}
        onRouteChange={handleRouteChange}
        onOpenSafety={() => setIsSafetyModalOpen(true)}
      />

      {/* Safety & Crisis Modal */}
      <SafetyModal
        isOpen={isSafetyModalOpen}
        onClose={() => setIsSafetyModalOpen(false)}
        onStayAndTalk={() => handleRouteChange('chat')}
      />

      {/* Route Views */}
      <main>
        {currentRoute === 'landing' && (
          <>
            {/* 1. Hero */}
            <HeroSection onRouteChange={handleRouteChange} />

            {/* 2. Product Introduction */}
            <ProductIntroSection onRouteChange={handleRouteChange} />

            {/* 3. Voice Experience */}
            <VoiceExperienceSection onRouteChange={handleRouteChange} />

            {/* 4. AI Conversation */}
            <AiConversationSection onRouteChange={handleRouteChange} />

            {/* 5. Journal / Reflection */}
            <JournalSection onRouteChange={handleRouteChange} />

            {/* 6. Presence Mode */}
            <PresenceModeSection onRouteChange={handleRouteChange} />

            {/* 7. Reset / Breathing */}
            <ResetBreathingSection onRouteChange={handleRouteChange} />

            {/* 8. Emotional Insights */}
            <InsightsSection onRouteChange={handleRouteChange} />

            {/* 9. Privacy */}
            <PrivacySection onRouteChange={handleRouteChange} />

            {/* 10. Testimonial */}
            <TestimonialSection />

            {/* 11. Safety */}
            <SafetySection
              onOpenSafetyModal={() => setIsSafetyModalOpen(true)}
              onRouteChange={handleRouteChange}
            />

            {/* 12. Final CTA */}
            <FinalCtaSection onRouteChange={handleRouteChange} />

            {/* 13. Footer */}
            <Footer
              onRouteChange={handleRouteChange}
              onOpenSafety={() => setIsSafetyModalOpen(true)}
            />
          </>
        )}

        {currentRoute === 'dashboard' && (
          <>
            <DashboardView
              onRouteChange={handleRouteChange}
              onOpenSafety={() => setIsSafetyModalOpen(true)}
            />
            <Footer
              onRouteChange={handleRouteChange}
              onOpenSafety={() => setIsSafetyModalOpen(true)}
            />
          </>
        )}

        {currentRoute === 'chat' && (
          <ChatView
            onRouteChange={handleRouteChange}
            onOpenSafety={() => setIsSafetyModalOpen(true)}
          />
        )}

        {currentRoute === 'voice' && (
          <VoiceView
            onRouteChange={handleRouteChange}
            onOpenSafety={() => setIsSafetyModalOpen(true)}
          />
        )}

        {currentRoute === 'journal' && (
          <JournalView onRouteChange={handleRouteChange} />
        )}

        {currentRoute === 'reset' && (
          <ResetView onRouteChange={handleRouteChange} />
        )}

        {currentRoute === 'presence' && (
          <PresenceView onRouteChange={handleRouteChange} />
        )}

        {currentRoute === 'insights' && (
          <>
            <InsightsView onRouteChange={handleRouteChange} />
            <Footer
              onRouteChange={handleRouteChange}
              onOpenSafety={() => setIsSafetyModalOpen(true)}
            />
          </>
        )}

        {currentRoute === 'privacy' && (
          <>
            <PrivacyView onRouteChange={handleRouteChange} />
            <Footer
              onRouteChange={handleRouteChange}
              onOpenSafety={() => setIsSafetyModalOpen(true)}
            />
          </>
        )}

        {currentRoute === 'settings' && (
          <>
            <SettingsView onRouteChange={handleRouteChange} />
            <Footer
              onRouteChange={handleRouteChange}
              onOpenSafety={() => setIsSafetyModalOpen(true)}
            />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
