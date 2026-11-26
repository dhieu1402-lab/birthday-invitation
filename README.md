# 🎉 WEBSITE THIỆP MỜI SINH NHẬT CLB TRỰC TUYẾN (DIGITAL BIRTHDAY INVITATION)

> **Dự án thiệp mời sinh nhật kỹ thuật số cao cấp, hiện đại, tương tác mượt mà dành cho Câu lạc bộ (CLB).**  
> Thiết kế chuẩn **Mobile-first**, tối ưu trải nghiệm trên mọi thiết bị (Điện thoại, Tablet, Máy tính) và tự động triển khai công khai qua **GitHub Pages** bằng **GitHub Actions**.

---

## ✨ Điểm Nổi Bật Của Website

1. 💌 **Màn hình mở phong bì 3D độc đáo:**  
   Khách mời chạm vào **"MỞ THIỆP MỜI"**, phong bì mở ra với hiệu ứng chuyển cảnh, pháo giấy bung nở (Confetti) và tự động phát nhạc chúc mừng sinh nhật (được tối ưu theo chính sách autoplay của trình duyệt di động).
2. 📜 **Thiệp mời trang trọng (Formal Invitation Card):**  
   Được thiết kế tinh xảo với viền kim loại vàng hoàng gia, typography phân cấp rõ ràng, tôn vinh thương hiệu và thông điệp của CLB.
3. 📍 **Thẻ thông tin sự kiện trực quan:**  
   Thời gian, ngày tổ chức, địa điểm và nút **"CHỈ ĐƯỜNG ĐẾN ĐỊA ĐIỂM"** mở trực tiếp Google Maps.
4. ⏳ **Đồng hồ đếm ngược (Countdown Timer):**  
   Chính xác theo múi giờ Việt Nam (`Asia/Ho_Chi_Minh`), tự động cập nhật từng giây và hiển thị thông báo chúc mừng khi sự kiện diễn ra.
5. 📸 **Album kỷ niệm CLB (Our Memories Gallery & Lightbox):**  
   Tích hợp sẵn bộ sưu tập ảnh hoạt động thực tế của CLB, hiệu ứng hover mượt mà và chế độ phóng to xem toàn màn hình (Next/Prev/Esc).
6. 📝 **Biểu mẫu xác nhận tham dự (RSVP Form):**  
   Kiểm tra tính hợp lệ, phản hồi tức thì, hỗ trợ kết nối Google Sheets / Apps Script để quản trị khách mời.
7. 🎁 **Khu vực gửi quà & QR chuyển khoản tinh tế (A Little Gift, A Lot of Love):**  
   Hiển thị mã QR ngân hàng MBBank ở trung tâm, nút **Sao chép số tài khoản**, **Sao chép nội dung**, **Tải ảnh QR**, cùng tính năng chuyển đổi linh hoạt giữa ảnh QR thật và chuẩn VietQR.
8. 🎶 **Bộ điều khiển âm thanh thông minh (Music Player):**  
   Nút bật/tắt nhạc nổi góc màn hình. Hỗ trợ file MP3 và có sẵn **Web Audio Synthesizer fallback** (tự động tấu giai điệu Happy Birthday dạng hộp nhạc mộc mạc kể cả khi chưa có file MP3).
9. 🚀 **Tự động hóa hoàn toàn với GitHub Actions:**  
   Mỗi khi bạn commit thay đổi, GitHub Actions sẽ tự động build và xuất bản lên GitHub Pages trong vòng 1-2 phút.

---

## 📁 Cấu Trúc Thư Mục Dự Án

```text
birthday-invitation/
│
├── public/                       # Tài nguyên tĩnh
│   ├── images/
│   │   ├── logo.png              # Logo chính thức của CLB
│   │   └── memories/             # Bộ ảnh kỷ niệm của CLB
│   ├── music/
│   │   └── happy-birthday.mp3    # File nhạc nền (tùy chọn)
│   └── qr/
│       └── qr-chuyenkhoan.jpg    # Ảnh mã QR thanh toán ngân hàng
│
├── src/
│   ├── components/               # Các linh kiện giao diện tương tác
│   │   ├── Envelope.tsx          # Phong bì thư 3D & hiệu ứng mở thiệp
│   │   ├── MusicControl.tsx      # Nút bật/tắt âm thanh nổi
│   │   ├── Countdown.tsx         # Đồng hồ đếm ngược múi giờ VN
│   │   ├── ImageGallery.tsx      # Bộ sưu tập ảnh & Lightbox xem lớn
│   │   ├── QRPayment.tsx         # Khu vực chuyển khoản & mã QR
│   │   └── QuickNav.tsx          # Thanh điều hướng nhanh & nút về đầu trang
│   │
│   ├── sections/                 # Các phần nội dung theo hành trình khách mời
│   │   ├── HeroSection.tsx       # Màn chào mừng & phong bì
│   │   ├── InvitationSection.tsx # Lời mời trang trọng
│   │   ├── EventInfoSection.tsx  # Thời gian, địa điểm, chỉ đường Maps
│   │   ├── MemoriesSection.tsx   # Khu vực Our Memories
│   │   ├── RSVPSection.tsx       # Biểu mẫu xác nhận tham gia
│   │   ├── PaymentSection.tsx    # Khu vực gửi quà mừng
│   │   └── FooterSection.tsx     # Lời cảm ơn & thông tin bản quyền
│   │
│   ├── config/
│   │   └── eventConfig.ts        # ⭐ FILE CẤU HÌNH TẬP TRUNG DUY NHẤT ⭐
│   │
│   ├── styles/
│   │   └── globals.css           # Cấu hình Tailwind CSS, Glassmorphism & Animations
│   │
│   ├── utils/
│   │   └── audioPlayer.ts        # Xử lý âm thanh HTML5 + Web Audio Synthesizer
│   │
│   ├── App.tsx                   # Luồng điều hướng chính của website
│   └── main.tsx                  # Điểm khởi chạy React 19
│
├── .github/
│   └── workflows/
│       └── deploy.yml            # Tự động deploy GitHub Pages khi push code
│
├── index.html                    # Thẻ meta SEO, Open Graph & Fonts
├── package.json                  # Cấu hình dự án và dependencies
├── vite.config.ts                # Cấu hình Vite & Base URL cho GitHub Pages
├── tsconfig.json                 # Cấu hình TypeScript
└── README.md                     # Hướng dẫn chi tiết
```

---

## ⚙️ Hướng Dẫn Tùy Chỉnh Thông Tin Sự Kiện

Toàn bộ nội dung của website được quản lý tập trung tại một file duy nhất:
👉 `src/config/eventConfig.ts`

### 1. Thay đổi thông tin CLB & Sự kiện
Mở file `src/config/eventConfig.ts` và chỉnh sửa:
```typescript
club: {
  name: "CLB KỸ SƯ KINH TẾ",
  shortName: "CEM - EEC",
  subTitle: "ECONOMICS ENGINEERING CLUB • LEARNING TOGETHER",
  logo: "./images/logo.png",
  organizer: "Ban Chủ Nhiệm CLB Kỹ Sư Kinh Tế CEM - EEC",
},

event: {
  title: "LỄ KỶ NIỆM SINH NHẬT CLB KỸ SƯ KINH TẾ",
  theme: "Dấu Ấn Tự Hào – Vững Bước Vươn Xa",
  editionLine1: "SINH NHẬT",
  editionLine2: "KỶ NIỆM 18 NĂM",
  dateDisplay: "Thứ Bảy, 12/12/2026",
  startTime: "18:00",
  timeDisplay: "18:00 - 21:30 (Đón khách từ 17:30)",
  // Thời điểm đếm ngược (định dạng ISO, múi giờ UTC+7):
  targetDateTime: "2026-12-12T18:00:00+07:00",
  venue: "Hội trường G3 - Trường Đại học Xây dựng Hà Nội (HUCE)",
  address: "Số 55 Giải Phóng, Phường Đồng Tâm, Quận Hai Bà Trưng, TP. Hà Nội",
  googleMapsUrl: "https://maps.google.com/?q=...",
}
```

### 2. Thay đổi Logo và Mã QR
- **Logo CLB**: Đặt file logo mới của bạn vào `public/images/logo.png`.
- **Ảnh QR Chuyển khoản**: Đặt file ảnh QR vào `public/qr/qr-chuyenkhoan.jpg`.
- **Thông tin tài khoản**: Cập nhật thông tin trong `eventConfig.ts`:
  ```typescript
  bank: {
    bankName: "MBBank (Ngân hàng TMCP Quân đội)",
    bankCode: "MB",
    accountName: "DO THANH PHUONG",
    accountNumber: "0329169499",
    defaultAmount: "", // Số tiền mặc định (hoặc để trống)
    transferMessage: "CHUC MUNG SINH NHAT EEC",
    qrImage: "./qr/qr-chuyenkhoan.jpg",
  }
  ```

### 3. Thêm hoặc thay ảnh kỷ niệm (Album Memories)
- Copy ảnh mới của bạn vào thư mục `public/images/memories/`.
- Trong `eventConfig.ts`, cập nhật mảng `memories`:
  ```typescript
  memories: [
    {
      id: "mem-1",
      url: "./images/memories/ten-anh-cua-ban.jpg",
      title: "Tiêu đề bức ảnh",
      caption: "Mô tả ngắn gọn về kỷ niệm",
      year: "2024",
    },
    // Thêm các ảnh khác tương tự...
  ]
  ```

### 4. Kết nối lưu phản hồi RSVP vào Google Sheets
Mặc định website hoạt động ở chế độ Demo UI và lưu trữ tạm vào `localStorage`. Để lưu dữ liệu thực tế vào Google Sheets:
1. Tạo một Google Sheet mới.
2. Mở **Tiện ích mở rộng** (Extensions) → **Apps Script**.
3. Dán đoạn mã sau vào:
   ```javascript
   function doPost(e) {
     var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
     var data = JSON.parse(e.postData.contents);
     sheet.appendRow([
       new Date(),
       data.fullName,
       data.phone,
       data.attendanceText,
       data.guestCount,
       data.message
     ]);
     return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
       .setMimeType(ContentService.MimeType.JSON);
   }
   ```
4. Chọn **Triển khai** (Deploy) → **Tùy chọn triển khai mới** (New deployment) → Loại: **Ứng dụng web** (Web app) → Ai có quyền truy cập: **Bất kỳ ai** (Anyone).
5. Sao chép URL triển khai và dán vào file `src/config/eventConfig.ts`:
   ```typescript
   rsvp: {
     googleSheetWebhookUrl: "DÁN_URL_GOOGLE_APPS_SCRIPT_VÀO_ĐÂY",
   }
   ```

---

## 🚀 Hướng Dẫn Triển Khai Lên GitHub Pages Bằng GitHub Actions

Website đã được cấu hình sẵn GitHub Actions (`.github/workflows/deploy.yml`) để triển khai hoàn toàn tự động và miễn phí.

### Bước 1: Tạo Repository trên GitHub
1. Đăng nhập vào tài khoản [GitHub](https://github.com/).
2. Nhấn nút **New repository** (Tạo kho lưu trữ mới).
3. Đặt tên repository là: `birthday-invitation`  
   *(Nếu bạn đặt tên khác, hãy mở file `vite.config.ts` và đổi `/birthday-invitation/` thành `/<tên-repo-của-bạn>/`)*.
4. Chọn chế độ **Public**, không cần tích chọn README hay .gitignore (vì dự án đã có sẵn).
5. Nhấn **Create repository**.

### Bước 2: Đẩy mã nguồn lên GitHub
Mở Terminal hoặc Command Prompt tại thư mục dự án `birthday-invitation`:
```bash
git init
git add .
git commit -m "feat: Initial birthday invitation website for CEM-EEC"
git branch -M main
git remote add origin https://github.com/USERNAME/birthday-invitation.git
git push -u origin main
```
*(Thay `USERNAME` bằng tên người dùng GitHub của bạn)*.

### Bước 3: Kích hoạt GitHub Pages qua GitHub Actions
1. Trên trang repository GitHub của bạn, nhấn vào tab **Settings** (Cài đặt).
2. Ở cột bên trái, chọn **Pages**.
3. Tại mục **Build and deployment** → **Source**, chuyển từ `Deploy from a branch` sang:  
   👉 **`GitHub Actions`**.

### Bước 4: Kiểm tra và lấy đường link công khai
1. Chuyển sang tab **Actions** trên GitHub. Bạn sẽ thấy workflow `Deploy Birthday Invitation to GitHub Pages` đang tự động chạy.
2. Sau khoảng 1-2 phút, khi workflow hoàn thành (hiện dấu tích xanh ✅), đường link thiệp mời của bạn sẽ xuất hiện:  
   🌐 **`https://USERNAME.github.io/birthday-invitation/`**
3. Mở đường link trên điện thoại hoặc gửi cho bạn bè, khách mời để cùng trải nghiệm!

---

## 💻 Chạy Thử Nghiệm Tại Máy Tính Cục Bộ (Local)

Nếu bạn muốn xem trước hoặc chỉnh sửa trên máy tính:

```bash
# 1. Di chuyển vào thư mục dự án
cd birthday-invitation

# 2. Cài đặt thư viện (nếu chưa cài)
npm install

# 3. Chạy môi trường phát triển (Dev server)
npm run dev

# 4. Kiểm tra bản build thành phẩm
npm run build
npm run preview
```

Mở trình duyệt tại địa chỉ hiển thị trên màn hình terminal (thường là `http://localhost:5173/`).

---

## 🔒 Cam Kết Về Bảo Mật & An Toàn Dữ Liệu
- Không chứa bất kỳ GitHub Token, mật khẩu hay mã bí mật nào trong mã nguồn.
- Không tự ý thực hiện giao dịch ngân hàng; khách mời luôn chủ động quét mã hoặc nhập lệnh trên ứng dụng ngân hàng của chính họ.
- Mã QR và số tài khoản sử dụng thông tin chính xác từ Ban Tổ Chức cung cấp, hoàn toàn minh bạch.
