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
      iconBg: 'bg-[#e0f2fe]',
      iconColor: 'text-[#0284c7]',
    },
    {
      icon: Clock,
      title: 'THỜI GIAN',
      value: event.timeDisplay,
      subtitle: 'Đón khách & check-in từ 17:30',
      iconBg: 'bg-[#e0f2fe]',
      iconColor: 'text-[#1f6fac]',
    },
    {
      icon: Building2,
      title: 'ĐỊA ĐIỂM TỔ CHỨC',
      value: event.venue,
      subtitle: 'Không gian ấm cúng, sang trọng',
      iconBg: 'bg-[#fef9c3]',
      iconColor: 'text-[#a9720c]',
    },
    {
      icon: MapPin,
      title: 'ĐỊA CHỈ CHI TIẾT',
      value: event.address,
      subtitle: 'Trung tâm TP. Hà Nội, thuận tiện di chuyển',
      iconBg: 'bg-[#e0f2fe]',
      iconColor: 'text-[#0284c7]',
    },
  ];

  return (
    <section id="event-info" className="relative w-full py-14 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase sn2-badge font-alt mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#0284c7]" />
            LỊCH TRÌNH VÀ ĐỊA ĐIỂM
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0c4a6e] tracking-tight font-display">
            THÔNG TIN SỰ KIỆN
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#88cef4] to-[#0284c7] mx-auto mt-4 rounded-full"></div>
          <p className="text-[#0369a1] text-sm sm:text-base max-w-lg mx-auto mt-3">
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
                className="relative group rounded-3xl p-6 sm:p-8 sn2-paper-card transition-all duration-300 hover:-translate-y-1 hover:border-[#38bdf8]"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3.5 rounded-2xl ${card.iconBg} border border-[#0284c7]/15 ${card.iconColor} shadow-sm`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="flex-1">
                    <span className="text-xs uppercase tracking-wider text-[#0284c7] font-bold font-alt block mb-1">
                      {card.title}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-[#0c4a6e] leading-snug font-display">
                      {card.value}
                    </h3>
                    <p className="text-[#0369a1] text-xs mt-1 font-normal">
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
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-sm sm:text-base tracking-wider uppercase text-white bg-gradient-to-r from-[#0369a1] to-[#0ea5e9] hover:from-[#0284c7] hover:to-[#38bdf8] shadow-xl shadow-[#0284c7]/25 hover:shadow-[#0284c7]/40 hover:scale-105 active:scale-95 transition-all duration-300 font-alt"
          >
            <Navigation className="w-5 h-5 text-[#e0f7ff] animate-pulse" />
            <span>CHỈ ĐƯỜNG ĐẾN ĐỊA ĐIỂM (GOOGLE MAPS)</span>
          </a>
        </div>
      </div>
    </section>
  );
};
