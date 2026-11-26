import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Sparkles, BellRing } from 'lucide-react';
import { eventConfig } from '../config/eventConfig';
import { RevealOnScroll } from './RevealOnScroll';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

export const Countdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetTime = new Date(eventConfig.event.targetDateTime).getTime();
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isExpired: true,
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        isExpired: false,
      });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => String(num).padStart(2, '0');

  const timeUnits = [
    { label: 'Ngày', value: formatNumber(timeLeft.days) },
    { label: 'Giờ', value: formatNumber(timeLeft.hours) },
    { label: 'Phút', value: formatNumber(timeLeft.minutes) },
    { label: 'Giây', value: formatNumber(timeLeft.seconds) },
  ];

  return (
    <RevealOnScroll variant="scale" className="w-full max-w-4xl mx-auto px-4">
      {timeLeft.isExpired ? (
        <div className="sn2-paper-card rounded-3xl p-8 text-center">
          <div className="inline-flex p-4 rounded-full bg-[#e0f2fe] text-[#0284c7] mb-4 animate-bounce border border-[#7dd3fc]">
            <Sparkles className="w-8 h-8" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-[#0c4a6e] mb-2 font-display">
            Buổi Lễ Đang Diễn Ra!
          </h3>
          <p className="text-[#0369a1] max-w-lg mx-auto text-base">
            Chào mừng Anh/Chị/Bạn đến với ngày hội sinh nhật của {eventConfig.club.shortName}. Chúc Anh/Chị/Bạn có những phút giây thật trọn vẹn và đáng nhớ!
          </p>
        </div>
      ) : (
        <div className="sn2-paper-card rounded-3xl p-6 sm:p-10">
          {/* Header */}
          <div className="text-center mb-6">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase sn2-badge font-display mb-3">
              <BellRing className="w-3.5 h-3.5 text-[#0284c7]" />
              NHẮC HẸN GIỜ KHAI MẠC
            </span>
            <h3 className="text-3xl sm:text-4xl font-bold text-[#0c4a6e] tracking-tight font-display">
              Giờ Bắt Đầu Buổi Lễ
            </h3>
          </div>

          {/* Navy Scoreboard Start-Time Reminder Banner */}
          <div className="max-w-md mx-auto mb-8 rounded-2xl sn2-scoreboard px-6 py-6 text-center">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#bae6fd]/90 font-display block mb-1.5">
              CHÍNH THỨC BẮT ĐẦU LÚC
            </span>
            <div className="text-4xl sm:text-5xl font-bold text-[#7dd3fc] font-display tabular-nums tracking-wider drop-shadow-[0_0_24px_rgba(125,211,252,0.45)]">
              {eventConfig.event.startTime}
            </div>
            <p className="text-xs text-[#e0f2fe]/90 mt-2.5 font-medium">
              Đón khách & chụp ảnh lưu niệm từ 17:30 • Rất mong Anh/Chị/Bạn có mặt đúng giờ
            </p>
          </div>

          {/* Countdown Sub-heading */}
          <div className="text-center mb-5">
            <span className="text-xs sm:text-sm font-bold tracking-[0.16em] uppercase text-[#0284c7] font-display block">
              CÙNG ĐẾM NGƯỢC ĐẾN GIỜ BẮT ĐẦU
            </span>
            <p className="text-slate-500 text-xs mt-1">
              Tính theo múi giờ Việt Nam • {eventConfig.event.dateDisplay}
            </p>
          </div>

          {/* 4 White Digit Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-5 max-w-2xl mx-auto">
            {timeUnits.map((unit, index) => (
              <RevealOnScroll key={index} variant="up" delayMs={index * 80}>
                <div
                  className="relative group flex flex-col items-center justify-center p-4 sm:p-5 rounded-2xl bg-white border border-[#0284c7]/18 shadow-[6px_6px_0_rgba(14,165,233,0.10)] hover:border-[#38bdf8] hover:-translate-y-0.5 transition-all duration-300"
                >
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0c4a6e] font-display tracking-tight tabular-nums">
                    {unit.value}
                  </span>

                  <span className="text-sm font-bold text-[#0369a1] font-display mt-1">
                    {unit.label}
                  </span>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          {/* Bottom Compact Date & Time Strip */}
          <div className="mt-8 pt-6 border-t border-[#0284c7]/12 flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-[#0369a1] font-medium">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#0284c7]" />
              {eventConfig.event.timeDisplay}
            </span>
            <span className="text-[#7dd3fc] hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#0284c7]" />
              {eventConfig.event.dateDisplay}
            </span>
          </div>
        </div>
      )}
    </RevealOnScroll>
  );
};
