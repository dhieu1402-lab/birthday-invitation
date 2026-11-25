import React, { useState } from 'react';
import { HeroSection } from './sections/HeroSection';
import { InvitationSection } from './sections/InvitationSection';
import { EventInfoSection } from './sections/EventInfoSection';
import { Countdown } from './components/Countdown';
import { MemoriesSection } from './sections/MemoriesSection';
import { RSVPSection } from './sections/RSVPSection';
import { PaymentSection } from './sections/PaymentSection';
import { FooterSection } from './sections/FooterSection';
import { MusicControl } from './components/MusicControl';
import { QuickNav } from './components/QuickNav';

export const App: React.FC = () => {
  const [isOpened, setIsOpened] = useState(false);

  const handleOpenInvitation = () => {
    setIsOpened(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0f9ff] via-[#e0f2fe] to-[#f0f9ff] text-[#0c4a6e] flex flex-col font-body selection:bg-[#88cef4]/40 selection:text-[#041f3d]">
      {/* Subtle Sky-Blue Pattern */}
      <div className="fixed inset-0 bg-[radial-gradient(#7dd3fc_1px,transparent_1px)] [background-size:24px_24px] opacity-35 pointer-events-none"></div>

      {/* Persistent Floating Controls */}
      <MusicControl isOpened={isOpened} />
      <QuickNav isOpened={isOpened} />

      {/* Main Flow */}
      {!isOpened ? (
        <HeroSection isOpened={false} onOpen={handleOpenInvitation} />
      ) : (
        <main className="relative z-10 flex flex-col animate-fade-in">
          {/* Hero Welcome */}
          <HeroSection isOpened={true} onOpen={handleOpenInvitation} />

          {/* Section 2: Formal Invitation */}
          <InvitationSection />

          {/* Section 3: Event Details */}
          <EventInfoSection />

          {/* Section 4: Countdown Timer */}
          <section id="countdown" className="relative w-full py-6">
            <Countdown />
          </section>

          {/* Section 5: Photo Album Memories */}
          <MemoriesSection />

          {/* Section 6: RSVP Attendance Form */}
          <RSVPSection />

          {/* Section 7: QR Gift / Transfer */}
          <PaymentSection />

          {/* Section 8: Thank You & Footer */}
          <FooterSection />
        </main>
      )}
    </div>
  );
};

export default App;
