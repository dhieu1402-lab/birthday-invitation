import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Heart, User, Phone, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';
import { eventConfig } from '../config/eventConfig';

export const RSVPSection: React.FC = () => {
  const { rsvp, club } = eventConfig;

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [attendance, setAttendance] = useState<'yes' | 'no'>('yes');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim()) {
      setErrorMessage('Vui lòng nhập Họ và tên của bạn.');
      return;
    }

    setIsSubmitting(true);

    const payload = {
      fullName: fullName.trim(),
      phone: phone.trim(),
      attendance,
      attendanceText: attendance === 'yes' ? 'Có, mình sẽ tham gia!' : 'Rất tiếc, mình không thể tham gia.',
      message: message.trim(),
      submittedAt: new Date().toISOString(),
    };

    // If Google Sheet Webhook is configured, POST to it
    if (rsvp.googleSheetWebhookUrl && rsvp.googleSheetWebhookUrl.trim() !== '') {
      try {
        await fetch(rsvp.googleSheetWebhookUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } catch (err) {
        console.warn('Google Sheet submission warning:', err);
      }
    } else {
      // Local demo mode: Save to localStorage for demo persistence
      try {
        const existingData = JSON.parse(localStorage.getItem('eec_rsvp_responses') || '[]');
        existingData.push(payload);
        localStorage.setItem('eec_rsvp_responses', JSON.stringify(existingData));
      } catch {
        // ignore storage errors
      }
    }

    // Small delay for UI smoothness
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      if (attendance === 'yes') {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#88cef4', '#0284c7', '#f5c542', '#38bdf8'],
        });
      }
    }, 700);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFullName('');
    setPhone('');
    setMessage('');
    setAttendance('yes');
  };

  return (
    <section id="rsvp" className="relative w-full py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase sn2-badge font-alt mb-3">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            PHẢN HỒI THAM DỰ
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0a568b] tracking-tight font-display">
            WILL YOU JOIN US?
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#88cef4] to-[#0284c7] mx-auto mt-4 rounded-full"></div>
          <p className="text-[#0369a1] text-sm sm:text-base mt-3">
            Để Ban Tổ Chức {club.shortName} chuẩn bị đón tiếp bạn chu đáo nhất, xin vui lòng xác nhận sự tham gia của bạn nhé!
          </p>
        </div>

        {/* Paper Card Form */}
        <div className="relative sn2-paper-card rounded-3xl p-6 sm:p-10 overflow-hidden">
          {/* Sky-Blue Corner Accents */}
          <div className="absolute top-3 left-3 w-7 h-7 border-t-2 border-l-2 border-[#7dd3fc] rounded-tl-lg pointer-events-none"></div>
          <div className="absolute top-3 right-3 w-7 h-7 border-t-2 border-r-2 border-[#7dd3fc] rounded-tr-lg pointer-events-none"></div>
          <div className="absolute bottom-3 left-3 w-7 h-7 border-b-2 border-l-2 border-[#7dd3fc] rounded-bl-lg pointer-events-none"></div>
          <div className="absolute bottom-3 right-3 w-7 h-7 border-b-2 border-r-2 border-[#7dd3fc] rounded-br-lg pointer-events-none"></div>

          {isSubmitted ? (
            <div className="text-center py-8 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-[#e0f2fe] text-[#0284c7] flex items-center justify-center mx-auto mb-4 border border-[#7dd3fc]">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <h3 className="text-2xl font-bold text-[#0c4a6e] mb-2 font-display">
                Cảm ơn bạn, {fullName}!
              </h3>

              <p className="text-[#0369a1] text-sm sm:text-base max-w-md mx-auto mb-4 leading-relaxed">
                {attendance === 'yes' ? (
                  <>
                    🎉 Ban Tổ Chức đã ghi nhận xác nhận tham dự của bạn. Hẹn gặp bạn tại buổi tiệc sinh nhật của{' '}
                    <strong className="text-[#0c4a6e]">{club.shortName}</strong>!
                  </>
                ) : (
                  <>
                    Rất tiếc vì bạn không thể tham gia lần này. Cảm ơn tình cảm và lời chúc quý báu của bạn dành cho{' '}
                    <strong className="text-[#0c4a6e]">{club.shortName}</strong>!
                  </>
                )}
              </p>

              {/* Status Note about Backend Config */}
              <div className="p-3.5 rounded-xl bg-[#f0f9ff] border border-[#0284c7]/15 text-xs text-[#0369a1] max-w-sm mx-auto mb-6">
                {!rsvp.googleSheetWebhookUrl ? (
                  <span>
                    ℹ️ <em>Hệ thống đang chạy ở chế độ Demo UI. Bạn có thể kết nối Google Sheets trong file <code className="text-[#0c4a6e] font-semibold">eventConfig.ts</code> để lưu vào bảng tính thực tế.</em>
                  </span>
                ) : (
                  <span className="text-emerald-700 font-medium">
                    ✓ Dữ liệu phản hồi đã được chuyển tiếp đến hệ thống Google Sheets của BTC.
                  </span>
                )}
              </div>

              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-xl text-xs font-bold font-alt bg-[#e0f2fe] hover:bg-[#bae6fd] text-[#0c4a6e] border border-[#0284c7]/20 transition-colors cursor-pointer"
              >
                GỬI PHẢN HỒI KHÁC
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#0a568b] font-alt mb-2">
                  Họ và Tên <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#0284c7]">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ví dụ: Nguyễn Văn An"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/90 border border-[#0284c7]/20 text-[#0a568b] placeholder:text-slate-400 focus:outline-none focus:border-[#0284c7] focus:ring-1 focus:ring-[#0284c7] text-sm transition-all"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#0a568b] font-alt mb-2">
                  Số điện thoại <span className="text-slate-400 text-[10px] font-normal">(Không bắt buộc)</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#0284c7]">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Số điện thoại hoặc Zalo để nhận thông báo"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/90 border border-[#0284c7]/20 text-[#0a568b] placeholder:text-slate-400 focus:outline-none focus:border-[#0284c7] focus:ring-1 focus:ring-[#0284c7] text-sm transition-all"
                  />
                </div>
              </div>

              {/* Attendance Options */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#0a568b] font-alt mb-2.5">
                  Bạn có thể tham dự cùng chúng mình không? <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setAttendance('yes')}
                    className={`flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      attendance === 'yes'
                        ? 'bg-[#88cef4]/25 border-[#0284c7] text-[#0c4a6e] shadow-md shadow-[#0284c7]/10'
                        : 'bg-white/70 border-[#0284c7]/15 text-slate-500 hover:border-[#7dd3fc]'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        attendance === 'yes' ? 'border-[#0284c7] bg-[#0284c7]' : 'border-slate-300'
                      }`}
                    >
                      {attendance === 'yes' && <div className="w-2 h-2 rounded-full bg-white"></div>}
                    </div>
                    <div>
                      <span className="text-sm font-bold block text-[#0c4a6e] font-alt">Có, mình sẽ tham gia!</span>
                      <span className="text-[11px] text-[#0369a1]">YES! I'LL BE THERE</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAttendance('no')}
                    className={`flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      attendance === 'no'
                        ? 'bg-rose-50 border-rose-400 text-rose-900 shadow-md shadow-rose-500/10'
                        : 'bg-white/70 border-[#0284c7]/15 text-slate-500 hover:border-[#7dd3fc]'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        attendance === 'no' ? 'border-rose-500 bg-rose-500' : 'border-slate-300'
                      }`}
                    >
                      {attendance === 'no' && <div className="w-2 h-2 rounded-full bg-white"></div>}
                    </div>
                    <div>
                      <span className="text-sm font-bold block text-[#0c4a6e] font-alt">Rất tiếc, mình bận</span>
                      <span className="text-[11px] text-slate-500">SORRY, CAN'T MAKE IT</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#0a568b] font-alt mb-2">
                  Lời nhắn gửi đến CLB <span className="text-slate-400 text-[10px] font-normal">(Không bắt buộc)</span>
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-3.5 pointer-events-none text-[#0284c7]">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Gửi lời chúc mừng sinh nhật hoặc nhắn nhủ đến BTC..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/90 border border-[#0284c7]/20 text-[#0a568b] placeholder:text-slate-400 focus:outline-none focus:border-[#0284c7] focus:ring-1 focus:ring-[#0284c7] text-sm transition-all resize-none"
                  ></textarea>
                </div>
              </div>

              {/* Error Alert */}
              {errorMessage && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 border border-rose-300 text-rose-700 text-xs font-medium">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2.5 py-4 rounded-xl font-bold text-sm uppercase tracking-wider sn2-btn-primary font-alt cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>ĐANG GỬI XÁC NHẬN...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>GỬI XÁC NHẬN (SUBMIT RSVP)</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
