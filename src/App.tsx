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
import { SectionDivider } from './components/SectionDivider';

export const App: React.FC = () => {
  const [isOpened, setIsOpened] = useState(false);

  const handleOpenInvitation = () => {
    setIsOpened(true);
  };

  return (
    <div className="min-h-screen bg-[#f0f9ff] bg-gradient-to-b from-[#f0f9ff] via-[#e0f2fe] to-[#f0f9ff] text-[#0c4a6e] flex flex-col font-body selection:bg-[#88cef4]/40 selection:text-[#041f3d]">
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
          {/* Section 1: Hero Welcome */}
          <HeroSection isOpened={true} onOpen={handleOpenInvitation} />

          {/* Section 2: Lời mời trang trọng */}
          <InvitationSection />

          <SectionDivider />

          {/* Section 3: Thông tin sự kiện & Timeline */}
          <EventInfoSection />

          <SectionDivider />

          {/* Section 4: Đếm ngược giờ bắt đầu */}
          <section id="countdown" className="relative w-full py-8 sm:py-10">
            <Countdown />
          </section>

          <SectionDivider />

          {/* Section 5: Album Kỷ Niệm */}
          <MemoriesSection />

          <SectionDivider />

          {/* Section 6: Xác nhận tham dự */}
          <RSVPSection />

          <SectionDivider />

          {/* Section 7: Gửi quà & QR Chuyển khoản */}
          <PaymentSection />

          {/* Section 8: Lời cảm ơn & Chân trang */}
          <FooterSection />
        </main>
      )}
    </div>
  );
};

export default App;
