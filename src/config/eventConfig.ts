/**
 * =====================================================================
 * FILE CẤU HÌNH DUY NHẤT CHO TOÀN BỘ WEBSITE THIỆP MỜI SINH NHẬT CLB
 * =====================================================================
 * Bạn có thể dễ dàng thay đổi toàn bộ thông tin sự kiện, timeline, màu sắc,
 * hình ảnh, thông tin chuyển khoản ngân hàng tại đây.
 */

export interface MemoryImage {
  id: string;
  url: string;
  title: string;
  caption: string;
  year?: string;
}

export interface TimelineItem {
  time: string;
  title: string;
  description: string;
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
  googleSheetWebhookUrl: string;
  googleFormDirectUrl?: string;
  contactHotline: string;
  contactEmail?: string;
  facebookUrl?: string;
}

export interface EventConfig {
  club: {
    university: string;
    faculty: string;
    name: string;
    shortName: string;
    slogan?: string; // Khẩu hiệu CLB (tùy chọn, hiển thị nhỏ ở dòng riêng)
    logo: string;
    establishedYear: number;
    organizer: string;
  };
  event: {
    title: string;
    theme: string;
    editionLine1: string; // Dòng 1: VD "SINH NHẬT"
    editionLine2: string; // Dòng 2: VD "KỶ NIỆM 18 NĂM"
    dateDisplay: string;
    startTime: string; // Giờ bắt đầu chính thức để nhắc khách mời
    timeDisplay: string;
    targetDateTime: string; // Định dạng ISO: YYYY-MM-DDTHH:mm:ss+07:00
    venue: string;
    address: string;
    googleMapsUrl: string;
    timeline: TimelineItem[];
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
    audioUrl: string;
    title: string;
    artist: string;
    useWebAudioSynthesizerFallback: boolean;
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
    primaryColor: string;
    accentColor: string;
    goldColor: string;
  };
}

export const eventConfig: EventConfig = {
  club: {
    university: "TRƯỜNG ĐẠI HỌC XÂY DỰNG HÀ NỘI",
    faculty: "KHOA KINH TẾ VÀ QUẢN LÝ XÂY DỰNG",
    name: "CLB KỸ SƯ KINH TẾ",
    shortName: "CEM - EEC",
    slogan: "", // Để "" nếu muốn ẩn hoàn toàn khẩu hiệu
    logo: "./images/logo.png",
    establishedYear: 2008,
    organizer: "Ban Chủ Nhiệm CLB Kỹ Sư Kinh Tế (CEM - EEC)",
  },

  event: {
    title: "LỄ KỶ NIỆM SINH NHẬT CLB KỸ SƯ KINH TẾ",
    theme: "",
    editionLine1: "SINH NHẬT",
    editionLine2: "KỶ NIỆM 18 NĂM",
    dateDisplay: "Thứ Bảy, 12/12/2026",
    startTime: "18:00",
    timeDisplay: "18:00 – 21:30 (Đón khách từ 17:30)",
    targetDateTime: "2026-12-12T18:00:00+07:00",
    venue: "Hội trường G3 – Trường Đại học Xây dựng Hà Nội",
    address: "Số 55 Giải Phóng, Phường Đồng Tâm, Quận Hai Bà Trưng, TP. Hà Nội",
    googleMapsUrl: "https://maps.google.com/?q=Tr%C6%B0%E1%BB%9Dng+%C4%90%E1%BA%A1i+h%E1%BB%8Dc+X%C3%A2y+d%E1%BB%B1ng+H%C3%A0+N%E1%BB%99i+55+Gi%E1%BA%A3i+Ph%C3%B3ng",
    // Lịch trình dự kiến - cập nhật chi tiết theo kịch bản BTC
    timeline: [
      {
        time: "17:30 – 18:00",
        title: "Đón khách & Chụp ảnh lưu niệm",
        description: "Đón tiếp đại biểu, cựu thành viên, các CLB bạn và lưu giữ những bức ảnh kỷ niệm đầu buổi.",
      },
      {
        time: "18:00 – 18:30",
        title: "Khai mạc & Đại diện Khoa phát biểu",
        description: "Nhìn lại chặng đường 18 năm, lắng nghe lời chúc mừng từ Đại diện Khoa Kinh tế & Quản lý Xây dựng cùng Ban Chủ Nhiệm.",
      },
      {
        time: "18:30 – 19:15",
        title: "Nghi thức Sinh nhật và giao lưu các thế hệ",
        description: "Thổi nến cắt bánh mừng sinh nhật CLB, tri ân các thế hệ đi trước và chia sẻ câu chuyện gắn kết.",
      },
      {
        time: "19:15 – 21:30",
        title: "Tiết mục văn nghệ và tiệc liên hoan",
        description: "Thưởng thức các tiết mục văn nghệ đặc sắc, trò chơi giao lưu và dùng tiệc ấm cúng cùng đại gia đình CEM - EEC.",
      },
    ],
  },

  invitation: {
    badge: "THIỆP MỜI THAM DỰ",
    headline: "TRÂN TRỌNG KÍNH MỜI",
    body: "EEC trân trọng kính mời Anh/Chị/Bạn đến tham dự buổi tiệc sinh nhật của CLB Kỹ sư Kinh tế (CEM - EEC). Hãy cùng nhau nhìn lại hành trình đã qua, gặp gỡ những mối nhân duyên tuyệt vời và tạo nên những kỷ niệm thật đáng nhớ!",
    subText: "Sự hiện diện của Anh/Chị/Bạn là niềm vinh hạnh to lớn và là món quà ý nghĩa nhất đối với đại gia đình CEM - EEC.",
    signatureTitle: "Thay mặt Ban Tổ Chức",
    signatureName: "Ban Chủ Nhiệm CEM - EEC",
  },

  music: {
    audioUrl: "./music/happy-birthday.mp3",
    title: "Giai điệu Chúc mừng Sinh nhật",
    artist: "Nhạc nền CLB",
    useWebAudioSynthesizerFallback: true,
  },

  memories: [
    {
      id: "mem-1",
      url: "./images/memories/492957078_1291510556313067_4530635472757656294_n.jpg",
      title: "Khoảnh khắc đại gia đình",
      caption: "Buổi gặp gỡ ấm áp của các thế hệ thành viên CEM - EEC",
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
      title: "Hoạt động chuyên môn & Hội thảo",
      caption: "Tinh thần học hỏi, chia sẻ tri thức cùng nhau phát triển",
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
      caption: "Những hành trình dã ngoại, gắn kết thắt chặt tình đoàn kết",
      year: "Hành trình",
    },
  ],

  rsvp: {
    googleSheetWebhookUrl: "https://script.google.com/macros/s/AKfycbz5XW4Yhn_TqjnQyGX5yp1hnEGiXWbIguqjycQU39j4H1SM3H4sck9gjsaFR_zuF_pN/exec",
    googleFormDirectUrl: "",
    contactHotline: "0329169499",
    contactEmail: "clbkysukinhte@gmail.com",
    facebookUrl: "https://www.facebook.com/cem.eec?locale=vi_VN",
  },

  bank: {
    bankName: "MBBank (Ngân hàng TMCP Quân đội)",
    bankCode: "MB",
    accountName: "DO THANH PHUONG",
    accountNumber: "0329169499",
    defaultAmount: "",
    transferMessage: "CHUC MUNG SINH NHAT EEC",
    qrImage: "./qr/qr-chuyenkhoan.jpg",
    bankingAppUrl: "",
  },

  thanks: {
    headline: "TRÂN TRỌNG CẢM ƠN",
    title: "CẢM ƠN ANH/CHỊ/BẠN ĐÃ LÀ MỘT PHẦN TRONG HÀNH TRÌNH CỦA CHÚNG MÌNH!",
    message: "Cảm ơn Anh/Chị/Bạn đã luôn tin tưởng, đồng hành và là một mảnh ghép quý giá trong hành trình phát triển của CLB Kỹ sư Kinh tế (CEM - EEC).",
    subMessage: "Hy vọng chúng ta sẽ cùng nhau tạo nên thật nhiều kỷ niệm đẹp trong đêm tiệc và tiếp tục viết tiếp những chương mới rực rỡ!",
    copyrightYear: 2026,
  },

  theme: {
    primaryColor: "#88cef4",
    accentColor: "#1f6fac",
    goldColor: "#f5c542",
  },
};
