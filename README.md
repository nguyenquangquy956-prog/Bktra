# Quản lý sự kiện câu lạc bộ

Ứng dụng web quản lý sự kiện của câu lạc bộ, làm bằng React và TypeScript. Hỗ trợ đủ bốn thao tác: xem, thêm, sửa, xóa. Dữ liệu được lưu qua json-server trong file `server/db.json`.

## Công nghệ

- Vite, React, TypeScript
- Tailwind CSS
- React Router
- axios (một instance dùng chung, cấu hình `baseURL`)
- json-server (API giả lập)

## Cài đặt

Yêu cầu: Node.js 18 trở lên.

```bash
git clone [đường dẫn repo]
cd su-kien-clb
npm install
```

## Chạy dự án

Cần chạy hai lệnh ở hai terminal khác nhau.

Terminal 1, chạy API:

```bash
npm run api
```

API chạy ở `http://localhost:3001`.

Terminal 2, chạy giao diện:

```bash
npm run dev
```

Mở `http://localhost:5173/su-kien` trên trình duyệt.

Để kiểm tra bản build:

```bash
npm run build
npm run preview
```

## Chức năng

- **Danh sách:** chia hai nhóm "Sắp diễn ra" và "Đã diễn ra" theo ngày so với hôm nay.
- **Chi tiết:** xem đầy đủ thông tin, đi đến trang sửa hoặc xóa.
- **Thêm mới:** form có kiểm tra lỗi khi rời từng ô.
- **Chỉnh sửa:** form điền sẵn dữ liệu của bản ghi.
- **Xóa:** có hộp xác nhận, sau khi xóa có thông báo.
- **Trạng thái giao diện:** đang tải, lỗi kết nối, danh sách trống, nút khóa khi đang gửi.

## Quy tắc nhập liệu

| Trường | Luật |
| --- | --- |
| Tên sự kiện | Bắt buộc, 5 đến 100 ký tự |
| Ngày tổ chức | Bắt buộc; khi thêm mới không được là ngày quá khứ |
| Giờ kết thúc | Phải sau giờ bắt đầu |
| Địa điểm | Bắt buộc khi Trực tiếp |
| Đường dẫn tham gia | Bắt buộc và phải bắt đầu bằng `http://` hoặc `https://` khi Trực tuyến |
| Số chỗ tối đa | Số nguyên từ 1 đến 500 |

## Cấu trúc thư mục

```
server/          db.json (dữ liệu json-server)
src/
  components/    TextField, EventForm, EventCard, ConfirmDialog, Toast, StatusMessage
  layouts/       MainLayout (header, footer, menu)
  pages/         Danh sách, chi tiết, thêm mới, chỉnh sửa, 404
  services/      http.ts (axios instance), eventService.ts (mọi lời gọi API)
  types/         event.ts (kiểu sự kiện), form.ts (kiểu form và lỗi)
  utils/         validateEvent, date, errorMessage, eventForm, eventPayload, eventGroup
```

## Ghi chú về định danh

Mỗi bản ghi có trường `id` kiểu chuỗi do json-server cấp. Đề ví dụ đường dẫn `/su-kien/3`, nhưng dự án dùng id chuỗi để tránh xung đột khi dữ liệu có cả bản ghi được tạo từ form lẫn bản ghi soạn sẵn. Chi tiết xem `AI_LOG.md`.

## Ảnh chụp màn hình

- Trang danh sách: 
- Form có lỗi validate:
- Giao diện trên điện thoại: 

## Video giới thiệu
