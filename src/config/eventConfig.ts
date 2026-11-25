/**
 * =====================================================================
 * FILE CẤU HÌNH DUY NHẤT CHO TOÀN BỘ WEBSITE THIỆP MỜI SINH NHẬT CLB
 * =====================================================================
 * Bạn có thể dễ dàng thay đổi toàn bộ thông tin sự kiện, màu sắc, hình ảnh,
 * thông tin chuyển khoản ngân hàng và các tùy chọn tương tác tại đây.
 */

export interface MemoryImage {
  id: string;
  url: string;
  title: string;
  caption: string;
  year?: string;
}

export interface BankConfig {
  bankName: string;
  bankCode: string; // Mã chuẩn VietQR (MB, VCB, TCB, VPB, ...)
  accountName: string;
  accountNumber: string;
  defaultAmount?: string;
  transferMessage: string;
  qrImage: string; // Ảnh QR thật hoặc link ảnh
  bankingAppUrl?: string; // Deep link nếu có
}

export interface RsvpConfig {
  // Đường dẫn Google Form hoặc Webhook Google Sheets (Apps Script) để lưu dữ liệu thực tế
  // Nếu để trống (""), hệ thống sẽ tự động hiển thị chế độ Demo + lưu vào LocalStorage
  googleSheetWebhookUrl: string;
  googleFormDirectUrl?: string;
  contactHotline: string;
}

export interface EventConfig {
  club: {
    name: string;
    shortName: string;
    subTitle: string;
    logo: string;
    establishedYear: number;
    organizer: string;
  };
  event: {
    title: string;
    theme: string;
    editionText: string;
    dateDisplay: string; // VD: 25 Tháng 12, 2026
    timeDisplay: string; // VD: 18:00 - 21:30
    // Định dạng ISO: YYYY-MM-DDTHH:mm:ss+07:00 (Múi giờ Việt Nam Asia/Ho_Chi_Minh)
    targetDateTime: string; 
    venue: string;
    address: string;
    googleMapsUrl: string;
  };
  invitation: {
    badge: string;
    headline: string;
    body: string;
    subText: string;
    signatureTitle: string;
    signatureName: string;
  };
  music: {
    audioUrl: string; // Đường dẫn file nhạc trong /public/music/ hoặc link mp3 online
    title: string;
    artist: string;
    useWebAudioSynthesizerFallback: boolean; // Nếu file nhạc chưa tải được, tự động phát giai điệu chúc mừng sinh nhật
  };
  memories: MemoryImage[];
  rsvp: RsvpConfig;
  bank: BankConfig;
  thanks: {
    headline: string;
    title: string;
    message: string;
    subMessage: string;
    copyrightYear: number;
  };
  theme: {
    primaryColor: string; // Màu chủ đạo (hex/css)
    accentColor: string;
    goldColor: string;
  };
}

export const eventConfig: EventConfig = {
  club: {
    name: "CLB KỸ SƯ KINH TẾ",
    shortName: "CEM - EEC",
    subTitle: "ECONOMICS ENGINEERING CLUB • LEARNING TOGETHER",
    logo: "./images/logo.png",
    establishedYear: 2011,
    organizer: "Ban Chủ Nhiệm CLB Kỹ Sư Kinh Tế CEM - EEC",
  },

  event: {
    title: "LỄ KỶ NIỆM SINH NHẬT CLB KỸ SƯ KINH TẾ",
    theme: "Dấu Ấn Tự Hào – Vững Bước Vươn Xa",
    editionText: "SINH NHẬT KỶ NIỆM 15 NĂM",
    dateDisplay: "Thứ Bảy, 25/12/2026",
    timeDisplay: "18:00 - 21:30 (Đón khách từ 17:30)",
    // Thời điểm đếm ngược (Múi giờ Việt Nam UTC+7):
    targetDateTime: "2026-12-25T18:00:00+07:00",
    venue: "Hội trường G3 - Trường Đại học Xây dựng Hà Nội (HUCE)",
    address: "Số 55 Giải Phóng, Phường Đồng Tâm, Quận Hai Bà Trưng, TP. Hà Nội",
    googleMapsUrl: "https://maps.google.com/?q=Tr%C6%B0%E1%BB%9Dng+%C4%90%E1%BA%A1i+h%E1%BB%8Dc+X%C3%A2y+d%E1%BB%B1ng+H%C3%A0+N%E1%BB%99i+55+Gi%E1%BA%A3i+Ph%C3%B3ng",
  },

  invitation: {
    badge: "YOU ARE CORDIALLY INVITED",
    headline: "TRÂN TRỌNG KÍNH MỜI",
    body: "Chúng mình trân trọng kính mời bạn đến tham dự buổi tiệc sinh nhật của CLB Kỹ Sư Kinh Tế (CEM - EEC). Hãy cùng nhau nhìn lại hành trình đã qua, gặp gỡ những người bạn tuyệt vời và tạo nên những kỷ niệm thật đáng nhớ!",
    subText: "Sự hiện diện của bạn là niềm vinh hạnh to lớn và là món quà ý nghĩa nhất đối với đại gia đình CEM-EEC.",
    signatureTitle: "Thay mặt Ban Tổ Chức",
    signatureName: "Ban Chủ Nhiệm CEM - EEC",
  },

  music: {
    audioUrl: "./music/happy-birthday.mp3",
    title: "Happy Birthday Celebration",
    artist: "Acoustic Birthday Melody",
    useWebAudioSynthesizerFallback: true,
  },

  memories: [
    {
      id: "mem-1",
      url: "./images/memories/492957078_1291510556313067_4530635472757656294_n.jpg",
      title: "Khoảnh khắc đại gia đình",
      caption: "Buổi gặp gỡ ấm áp của các thế hệ thành viên CEM-EEC",
      year: "2024",
    },
    {
      id: "mem-2",
      url: "./images/memories/131621166_2610200479164680_5579077495668750311_n.jpg",
      title: "Đêm tiệc sinh nhật CLB",
      caption: "Nụ cười rạng rỡ bên chiếc bánh sinh nhật và bóng bay rực rỡ",
      year: "Kỷ niệm",
    },
    {
      id: "mem-3",
      url: "./images/memories/483523175_1254800126650777_3905750767790360718_n.jpg",
      title: "Hội ngộ & Kết nối",
      caption: "Cùng nhau chia sẻ kinh nghiệm, truyền lửa đam mê nghề nghiệp",
      year: "Gắn kết",
    },
    {
      id: "mem-4",
      url: "./images/memories/484094130_1254800196650770_4904293993263364271_n.jpg",
      title: "Giao lưu các thế hệ",
      caption: "Những câu chuyện truyền cảm hứng từ các anh chị cựu thành viên",
      year: "Đồng hành",
    },
    {
      id: "mem-5",
      url: "./images/memories/496148218_1311572994306823_6029327761840779555_n.jpg",
      title: "Nhiệt huyết thanh xuân",
      caption: "Sức trẻ và năng lượng sáng tạo trong từng hoạt động chuyên môn",
      year: "Sáng tạo",
    },
    {
      id: "mem-6",
      url: "./images/memories/497789275_1311573050973484_1031158740136861693_n.jpg",
      title: "Hoạt động chuyên môn & Workshop",
      caption: "Học hỏi cùng nhau - Slogan Learning Together được thắp sáng",
      year: "Tri thức",
    },
    {
      id: "mem-7",
      url: "./images/memories/597691706_1502891991841588_6056187996501200952_n.jpg",
      title: "Kỷ niệm khó phai",
      caption: "Từng ánh mắt, từng tràng pháo tay đọng lại trong tim mỗi người",
      year: "Tình bạn",
    },
    {
      id: "mem-8",
      url: "./images/memories/599551616_1502891078508346_5638285733786690186_n.jpg",
      title: "Chuyến đi đáng nhớ",
      caption: "Những hành trình dã ngoại, team-building thắt chặt tình đoàn kết",
      year: "Hành trình",
    },
  ],

  rsvp: {
    // Để trống ("") để chạy chế độ demo mượt mà (lưu localStorage và thông báo trực quan).
    // Khi có Google Sheet Webhook URL, chỉ cần dán vào đây!
    googleSheetWebhookUrl: "",
    googleFormDirectUrl: "",
    contactHotline: "0365.140.206",
  },

  bank: {
    bankName: "MBBank (Ngân hàng TMCP Quân đội)",
    bankCode: "MB",
    accountName: "DINH TRUNG HIEU",
    accountNumber: "36514022006",
    defaultAmount: "", // Để trống để khách mời tự chọn
    transferMessage: "CHUC MUNG SINH NHAT EEC",
    qrImage: "./qr/qr-chuyenkhoan.jpg",
    bankingAppUrl: "", // Hỗ trợ mở deep link ngân hàng nếu có
  },

  thanks: {
    headline: "THANK YOU FOR BEING PART OF OUR JOURNEY!",
    title: "CẢM ƠN VÌ ĐÃ LÀ MỘT PHẦN TRONG HÀNH TRÌNH CỦA CHÚNG MÌNH!",
    message: "Cảm ơn bạn đã luôn tin tưởng, đồng hành và là một mảnh ghép không thể thiếu trong sự phát triển của CLB Kỹ Sư Kinh Tế CEM-EEC.",
    subMessage: "Hy vọng chúng ta sẽ cùng nhau tạo nên thật nhiều kỷ niệm đẹp trong đêm tiệc và tiếp tục viết tiếp những chương mới rực rỡ!",
    copyrightYear: 2026,
  },

  theme: {
    primaryColor: "#88cef4", // Xanh da trời nhạt (Dynamic Blue)
    accentColor: "#1f6fac",  // Xanh đại dương đậm
    goldColor: "#f5c542",    // Vàng đồng ấm (Wax seal / huy hiệu)
  },
};
