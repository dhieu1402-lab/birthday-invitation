import React, { useState } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { eventConfig } from '../config/eventConfig';

type AttendanceStatus = 'yes' | 'no' | 'maybe';

export const RSVPSection: React.FC = () => {
  const { rsvp, club } = eventConfig;

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [attendance, setAttendance] = useState<AttendanceStatus>('yes');
  const [guestCount, setGuestCount] = useState<number>(1);
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const attendanceLabelMap: Record<AttendanceStatus, string> = {
    yes: 'Tham dự',
    no: 'Không tham dự',
    maybe: 'Chưa chắc',
  };

  const handleGuestCountChange = (value: string) => {
    const parsed = parseInt(value, 10);
    if (Number.isNaN(parsed)) {
      setGuestCount(1);
      return;
    }
    setGuestCount(Math.min(20, Math.max(1, parsed)));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim()) {
      setErrorMessage('Vui lòng nhập tên của Anh/Chị/Bạn.');
      return;
    }

    setIsSubmitting(true);

    const payload = {
      fullName: fullName.trim(),
      phone: phone.trim(),
      attendance,
      attendanceText: attendanceLabelMap[attendance],
      guestCount: attendance === 'no' ? 0 : guestCount,
      message: note.trim(),
      submittedAt: new Date().toISOString(),
    };

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
      try {
        const existingData = JSON.parse(localStorage.getItem('eec_rsvp_responses') || '[]');
        existingData.push(payload);
        localStorage.setItem('eec_rsvp_responses', JSON.stringify(existingData));
      } catch {
        // ignore storage errors
      }
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      if (attendance !== 'no') {
        confetti({
          particleCount: 110,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#88cef4', '#0284c7', '#f5c542', '#38bdf8'],
        });
      }
    }, 600);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFullName('');
    setPhone('');
    setAttendance('yes');
    setGuestCount(1);
    setNote('');
  };

  return (
    <section id="rsvp" className="relative w-full py-8 sm:py-12 px-4">
      <div className="max-w-lg mx-auto">
        {/* Clean Paper Card matching reference */}
        <div className="relative bg-white rounded-3xl p-7 sm:p-10 border border-[#0284c7]/15 shadow-[12px_12px_0_rgba(136,206,244,0.35),0_16px_40px_rgba(3,52,105,0.08)] overflow-hidden">
          {/* Minimal 2 corner accents: Top-Left & Bottom-Right */}
          <div className="absolute top-4 left-4 w-7 h-7 border-t-2 border-l-2 border-[#0c4a6e]/70 pointer-events-none" />
          <div className="absolute bottom-4 right-4 w-7 h-7 border-b-2 border-r-2 border-[#0c4a6e]/70 pointer-events-none" />

          {isSubmitted ? (
            <div className="text-center py-6 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-[#e0f2fe] text-[#0284c7] flex items-center justify-center mx-auto mb-4 border border-[#7dd3fc]">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <h3 className="text-2xl font-bold text-[#0c4a6e] mb-2 font-display">
                Cảm ơn {fullName}!
              </h3>

              <p className="text-[#0369a1] text-sm sm:text-base max-w-sm mx-auto mb-4 leading-relaxed">
                {attendance === 'yes' && (
                  <>
                    CLB đã ghi nhận <strong className="text-[#0c4a6e]">{guestCount} người</strong> tham dự. Hẹn gặp Anh/Chị/Bạn tại buổi tiệc sinh nhật <strong className="text-[#0c4a6e]">{club.shortName}</strong>!
                  </>
                )}
                {attendance === 'maybe' && (
                  <>
                    CLB đã ghi nhận phản hồi của Anh/Chị/Bạn (<strong className="text-[#0c4a6e]">Chưa chắc • {guestCount} người</strong>). Rất mong sẽ được đón tiếp Anh/Chị/Bạn tại buổi lễ!
                  </>
                )}
                {attendance === 'no' && (
                  <>
                    Rất tiếc vì Anh/Chị/Bạn chưa thể sắp xếp tham dự lần này. Cảm ơn tình cảm dành cho <strong className="text-[#0c4a6e]">{club.shortName}</strong>!
                  </>
                )}
              </p>

              <div className="p-3 rounded-xl bg-[#f0f9ff] border border-[#0284c7]/15 text-xs text-[#0369a1] max-w-sm mx-auto mb-5">
                {!rsvp.googleSheetWebhookUrl ? (
                  <span>
                    ℹ️ <em>Chế độ thử nghiệm giao diện (có thể kết nối Google Sheets trong <code className="text-[#0c4a6e] font-semibold">eventConfig.ts</code>).</em>
                  </span>
                ) : (
                  <span className="text-emerald-700 font-medium">
                    ✓ Phản hồi đã được lưu vào danh sách của Ban Tổ Chức.
                  </span>
                )}
              </div>

              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-full text-xs font-bold font-display bg-[#e0f2fe] hover:bg-[#bae6fd] text-[#0c4a6e] border border-[#0284c7]/20 transition-colors cursor-pointer"
              >
                Gửi phản hồi khác
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
              {/* Header inside card */}
              <div className="text-center pt-1">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0c4a6e] tracking-tight font-display">
                  Xác nhận tham dự
                </h2>
                <p className="text-[#0369a1] text-sm sm:text-base mt-2.5 leading-relaxed max-w-sm mx-auto">
                  Hội trường có giới hạn chỗ ngồi, Anh/Chị/Bạn nhắn giúp CLB một dòng để BTC giữ đúng chỗ nhé.
                </p>
              </div>

              {/* Tên của Anh/Chị/Bạn */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-[#0c4a6e] font-display mb-2">
                  Tên của Anh/Chị/Bạn
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Nhập họ tên (VD: Nguyễn Văn An)"
                  className="w-full px-4 py-3 rounded-2xl bg-white border border-[#0284c7]/18 text-[#0c4a6e] placeholder:text-slate-400 focus:outline-none focus:border-[#0284c7] focus:ring-2 focus:ring-[#88cef4]/50 text-sm transition-all"
                />
              </div>

              {/* Số điện thoại liên hệ (nằm ngay dưới Tên) */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-[#0c4a6e] font-display mb-2">
                  Số điện thoại liên hệ <span className="text-slate-400 text-xs font-normal font-body">(Không bắt buộc)</span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Nhập SĐT hoặc Zalo để BTC liên hệ đón tiếp"
                  className="w-full px-4 py-3 rounded-2xl bg-white border border-[#0284c7]/18 text-[#0c4a6e] placeholder:text-slate-400 focus:outline-none focus:border-[#0284c7] focus:ring-2 focus:ring-[#88cef4]/50 text-sm transition-all"
                />
              </div>

              {/* 3 Trạng thái tham dự */}
              <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                {(
                  [
                    { key: 'yes', label: 'Tham dự' },
                    { key: 'no', label: 'Không tham dự' },
                    { key: 'maybe', label: 'Chưa chắc' },
                  ] as { key: AttendanceStatus; label: string }[]
                ).map((opt) => {
                  const isActive = attendance === opt.key;
                  return (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => setAttendance(opt.key)}
                      className={`py-3 px-2 rounded-2xl border text-xs sm:text-sm font-bold font-display transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#e8f5fd] border-[#7dd3fc] text-[#0c4a6e] shadow-sm'
                          : 'bg-white border-[#0284c7]/15 text-[#0c4a6e]/80 hover:border-[#7dd3fc] hover:bg-[#f8fcff]'
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>

              {/* Số người tham dự */}
              {attendance !== 'no' && (
                <div className="flex items-center justify-between gap-4 pt-1">
                  <label
                    htmlFor="rsvp-guest-count"
                    className="text-xs sm:text-sm font-bold text-[#0c4a6e] font-display"
                  >
                    Số người tham dự
                  </label>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setGuestCount((prev) => Math.max(1, prev - 1))}
                      aria-label="Giảm số người"
                      className="w-8 h-10 rounded-xl border border-[#0284c7]/18 bg-white hover:bg-[#f0f9ff] text-[#0c4a6e] font-bold transition-colors cursor-pointer"
                    >
                      -
                    </button>
                    <input
                      id="rsvp-guest-count"
                      type="number"
                      min={1}
                      max={20}
                      value={guestCount}
                      onChange={(e) => handleGuestCountChange(e.target.value)}
                      className="w-16 h-10 text-center rounded-2xl bg-white border border-[#0284c7]/18 text-[#0c4a6e] font-bold text-sm focus:outline-none focus:border-[#0284c7] tabular-nums"
                    />
                    <button
                      type="button"
                      onClick={() => setGuestCount((prev) => Math.min(20, prev + 1))}
                      aria-label="Tăng số người"
                      className="w-8 h-10 rounded-xl border border-[#0284c7]/18 bg-white hover:bg-[#f0f9ff] text-[#0c4a6e] font-bold transition-colors cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              {/* Lời nhắn gửi CLB (không bắt buộc) */}
              <div>
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Lời nhắn hoặc lời chúc gửi CLB (không bắt buộc)"
                  className="w-full px-4 py-2.5 rounded-2xl bg-[#f8fcff] border border-[#0284c7]/15 text-[#0c4a6e] placeholder:text-slate-400 focus:outline-none focus:border-[#0284c7] focus:ring-2 focus:ring-[#88cef4]/40 text-xs sm:text-sm transition-all"
                />
              </div>

              {/* Error Alert */}
              {errorMessage && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 border border-rose-300 text-rose-700 text-xs font-medium">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Submit Pill Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-full font-bold text-sm sm:text-base text-white font-display bg-gradient-to-r from-[#88cef4] via-[#67b7e6] to-[#74a3cb] hover:from-[#5ec0f2] hover:to-[#4f92c9] shadow-lg shadow-[#0284c7]/20 hover:shadow-[#0284c7]/35 active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? 'Đang gửi xác nhận...' : 'Gửi xác nhận'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
