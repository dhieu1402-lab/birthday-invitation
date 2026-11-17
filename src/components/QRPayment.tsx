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

export const QRPayment: React.FC = () => {
  const { bank } = eventConfig;
  const [copiedField, setCopiedField] = useState<'account' | 'message' | null>(null);
  const [isQrZoomed, setIsQrZoomed] = useState(false);
  const [useVietQrCode, setUseVietQrCode] = useState(false);

  // Dynamic VietQR generator link
  const vietQrDynamicUrl = `https://img.vietqr.io/image/${bank.bankCode}-${bank.accountNumber}-compact2.png?amount=${
    bank.defaultAmount || ''
  }&addInfo=${encodeURIComponent(bank.transferMessage)}&accountName=${encodeURIComponent(bank.accountName)}`;

  // Currently displayed QR image source
  const currentQrImage = useVietQrCode ? vietQrDynamicUrl : bank.qrImage;

  const handleCopy = (text: string, field: 'account' | 'message') => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => {
      setCopiedField(null);
    }, 2500);
  };

  const handleDownloadQr = () => {
    const link = document.createElement('a');
    link.href = currentQrImage;
    link.download = `QR-Mung-Sinh-Nhat-${bank.accountNumber}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-12">
      <div className="relative glass-card rounded-3xl p-6 sm:p-10 border-amber-500/30 shadow-2xl backdrop-blur-2xl overflow-hidden">
        {/* Subtle decorative background gradient circles */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-amber-300 bg-amber-500/10 border border-amber-500/30 mb-3">
            <HeartHandshake className="w-3.5 h-3.5 text-amber-400" />
            TẤM LÒNG & CHÚC PHÚC
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-amber-300 tracking-tight font-['Playfair_Display']">
            A LITTLE GIFT, A LOT OF LOVE
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-rose-400 mx-auto mt-4 rounded-full"></div>
          <p className="text-slate-300 text-sm sm:text-base mt-4 leading-relaxed font-light">
            Nếu bạn muốn gửi một món quà nhỏ thay cho lời chúc đến CLB, chúng mình xin gửi thông tin bên dưới.
            <br />
            <strong className="text-amber-300 font-medium">Sự hiện diện và tình cảm của bạn đã là món quà tuyệt vời nhất!</strong>
          </p>
        </div>

        {/* QR Code and Account Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
          {/* QR Code Column */}
          <div className="md:col-span-5 flex flex-col items-center">
            <div className="relative group p-3.5 rounded-2xl bg-gradient-to-b from-amber-400/20 via-slate-800 to-slate-900 border border-amber-400/40 shadow-xl shadow-amber-500/5">
              <div
                onClick={() => setIsQrZoomed(true)}
                className="cursor-pointer relative overflow-hidden rounded-xl bg-white p-2.5 max-w-[240px] sm:max-w-[260px]"
                title="Nhấn để phóng to mã QR"
              >
                <img
                  src={currentQrImage}
                  alt="QR Chuyển khoản mừng sinh nhật"
                  className="w-full h-auto object-contain rounded-lg transition-transform duration-300 group-hover:scale-102"
                  onError={(e) => {
                    // Fallback to VietQR API if local path fails
                    (e.target as HTMLImageElement).src = vietQrDynamicUrl;
                  }}
                />
                {/* Zoom overlay hint */}
                <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300">
                  <span className="px-3 py-1.5 rounded-full bg-slate-900/90 text-amber-300 text-xs font-semibold flex items-center gap-1.5 shadow-lg">
                    <Maximize2 className="w-3.5 h-3.5" /> Phóng to QR
                  </span>
                </div>
              </div>

              {/* QR mode toggle (ảnh gốc vs VietQR) */}
              <div className="w-full flex items-center justify-center gap-2 mt-3 pt-2 border-t border-slate-800 text-[11px]">
                <button
                  onClick={() => setUseVietQrCode(false)}
                  className={`px-2 py-1 rounded transition-colors ${
                    !useVietQrCode ? 'bg-amber-500/30 text-amber-300 font-bold' : 'text-slate-400 hover:text-slate-300'
                  }`}
                >
                  Ảnh QR gốc
                </button>
                <span className="text-slate-600">|</span>
                <button
                  onClick={() => setUseVietQrCode(true)}
                  className={`px-2 py-1 rounded transition-colors ${
                    useVietQrCode ? 'bg-amber-500/30 text-amber-300 font-bold' : 'text-slate-400 hover:text-slate-300'
                  }`}
                >
                  VietQR Tiêu chuẩn
                </button>
              </div>
            </div>

            {/* Save QR button */}
            <button
              onClick={handleDownloadQr}
              className="mt-3.5 flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 transition-all hover:border-amber-400 shadow-md"
            >
              <Download className="w-3.5 h-3.5" />
              LƯU ẢNH QR VỀ MÁY
            </button>
          </div>

          {/* Account Information Details Column */}
          <div className="md:col-span-7 flex flex-col gap-3.5">
            {/* Bank Name */}
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-xs uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-1 font-medium">
                <CreditCard className="w-3.5 h-3.5 text-amber-400" />
                Ngân Hàng
              </span>
              <p className="text-white font-bold text-base sm:text-lg">{bank.bankName}</p>
            </div>

            {/* Account Owner */}
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-xs uppercase tracking-wider text-slate-400 block mb-1 font-medium">
                Chủ Tài Khoản
              </span>
              <p className="text-amber-200 font-extrabold text-base sm:text-lg tracking-wider">
                {bank.accountName}
              </p>
            </div>

            {/* Account Number with Copy Button */}
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-2">
              <div className="overflow-hidden">
                <span className="text-xs uppercase tracking-wider text-slate-400 block mb-1 font-medium">
                  Số Tài Khoản
                </span>
                <p className="text-xl sm:text-2xl font-black text-amber-300 tracking-wider font-mono">
                  {bank.accountNumber}
                </p>
              </div>

              <button
                onClick={() => handleCopy(bank.accountNumber, 'account')}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all duration-300 shadow ${
                  copiedField === 'account'
                    ? 'bg-emerald-500 text-slate-950 shadow-emerald-500/30'
                    : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20'
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
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-2">
              <div className="overflow-hidden">
                <span className="text-xs uppercase tracking-wider text-slate-400 block mb-1 font-medium">
                  Nội Dung Chuyển Khoản
                </span>
                <p className="text-sm sm:text-base font-bold text-slate-200 tracking-wide break-all font-mono">
                  {bank.transferMessage}
                </p>
              </div>

              <button
                onClick={() => handleCopy(bank.transferMessage, 'message')}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all duration-300 border ${
                  copiedField === 'message'
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                    : 'bg-slate-800 hover:bg-slate-700 text-amber-300 border-amber-500/30'
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
                className="flex items-center justify-center gap-2 p-3 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                MỞ ỨNG DỤNG NGÂN HÀNG
              </a>
            )}

            {/* Polite Note */}
            <div className="flex items-start gap-2 text-xs text-slate-400 mt-1">
              <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <span>
                Mọi đóng góp, lời chúc hay sự hiện diện của bạn tại buổi lễ đều là động lực quý báu để CLB tiếp tục phát triển!
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* QR Zoom Modal */}
      {isQrZoomed && (
        <div
          onClick={() => setIsQrZoomed(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-sm w-full bg-slate-900 border border-amber-500/40 rounded-3xl p-6 text-center shadow-2xl flex flex-col items-center"
          >
            <button
              onClick={() => setIsQrZoomed(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs uppercase tracking-widest text-amber-400 font-bold mb-3">
              MÃ QR CHUYỂN KHOẢN
            </span>

            <div className="bg-white p-3 rounded-2xl shadow-inner max-w-[280px]">
              <img
                src={currentQrImage}
                alt="QR Chuyển khoản phóng to"
                className="w-full h-auto object-contain rounded-xl"
              />
            </div>

            <p className="text-white font-bold text-base mt-4">{bank.bankName}</p>
            <p className="text-amber-300 font-mono text-lg font-extrabold">{bank.accountNumber}</p>
            <p className="text-slate-300 text-xs mt-1">{bank.accountName}</p>

            <button
              onClick={handleDownloadQr}
              className="mt-5 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors shadow-lg shadow-amber-500/20"
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
