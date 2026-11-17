import React from 'react';
import { Calendar, Clock, MapPin, Navigation, Sparkles, Building2 } from 'lucide-react';
import { eventConfig } from '../config/eventConfig';

export const EventInfoSection: React.FC = () => {
  const { event } = eventConfig;

  const infoCards = [
    {
      icon: Calendar,
      title: 'NGÀY TỔ CHỨC',
      value: event.dateDisplay,
      subtitle: 'Hãy đánh dấu lịch của bạn nhé!',
      color: 'from-amber-500/20 to-amber-600/5',
      borderColor: 'border-amber-500/30',
      iconColor: 'text-amber-400',
    },
    {
      icon: Clock,
      title: 'THỜI GIAN',
      value: event.timeDisplay,
      subtitle: 'Đón khách & check-in từ 17:30',
      color: 'from-sky-500/20 to-sky-600/5',
      borderColor: 'border-sky-500/30',
      iconColor: 'text-sky-400',
    },
    {
      icon: Building2,
      title: 'ĐỊA ĐIỂM TỔ CHỨC',
      value: event.venue,
      subtitle: 'Không gian ấm cúng, sang trọng',
      color: 'from-purple-500/20 to-purple-600/5',
      borderColor: 'border-purple-500/30',
      iconColor: 'text-purple-400',
    },
    {
      icon: MapPin,
      title: 'ĐỊA CHỈ CHI TIẾT',
      value: event.address,
      subtitle: 'Trung tâm TP. Hà Nội, thuận tiện di chuyển',
      color: 'from-rose-500/20 to-rose-600/5',
      borderColor: 'border-rose-500/30',
      iconColor: 'text-rose-400',
    },
  ];

  return (
    <section id="event-info" className="relative w-full py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase text-sky-300 bg-sky-500/10 border border-sky-500/30 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            LỊCH TRÌNH VÀ ĐỊA ĐIỂM
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-['Playfair_Display']">
            THÔNG TIN SỰ KIỆN
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-sky-400 to-amber-400 mx-auto mt-4 rounded-full"></div>
          <p className="text-slate-400 text-sm sm:text-base max-w-lg mx-auto mt-3">
            Những thông tin quan trọng để bạn sẵn sàng tham gia đêm tiệc trọn vẹn nhất
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-10">
          {infoCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={index}
                className={`relative group rounded-3xl p-6 sm:p-8 bg-gradient-to-br ${card.color} glass-card ${card.borderColor} border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3.5 rounded-2xl bg-slate-900/80 border border-slate-700/60 ${card.iconColor} shadow-lg`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="flex-1">
                    <span className="text-xs uppercase tracking-wider text-slate-400 font-bold block mb-1">
                      {card.title}
                    </span>
                    <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                      {card.value}
                    </h3>
                    <p className="text-slate-300 text-xs mt-1 font-light">
                      {card.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Get Directions Button */}
        <div className="text-center">
          <a
            href={event.googleMapsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-sm sm:text-base tracking-wider uppercase text-white bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 shadow-xl shadow-sky-600/25 hover:shadow-sky-500/40 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <Navigation className="w-5 h-5 text-sky-200 animate-pulse" />
            <span>CHỈ ĐƯỜNG ĐẾN ĐỊA ĐIỂM (GOOGLE MAPS)</span>
          </a>
        </div>
      </div>
    </section>
  );
};
