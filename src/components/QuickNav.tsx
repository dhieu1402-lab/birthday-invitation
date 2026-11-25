import React, { useState, useEffect } from 'react';
import { Mail, Calendar, Image, Heart, QrCode } from 'lucide-react';

interface QuickNavProps {
  isOpened: boolean;
}

export const QuickNav: React.FC<QuickNavProps> = ({ isOpened }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isOpened || !isVisible) return null;

  const navItems = [
    { label: 'Lời mời', href: '#invitation', icon: Mail },
    { label: 'Lịch trình', href: '#event-info', icon: Calendar },
    { label: 'Kỷ niệm', href: '#memories', icon: Image },
    { label: 'RSVP', href: '#rsvp', icon: Heart },
    { label: 'Gửi quà', href: '#gift', icon: QrCode },
  ];

  return (
    <nav className="fixed bottom-4 inset-x-0 z-40 flex justify-center px-4 pointer-events-none animate-fade-in">
      <div className="pointer-events-auto flex items-center gap-1 sm:gap-2 p-1.5 sm:p-2 rounded-full bg-white/92 border border-[#0284c7]/20 backdrop-blur-xl shadow-xl shadow-[#033469]/15">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <a
              key={index}
              href={item.href}
              className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-full text-xs font-bold font-alt text-[#0c4a6e] hover:text-[#0284c7] hover:bg-[#e0f2fe] transition-all duration-200"
            >
              <Icon className="w-3.5 h-3.5 text-[#0284c7]" />
              <span className="hidden sm:inline">{item.label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
};
