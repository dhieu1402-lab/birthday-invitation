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
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col font-sans selection:bg-amber-400/30 selection:text-amber-200">
      {/* Background Subtle Stars / Noise */}
      <div className="fixed inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none"></div>

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
