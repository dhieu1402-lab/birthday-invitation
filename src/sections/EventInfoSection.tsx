import React from 'react';
import { Calendar, Clock, MapPin, Navigation, Sparkles, Building2, ListChecks } from 'lucide-react';
import { eventConfig } from '../config/eventConfig';

export const EventInfoSection: React.FC = () => {
  const { event } = eventConfig;

  const infoCards = [
    {
      icon: Clock,
      title: 'GIỜ BẮT ĐẦU BUỔI LỄ',
      value: `Khai mạc: ${event.startTime}`,
      subtitle: 'Đón khách & chụp ảnh lưu niệm từ 17:30',
      iconBg: 'bg-[#e0f2fe]',
      iconColor: 'text-[#0284c7]',
    },
    {
      icon: Calendar,
      title: 'NGÀY TỔ CHỨC',
      value: event.dateDisplay,
      subtitle: 'Rất mong Anh/Chị/Bạn sắp xếp thời gian tham dự',
      iconBg: 'bg-[#e0f2fe]',
      iconColor: 'text-[#1f6fac]',
    },
    {
      icon: Building2,
      title: 'ĐỊA ĐIỂM TỔ CHỨC',
      value: event.venue,
      subtitle: 'Không gian trang trọng, ấm cúng',
      iconBg: 'bg-[#fef9c3]',
      iconColor: 'text-[#a9720c]',
    },
    {
      icon: MapPin,
      title: 'ĐỊA CHỈ CHI TIẾT',
      value: event.address,
      subtitle: 'Khuôn viên Trường ĐH Xây dựng Hà Nội',
      iconBg: 'bg-[#e0f2fe]',
      iconColor: 'text-[#0284c7]',
    },
  ];

  return (
    <section id="event-info" className="relative w-full py-8 sm:py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase sn2-badge font-display mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#0284c7]" />
            THỜI GIAN & ĐỊA ĐIỂM
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0c4a6e] tracking-tight font-display">
            THÔNG TIN SỰ KIỆN
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#88cef4] to-[#0284c7] mx-auto mt-4 rounded-full"></div>
          <p className="text-[#0369a1] text-sm sm:text-base max-w-lg mx-auto mt-3">
            Những thông tin quan trọng để Anh/Chị/Bạn sẵn sàng tham dự đêm tiệc trọn vẹn nhất
          </p>
        </div>

        {/* 4 Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-10">
          {infoCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={index}
                className="relative group rounded-3xl p-6 sm:p-7 sn2-paper-card transition-all duration-300 hover:-translate-y-1 hover:border-[#38bdf8]"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3.5 rounded-2xl ${card.iconBg} border border-[#0284c7]/15 ${card.iconColor} shadow-sm flex-shrink-0`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="flex-1">
                    <span className="text-xs uppercase tracking-wider text-[#0284c7] font-bold font-display block mb-1">
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

        {/* Timeline Chương Trình Dự Kiến */}
        {event.timeline && event.timeline.length > 0 && (
          <div className="sn2-paper-card rounded-3xl p-6 sm:p-9 mb-10">
            <div className="text-center mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase sn2-badge font-display mb-2">
                <ListChecks className="w-3.5 h-3.5 text-[#0284c7]" />
                KỊCH BẢN CHƯƠNG TRÌNH
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#0c4a6e] font-display">
                Lịch Trình Dự Kiến
              </h3>
              <p className="text-xs sm:text-sm text-[#0369a1] mt-1">
                Các khung giờ chính của buổi lễ kỷ niệm sinh nhật CLB
              </p>
            </div>

            <div className="relative max-w-3xl mx-auto pl-6 sm:pl-8 space-y-6 before:content-[''] before:absolute before:left-2.5 sm:before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-[#88cef4] before:via-[#0284c7] before:to-[#7dd3fc]">
              {event.timeline.map((item, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline Node */}
                  <div className="absolute -left-[22px] sm:-left-[25px] top-1.5 w-4 h-4 rounded-full bg-[#f5c542] border-2 border-white shadow ring-2 ring-[#0284c7]/30 group-hover:scale-110 transition-transform" />

                  <div className="p-4 sm:p-5 rounded-2xl bg-[#f0f9ff] border border-[#0284c7]/15 group-hover:border-[#38bdf8] transition-colors">
                    <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#0284c7] text-white font-display tabular-nums">
                        <Clock className="w-3 h-3" />
                        {item.time}
                      </span>
                      <h4 className="text-base sm:text-lg font-bold text-[#0c4a6e] font-display">
                        {item.title}
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm text-[#0369a1] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Get Directions Button */}
        <div className="text-center">
          <a
            href={event.googleMapsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-sm sm:text-base tracking-wider uppercase text-white bg-gradient-to-r from-[#0369a1] to-[#0ea5e9] hover:from-[#0284c7] hover:to-[#38bdf8] shadow-xl shadow-[#0284c7]/25 hover:shadow-[#0284c7]/40 hover:scale-105 active:scale-95 transition-all duration-300 font-display"
          >
            <Navigation className="w-5 h-5 text-[#e0f7ff] animate-pulse" />
            <span>XEM CHỈ ĐƯỜNG TRÊN BẢN ĐỒ</span>
          </a>
        </div>
      </div>
    </section>
  );
};
