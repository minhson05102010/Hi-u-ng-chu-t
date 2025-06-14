#LỜ MỜ SỜ CUTEEEE:333
Lần đầu làm tiện ích :33

# Mouse Follower Extension - Hướng dẫn đầy đủ

## 🚀 Giới thiệu
Mouse Follower Extension là một tiện ích Chrome cho phép bạn tải lên hình ảnh và làm cho nó theo dõi con trỏ chuột của bạn trên mọi trang web với hiệu ứng mượt mà và đẹp mắt.

## 📋 Cấu trúc thư mục
Tạo thư mục `mouse-follower-extension` và tổ chức các file như sau:

```
mouse-follower-extension/
├── manifest.json
├── popup.html
├── content.js
├── content.css
├── background.js
└── icons/
    ├── icon16.png
    ├── icon32.png
    ├── icon48.png
    └── icon128.png
```

## 🎨 Tạo icon cho tiện ích

### Cách 1: Sử dụng emoji (đơn giản)
Bạn có thể sử dụng các công cụ online để tạo icon từ emoji:
1. Truy cập https://favicon.io/emoji-favicons/
2. Chọn emoji 🖱️ hoặc 📸
3. Tải về và đổi tên thành icon16.png, icon32.png, icon48.png, icon128.png

### Cách 2: Tạo icon tùy chỉnh
Sử dụng Photoshop, GIMP hoặc Canva để tạo icon với:
- Màu nền gradient từ #667eea đến #764ba2
- Biểu tượng con trỏ chuột và ảnh
- Kích thước: 16x16, 32x32, 48x48, 128x128 pixels

## 🔧 Cài đặt tiện ích

### Bước 1: Chuẩn bị files
1. Tạo thư mục mới cho tiện ích
2. Copy tất cả các file đã tạo vào thư mục này
3. Tạo thư mục `icons` và thêm các file icon

### Bước 2: Load Extension vào Chrome
1. Mở Chrome và truy cập `chrome://extensions/`
2. Bật chế độ **Developer mode** (góc trên bên phải)
3. Click **"Load unpacked"**
4. Chọn thư mục chứa tiện ích của bạn
5. Tiện ích sẽ xuất hiện trong danh sách extensions

### Bước 3: Pin Extension
1. Click vào biểu tượng puzzle (Extensions) trên thanh toolbar
2. Tìm "Mouse Follower" và click vào biểu tượng pin
3. Icon sẽ xuất hiện trên thanh toolbar

## 🎯 Cách sử dụng

### 1. Tải ảnh lên
- Click vào icon Mouse Follower trên thanh toolbar
- Kéo thả ảnh vào khu vực upload hoặc click để chọn file
- Ảnh sẽ được hiển thị preview

### 2. Tùy chỉnh cài đặt
- **Kích thước ảnh**: Điều chỉnh từ 20px đến 200px
- **Độ mờ**: Từ 10% đến 100%
- **Tốc độ theo dõi**: Từ chậm (1) đến nhanh (10)

### 3. Kích hoạt hiệu ứng
- Click nút **"Bắt đầu"** để kích hoạt
- Di chuyển chuột để xem ảnh theo dõi
- Click **"Dừng lại"** để tắt hiệu ứng

## ⚙️ Tính năng nâng cao

### Phím tắt
- Extension có thể được bật/tắt qua context menu (click chuột phải)
- Hiệu ứng tự động tạm dừng khi chuyển tab hoặc mất focus

### Responsive Design
- Tự động điều chỉnh kích thước trên thiết bị di động
- Tôn trọng cài đặt "reduced motion" của hệ thống

### Performance
- Sử dụng `requestAnimationFrame` cho animation mượt mà
- Tự động cleanup khi không sử dụng
- Không ảnh hưởng đến tương tác với trang web

## 🛠️ Khắc phục sự cố

### Tiện ích không hoạt động
1. Kiểm tra Developer mode đã được bật chưa
2. Refresh trang web và thử lại
3. Kiểm tra Console để xem có lỗi không

### Ảnh không hiển thị
1. Đảm bảo file ảnh có định dạng đúng (JPG, PNG, GIF)
2. Kiểm tra kích thước file không quá lớn (< 5MB)
3. Thử với ảnh khác

### Hiệu ứng lag
1. Giảm kích thước ảnh
2. Tăng tốc độ theo dõi
3. Kiểm tra hiệu năng máy tính

## 📝 File cấu hình chi tiết

### manifest.json
File này mô tả tiện ích và các quyền cần thiết:
- `manifest_version: 3`: Sử dụng Manifest V3 (mới nhất)
- `permissions`: Quyền truy cập tab hiện tại và storage
- `host_permissions`: Cho phép chạy trên mọi website
- `content_scripts`: Tự động inject vào tất cả trang web

### Quyền hạn được sử dụng
- **activeTab**: Truy cập tab đang active
- **storage**: Lưu cài đặt người dùng
- **host_permissions**: Chạy trên http/https

## 🔒 Bảo mật và quyền riêng tư
- Tiện ích chỉ hoạt động locally, không gửi dữ liệu đi đâu
- Ảnh được lưu tạm thời trong memory, không lưu trữ vĩnh viễn
- Không thu thập thông tin cá nhân

## 🆕 Cập nhật tiện ích
Để cập nhật:
1. Sửa đổi các file cần thiết
2. Tăng version trong manifest.json
3. Vào `chrome://extensions/` và click biểu tượng refresh

## 💡 Ý tưởng mở rộng
- Thêm nhiều hiệu ứng animation
- Hỗ trợ nhiều ảnh cùng lúc  
- Tích hợp với API để tải ảnh online
- Thêm sound effects
- Export/Import settings

## 📞 Hỗ trợ
Nếu gặp vấn đề, hãy:
1. Kiểm tra console errors
2. Thử tải lại extension
3. Restart Chrome browser
4. Kiểm tra phiên bản Chrome (cần ít nhất Chrome 88+)

---

**Chúc bạn sử dụng vui vẻ! 🎉**
