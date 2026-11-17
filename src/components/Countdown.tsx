import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Sparkles } from 'lucide-react';
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
    { label: 'NGÀY', enLabel: 'DAYS', value: formatNumber(timeLeft.days) },
    { label: 'GIỜ', enLabel: 'HOURS', value: formatNumber(timeLeft.hours) },
    { label: 'PHÚT', enLabel: 'MINUTES', value: formatNumber(timeLeft.minutes) },
    { label: 'GIÂY', enLabel: 'SECONDS', value: formatNumber(timeLeft.seconds) },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      {timeLeft.isExpired ? (
        <div className="glass-card rounded-3xl p-8 text-center border-amber-500/40 bg-gradient-to-br from-amber-500/10 via-slate-900/60 to-purple-900/20 shadow-2xl">
          <div className="inline-flex p-4 rounded-full bg-amber-500/20 text-amber-300 mb-4 animate-bounce">
            <Sparkles className="w-8 h-8" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-amber-200 mb-2 font-['Playfair_Display']">
            Sự Kiện Đang Diễn Ra!
          </h3>
          <p className="text-slate-300 max-w-lg mx-auto text-base">
            Chào mừng bạn đến với ngày hội sinh nhật của {eventConfig.club.shortName}. Chúc bạn có những phút giây thật thăng hoa và trọn vẹn kỷ niệm!
          </p>
        </div>
      ) : (
        <div className="relative">
          {/* Subtle Ambient Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 via-sky-500/20 to-purple-500/20 rounded-3xl blur-xl opacity-70"></div>

          <div className="relative glass-card rounded-3xl p-6 sm:p-10 border-slate-700/60 shadow-2xl backdrop-blur-2xl">
            <div className="text-center mb-8">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-amber-300 bg-amber-500/10 border border-amber-500/30 mb-3">
                <Clock className="w-3.5 h-3.5" />
                ĐẾM NGƯỢC THỜI KHẮC ĐẶC BIỆT
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-['Playfair_Display']">
                Cùng Đếm Ngược Đến Giờ G
              </h3>
              <p className="text-slate-400 text-sm mt-1">
                Thời gian tính theo múi giờ Việt Nam (Asia/Ho_Chi_Minh)
              </p>
            </div>

            {/* Grid of digits */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-6">
              {timeUnits.map((unit, index) => (
                <div
                  key={index}
                  className="relative group flex flex-col items-center justify-center p-4 sm:p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-inner hover:border-amber-500/40 transition-all duration-300"
                >
                  {/* Top shimmer accent */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-transparent via-amber-400/60 to-transparent rounded-full opacity-60 group-hover:opacity-100 transition-opacity"></div>

                  <span className="text-4xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-amber-100 to-amber-300 tracking-tighter tabular-nums drop-shadow-sm">
                    {unit.value}
                  </span>

                  <span className="text-xs sm:text-sm font-bold text-amber-400 tracking-widest mt-2">
                    {unit.label}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">
                    {unit.enLabel}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-amber-400" />
                {eventConfig.event.dateDisplay}
              </span>
              <span className="text-slate-600 hidden sm:inline">•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-400" />
                {eventConfig.event.timeDisplay}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
