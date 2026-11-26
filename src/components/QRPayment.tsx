import React, { useState } from 'react';
import {
  Copy,
  Check,
  Download,
  Maximize2,
  X,
  CreditCard,
  HeartHandshake,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { eventConfig } from '../config/eventConfig';
import { RevealOnScroll } from './RevealOnScroll';

export const QRPayment: React.FC = () => {
  const { bank } = eventConfig;
  const [copiedField, setCopiedField] = useState<'account' | 'message' | null>(null);
  const [isQrZoomed, setIsQrZoomed] = useState(false);

  const vietQrDynamicUrl = `https://img.vietqr.io/image/${bank.bankCode}-${bank.accountNumber}-compact2.png?amount=${
    bank.defaultAmount || ''
  }&addInfo=${encodeURIComponent(bank.transferMessage)}&accountName=${encodeURIComponent(bank.accountName)}`;

  const handleCopy = (text: string, field: 'account' | 'message') => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => {
      setCopiedField(null);
    }, 2500);
  };

  const handleDownloadQr = () => {
    const link = document.createElement('a');
    link.href = vietQrDynamicUrl;
    link.download = `QR-Mung-Sinh-Nhat-${bank.accountNumber}.png`;
    link.target = '_blank';
    link.rel = 'noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 sm:py-8">
      <RevealOnScroll variant="up">
        <div className="relative sn2-paper-card rounded-3xl p-6 sm:p-10 overflow-hidden">
        {/* Corner Accents */}
        <div className="absolute top-3 left-3 w-7 h-7 border-t-2 border-l-2 border-[#7dd3fc] rounded-tl-lg pointer-events-none"></div>
        <div className="absolute top-3 right-3 w-7 h-7 border-t-2 border-r-2 border-[#7dd3fc] rounded-tr-lg pointer-events-none"></div>
        <div className="absolute bottom-3 left-3 w-7 h-7 border-b-2 border-l-2 border-[#7dd3fc] rounded-bl-lg pointer-events-none"></div>
        <div className="absolute bottom-3 right-3 w-7 h-7 border-b-2 border-r-2 border-[#7dd3fc] rounded-br-lg pointer-events-none"></div>

        {/* Subtle decorative sky & gold glow */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#88cef4]/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#f5c542]/15 rounded-full blur-3xl pointer-events-none"></div>

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase sn2-badge font-display mb-3">
            <HeartHandshake className="w-3.5 h-3.5 text-[#0284c7]" />
            TẤM LÒNG & CHÚC PHÚC
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-[#0c4a6e] tracking-tight font-display">
            MÓN QUÀ NHỎ, TẤM LÒNG LỚN
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#88cef4] to-[#0284c7] mx-auto mt-4 rounded-full"></div>
          <p className="text-[#0369a1] text-sm sm:text-base mt-4 leading-relaxed">
            Nếu Anh/Chị/Bạn muốn gửi một món quà nhỏ thay cho lời chúc mừng đến CLB, chúng mình xin phép gửi thông tin bên dưới.
            <br />
            <strong className="text-[#0c4a6e] font-semibold">Sự hiện diện và tình cảm của Anh/Chị/Bạn đã là món quà tuyệt vời nhất!</strong>
          </p>
        </div>

        {/* QR Code and Account Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
          {/* QR Code Column */}
          <div className="md:col-span-5 flex flex-col items-center">
            <div className="relative group p-3.5 rounded-2xl bg-gradient-to-b from-[#f0f9ff] to-white border-2 border-[#7dd3fc]/70 shadow-lg shadow-[#0284c7]/10">
              <div
                onClick={() => setIsQrZoomed(true)}
                className="cursor-pointer relative overflow-hidden rounded-xl bg-white p-2 max-w-[240px] sm:max-w-[260px]"
                title="Nhấn để phóng to mã QR"
              >
                <img
                  src={vietQrDynamicUrl}
                  alt="QR Chuyển khoản mừng sinh nhật"
                  className="w-full h-auto object-contain rounded-lg transition-transform duration-300 group-hover:scale-102"
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    if (img.dataset.fallbackApplied) return;
                    img.dataset.fallbackApplied = 'true';
                    img.src = bank.qrImage;
                  }}
                />
                {/* Zoom overlay hint */}
                <div className="absolute inset-0 bg-[#041f3d]/45 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300">
                  <span className="px-3 py-1.5 rounded-full bg-white text-[#0c4a6e] text-xs font-bold font-display flex items-center gap-1.5 shadow-lg">
                    <Maximize2 className="w-3.5 h-3.5 text-[#0284c7]" /> Phóng to QR
                  </span>
                </div>
              </div>
            </div>

            {/* Save QR button */}
            <button
              onClick={handleDownloadQr}
              className="mt-3.5 flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold font-display bg-[#e0f2fe] hover:bg-[#bae6fd] text-[#0c4a6e] border border-[#0284c7]/25 transition-all shadow-sm cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#0284c7]" />
              LƯU ẢNH QR VỀ MÁY
            </button>
          </div>

          {/* Account Information Details Column */}
          <div className="md:col-span-7 flex flex-col gap-3.5">
            {/* Bank Name */}
            <div className="p-3.5 rounded-xl bg-[#f0f9ff] border border-[#0284c7]/15">
              <span className="text-xs uppercase tracking-wider text-[#0369a1] flex items-center gap-1.5 mb-1 font-bold font-display">
                <CreditCard className="w-3.5 h-3.5 text-[#0284c7]" />
                Ngân Hàng
              </span>
              <p className="text-[#0c4a6e] font-bold text-base sm:text-lg">{bank.bankName}</p>
            </div>

            {/* Account Owner */}
            <div className="p-3.5 rounded-xl bg-[#f0f9ff] border border-[#0284c7]/15">
              <span className="text-xs uppercase tracking-wider text-[#0369a1] block mb-1 font-bold font-display">
                Chủ Tài Khoản
              </span>
              <p className="text-[#1f6fac] font-extrabold text-base sm:text-lg tracking-wider">
                {bank.accountName}
              </p>
            </div>

            {/* Account Number with Copy Button */}
            <div className="p-3.5 rounded-xl bg-[#f0f9ff] border border-[#0284c7]/15 flex items-center justify-between gap-2">
              <div className="overflow-hidden">
                <span className="text-xs uppercase tracking-wider text-[#0369a1] block mb-1 font-bold font-display">
                  Số Tài Khoản
                </span>
                <p className="text-xl sm:text-2xl font-bold text-[#1f6fac] tracking-wider font-display tabular-nums">
                  {bank.accountNumber}
                </p>
              </div>

              <button
                onClick={() => handleCopy(bank.accountNumber, 'account')}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold font-display transition-all duration-300 shadow cursor-pointer ${
                  copiedField === 'account'
                    ? 'bg-emerald-600 text-white shadow-emerald-600/25'
                    : 'bg-[#0284c7] hover:bg-[#1f6fac] text-white shadow-[#0284c7]/25'
                }`}
              >
                {copiedField === 'account' ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>ĐÃ SAO CHÉP</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>SAO CHÉP STK</span>
                  </>
                )}
              </button>
            </div>

            {/* Transfer Message with Copy Button */}
            <div className="p-3.5 rounded-xl bg-[#f0f9ff] border border-[#0284c7]/15 flex items-center justify-between gap-2">
              <div className="overflow-hidden">
                <span className="text-xs uppercase tracking-wider text-[#0369a1] block mb-1 font-bold font-display">
                  Nội Dung Chuyển Khoản
                </span>
                <p className="text-sm sm:text-base font-bold text-[#0c4a6e] tracking-wide break-all">
                  {bank.transferMessage}
                </p>
              </div>

              <button
                onClick={() => handleCopy(bank.transferMessage, 'message')}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold font-display transition-all duration-300 border cursor-pointer ${
                  copiedField === 'message'
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-white hover:bg-[#e0f2fe] text-[#0284c7] border-[#0284c7]/25'
                }`}
              >
                {copiedField === 'message' ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>ĐÃ SAO CHÉP</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>SAO CHÉP ND</span>
                  </>
                )}
              </button>
            </div>

            {/* Banking Deep Link if provided */}
            {bank.bankingAppUrl && (
              <a
                href={bank.bankingAppUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 p-3.5 rounded-xl sn2-btn-primary font-bold text-xs uppercase tracking-wider font-display"
              >
                <ExternalLink className="w-4 h-4" />
                MỞ ỨNG DỤNG NGÂN HÀNG
              </a>
            )}

            {/* Polite Note */}
            <div className="flex items-start gap-2 text-xs text-[#0369a1] mt-1">
              <Sparkles className="w-4 h-4 text-[#f5c542] flex-shrink-0 mt-0.5" />
              <span>
                Mọi lời chúc hay sự hiện diện của Anh/Chị/Bạn tại buổi lễ đều là động lực quý báu để CLB tiếp tục phát triển!
              </span>
            </div>
          </div>
        </div>
        </div>
      </RevealOnScroll>

      {/* QR Zoom Modal */}
      {isQrZoomed && (
        <div
          onClick={() => setIsQrZoomed(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#041f3d]/80 backdrop-blur-md animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-sm w-full bg-white border-2 border-[#7dd3fc] rounded-3xl p-6 text-center shadow-2xl flex flex-col items-center text-[#0c4a6e]"
          >
            <button
              onClick={() => setIsQrZoomed(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-[#e0f2fe] text-[#0284c7] hover:bg-[#bae6fd] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs uppercase tracking-widest text-[#0284c7] font-bold font-display mb-3">
              MÃ QR CHUYỂN KHOẢN
            </span>

            <div className="bg-[#f0f9ff] p-3 rounded-2xl border border-[#7dd3fc]/50 max-w-[280px]">
              <img
                src={vietQrDynamicUrl}
                alt="QR Chuyển khoản phóng to"
                className="w-full h-auto object-contain rounded-xl"
              />
            </div>

            <p className="text-[#0c4a6e] font-bold text-base mt-4 font-display">{bank.bankName}</p>
            <p className="text-[#1f6fac] font-display tabular-nums text-lg font-bold mt-0.5">{bank.accountNumber}</p>
            <p className="text-[#0369a1] text-xs font-semibold mt-1">{bank.accountName}</p>

            <button
              onClick={handleDownloadQr}
              className="mt-5 w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold font-display sn2-btn-primary cursor-pointer"
            >
              <Download className="w-4 h-4" />
              TẢI ẢNH QR VỀ ĐIỆN THOẠI
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
