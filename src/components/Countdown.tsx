import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Sparkles, Zap } from 'lucide-react';
import { eventConfig } from '../config/eventConfig';

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
    { label: 'Ngày', enLabel: 'DAYS', value: formatNumber(timeLeft.days) },
    { label: 'Giờ', enLabel: 'HOURS', value: formatNumber(timeLeft.hours) },
    { label: 'Phút', enLabel: 'MINUTES', value: formatNumber(timeLeft.minutes) },
    { label: 'Giây', enLabel: 'SECONDS', value: formatNumber(timeLeft.seconds) },
  ];

  // Extract start time e.g. "18:00" for the digital scoreboard
  const startTimeShort = eventConfig.event.timeDisplay.split(' ')[0] || '18:00';

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      {timeLeft.isExpired ? (
        <div className="sn2-paper-card rounded-3xl p-8 text-center">
          <div className="inline-flex p-4 rounded-full bg-[#e0f2fe] text-[#0284c7] mb-4 animate-bounce border border-[#7dd3fc]">
            <Sparkles className="w-8 h-8" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-[#0c4a6e] mb-2 font-display">
            Sự Kiện Đang Diễn Ra!
          </h3>
          <p className="text-[#0369a1] max-w-lg mx-auto text-base">
            Chào mừng bạn đến với ngày hội sinh nhật của {eventConfig.club.shortName}. Chúc bạn có những phút giây thật thăng hoa và trọn vẹn kỷ niệm!
          </p>
        </div>
      ) : (
        <div className="sn2-paper-card rounded-3xl p-6 sm:p-10">
          {/* Header */}
          <div className="text-center mb-6">
            <h3 className="text-3xl sm:text-4xl font-bold text-[#0c4a6e] tracking-tight font-display">
              Tiệc sinh nhật
            </h3>
          </div>

          {/* Navy Scoreboard Time Banner (matching traothiep.vn) */}
          <div className="max-w-md mx-auto mb-8 rounded-2xl sn2-scoreboard px-6 py-6 text-center">
            <span className="text-[11px] sm:text-xs font-bold tracking-[0.22em] uppercase text-[#bae6fd]/85 font-alt block mb-1.5">
              GIỜ KHAI TIỆC
            </span>
            <div className="text-4xl sm:text-5xl font-black text-[#7dd3fc] font-digit tracking-wider drop-shadow-[0_0_24px_rgba(125,211,252,0.5)]">
              {startTimeShort}
            </div>
            <div className="flex items-center justify-center gap-2 mt-2.5 text-[#f5c542]">
              <Zap className="w-3.5 h-3.5 fill-[#f5c542]" />
              <Zap className="w-3.5 h-3.5 fill-[#f5c542]" />
              <Zap className="w-3.5 h-3.5 fill-[#f5c542]" />
            </div>
          </div>

          {/* Countdown Sub-heading */}
          <div className="text-center mb-5">
            <span className="text-xs sm:text-sm font-bold tracking-[0.18em] uppercase text-[#0284c7] font-alt block">
              CÙNG ĐẾM NGƯỢC ĐẾN GIỜ G
            </span>
            <p className="text-slate-500 text-xs mt-1">
              Thời gian chính xác theo múi giờ Việt Nam (Asia/Ho_Chi_Minh)
            </p>
          </div>

          {/* 4 White Digit Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-5 max-w-2xl mx-auto">
            {timeUnits.map((unit, index) => (
              <div
                key={index}
                className="relative group flex flex-col items-center justify-center p-4 sm:p-5 rounded-2xl bg-white/95 border border-[#0284c7]/18 shadow-[6px_6px_0_rgba(14,165,233,0.10)] hover:border-[#38bdf8] hover:-translate-y-0.5 transition-all duration-300"
              >
                <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0c4a6e] font-digit tracking-tight tabular-nums">
                  {unit.value}
                </span>

                <span className="text-sm font-bold text-[#0369a1] font-alt mt-1.5">
                  {unit.label}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
                  {unit.enLabel}
                </span>
              </div>
            ))}
          </div>

          {/* Bottom Event Date & Time Strip */}
          <div className="mt-8 pt-6 border-t border-[#0284c7]/12 flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-[#0369a1] font-medium">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#0284c7]" />
              {eventConfig.event.dateDisplay}
            </span>
            <span className="text-[#7dd3fc] hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#0284c7]" />
              {eventConfig.event.timeDisplay}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
