# Bác Sĩ Cây Trồng AI - Gói Mã Nguồn Xuất File Android (.APK)

Trong gói `.zip` này đã được tích hợp sẵn:
1. **Bộ mã nguồn đầy đủ chuẩn React + Capacitor + GitHub Actions** (đã có nút **Cài đặt API Key / Webhook n8n** ngay trên góc phải màn hình).
2. **Thư mục `ban-doc-lap-1-file/index.html`**: Bản rút gọn trong 1 file HTML duy nhất nếu bạn muốn chạy trực tiếp hoặc đưa lên các trang đóng gói APK nhanh như WebIntoApp.

---

## Cách lấy file `.APK` tự động bằng GitHub Actions (Không cần cài phần mềm trên máy tính)

1. **Giải nén** file `BacSiCayTrong-Android-APK.zip` này ra một thư mục trên máy tính.
2. Đăng nhập vào [GitHub.com](https://github.com) và bấm **New Repository** để tạo một kho lưu trữ mới (ví dụ: `bac-si-cay-trong`).
3. Tại màn hình Repository mới tạo, bấm vào dòng chữ **"uploading an existing file"** (hoặc dùng Git trên máy tính).
4. **Kéo thả toàn bộ các file và thư mục đã giải nén** (bao gồm cả thư mục `.github`, `src`, `public`, `package.json`...) vào cửa sổ trình duyệt và bấm **Commit changes**.
   > **Lưu ý:** Nếu kéo thả qua giao diện web GitHub đôi khi trình duyệt ẩn thư mục có dấu chấm ở đầu như `.github`. Nếu thấy thiếu file `.github/workflows/build-apk.yml`, bạn chỉ cần bấm **Add file -> Create new file**, gõ tên `.github/workflows/build-apk.yml` và dán nội dung file đó vào.
5. Chuyển sang tab **Actions** trên GitHub, đợi khoảng **2 - 3 phút** để tiến trình **Auto Build Android APK** hiện dấu tích xanh.
6. Bấm vào tiến trình đó, kéo xuống mục **Artifacts** ở cuối trang và tải file **`BacSiCayTrong-Android-APK`** về máy, giải nén ra là có ngay file `app-debug.apk` để cài vào điện thoại Android.
