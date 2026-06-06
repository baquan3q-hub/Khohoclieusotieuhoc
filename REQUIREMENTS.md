# REQUIREMENTS.md

# Yêu cầu chức năng và phi chức năng

## 1. Mục tiêu tài liệu

Tài liệu này mô tả chi tiết các yêu cầu nghiệp vụ, yêu cầu chức năng, yêu cầu dữ liệu, yêu cầu phân quyền và phạm vi MVP cho website **Truyện mở ra – Điều hay nở hoa**.

Website là kho học liệu số hỗ trợ giáo viên tiểu học và sinh viên sư phạm khai thác tài nguyên dạy học đọc hiểu văn bản truyện lớp 4.

---

## 2. Phạm vi hệ thống

### 2.1. Trong phạm vi

Hệ thống cần hỗ trợ:

- Hiển thị danh sách bài học văn học lớp 4.
- Hiển thị chi tiết từng bài học.
- Phân loại học liệu theo nhóm sư phạm.
- Hiển thị video bài học.
- Hiển thị hoặc mở phiếu bài tập tương tác.
- Phát podcast hoặc hiển thị audio.
- Cho phép tải phiếu bài tập trực quan.
- Cho phép tải kịch bản sân khấu hóa.
- Cho phép tải giáo án mẫu.
- Admin đăng nhập Google.
- Admin quản lý bài học.
- Admin quản lý tài nguyên.
- Admin upload file.
- Deploy website public.

### 2.2. Ngoài phạm vi

Hệ thống không làm:

- Tài khoản học sinh.
- Tài khoản giáo viên phức tạp.
- Quản lý lớp học.
- Giao bài.
- Nộp bài.
- Chấm điểm.
- Theo dõi tiến độ học tập.
- Dashboard phân tích học sinh.
- Chat giữa giáo viên và học sinh.
- Bình luận.
- Thanh toán.

---

## 3. Vai trò người dùng

## 3.1. Guest

Guest là người dùng không đăng nhập.

Guest có thể:

- Xem trang chủ.
- Xem danh sách bài học.
- Xem trang chi tiết bài học.
- Xem tài nguyên công khai.
- Mở link tài nguyên ngoài nếu tài nguyên được công khai.

Guest không thể:

- Truy cập admin dashboard.
- Thêm/sửa/xóa bài học.
- Upload tài nguyên.

## 3.2. Admin

Admin là người quản trị nội dung.

Admin có thể:

- Đăng nhập bằng Google.
- Truy cập dashboard.
- Thêm bài học.
- Sửa bài học.
- Xóa bài học.
- Thêm tài nguyên.
- Sửa tài nguyên.
- Xóa tài nguyên.
- Upload file.
- Quản lý trạng thái hiển thị của bài học và tài nguyên.

---

## 4. Nhóm tài nguyên

Hệ thống có 3 nhóm tài nguyên chính.

## 4.1. Học liệu số tương tác

Mục đích:

- Hỗ trợ giáo viên triển khai hoạt động học tập dạng số.
- Có thể dùng để gợi mở, minh họa hoặc củng cố nội dung bài học.

Bao gồm:

- Video bài học.
- Phiếu bài tập tương tác.

## 4.2. Học liệu hỗ trợ đọc hiểu

Mục đích:

- Hỗ trợ quá trình đọc hiểu, nghe hiểu, cảm thụ truyện.
- Dùng để tổ chức hoạt động trên lớp hoặc giao tài liệu tham khảo.

Bao gồm:

- Podcast.
- Phiếu bài tập trực quan.

## 4.3. Mẫu tổ chức dạy học

Mục đích:

- Hỗ trợ giáo viên và sinh viên sư phạm thiết kế hoạt động dạy học.
- Cung cấp ý tưởng triển khai tiết dạy.

Bao gồm:

- Kịch bản sân khấu hóa.
- Giáo án mẫu.

---

## 5. Yêu cầu chức năng

## FR-01: Xem trang chủ

Người dùng có thể truy cập trang chủ để hiểu mục đích website.

Trang chủ cần có:

- Tên dự án.
- Slogan.
- Mô tả ngắn.
- Các nhóm học liệu chính.
- Nút điều hướng đến danh sách bài học.

Mức ưu tiên: Bắt buộc.

---

## FR-02: Xem danh sách bài học

Người dùng có thể xem danh sách bài học văn học lớp 4.

Mỗi bài học cần hiển thị:

- Tên bài.
- Số bài.
- Học kỳ.
- Thumbnail.
- Các nhãn tài nguyên có sẵn.
- Nút xem chi tiết.

Mức ưu tiên: Bắt buộc.

---

## FR-03: Lọc bài học

Người dùng có thể lọc bài học theo:

- Học kỳ 1.
- Học kỳ 2.
- Có video bài học.
- Có phiếu bài tập tương tác.
- Có podcast.
- Có phiếu bài tập trực quan.
- Có kịch bản sân khấu hóa.
- Có giáo án mẫu.

Mức ưu tiên: Bắt buộc.

---

## FR-04: Xem chi tiết bài học

Người dùng có thể mở trang chi tiết của một bài học.

Trang chi tiết cần hiển thị:

- Tên bài học.
- Học kỳ.
- Mô tả ngắn.
- Học liệu số tương tác.
- Học liệu hỗ trợ đọc hiểu.
- Mẫu tổ chức dạy học.

Mức ưu tiên: Bắt buộc.

---

## FR-05: Xem video bài học

Nếu bài học có video, người dùng có thể xem video.

Video có thể là:

- Link YouTube.
- Link ngoài.
- File video được lưu trữ.

Mức ưu tiên: Bắt buộc.

---

## FR-06: Mở phiếu bài tập tương tác

Nếu bài học có phiếu bài tập tương tác, người dùng có thể mở link tương tác.

Link có thể là:

- Quizizz.
- Google Form.
- Link nền tảng tương tác khác.

Tên hiển thị trên hệ thống phải là **Phiếu bài tập tương tác**, không gọi category là Quizizz.

Mức ưu tiên: Bắt buộc.

---

## FR-07: Nghe podcast

Nếu bài học có podcast, người dùng có thể nghe trực tiếp hoặc mở file audio.

Podcast có thể là:

- File audio trong Supabase Storage.
- Link audio ngoài.

Mức ưu tiên: Bắt buộc.

---

## FR-08: Tải phiếu bài tập trực quan

Nếu bài học có phiếu bài tập trực quan, người dùng có thể tải xuống.

Định dạng hỗ trợ:

- PDF.
- DOCX.
- PNG/JPG.

Mức ưu tiên: Bắt buộc.

---

## FR-09: Tải kịch bản sân khấu hóa

Nếu bài học có kịch bản sân khấu hóa, người dùng có thể tải xuống.

Định dạng hỗ trợ:

- PDF.
- DOCX.

Mức ưu tiên: Bắt buộc.

---

## FR-10: Tải giáo án mẫu

Nếu bài học có giáo án mẫu, người dùng có thể tải xuống.

Định dạng hỗ trợ:

- PDF.
- DOCX.

Mức ưu tiên: Bắt buộc.

---

## FR-11: Xem kho tài nguyên

Người dùng có thể xem toàn bộ tài nguyên theo dạng thư viện.

Bộ lọc gồm:

- Tất cả.
- Học liệu số tương tác.
- Học liệu hỗ trợ đọc hiểu.
- Mẫu tổ chức dạy học.
- Video bài học.
- Phiếu bài tập tương tác.
- Podcast.
- Phiếu bài tập trực quan.
- Kịch bản sân khấu hóa.
- Giáo án mẫu.

Mức ưu tiên: Bắt buộc.

---

## FR-12: Đăng nhập admin bằng Google

Admin có thể đăng nhập bằng Google thông qua Supabase Auth.

Yêu cầu:

- Chỉ email admin được phép truy cập dashboard.
- Người không thuộc danh sách admin sẽ không vào được khu vực quản trị.

Mức ưu tiên: Bắt buộc.

---

## FR-13: Admin quản lý bài học

Admin có thể:

- Tạo bài học mới.
- Sửa bài học.
- Xóa bài học.
- Bật/tắt trạng thái hiển thị.

Trường dữ liệu bài học:

- Tên bài.
- Số bài.
- Slug.
- Học kỳ.
- Mô tả ngắn.
- Thumbnail.
- Trạng thái hiển thị.

Mức ưu tiên: Bắt buộc.

---

## FR-14: Admin quản lý tài nguyên

Admin có thể:

- Tạo tài nguyên mới.
- Sửa tài nguyên.
- Xóa tài nguyên.
- Gắn tài nguyên với bài học.
- Chọn nhóm tài nguyên.
- Chọn loại tài nguyên.
- Upload file hoặc nhập link ngoài.

Mức ưu tiên: Bắt buộc.

---

## FR-15: Upload file

Admin có thể upload file lên Supabase Storage.

File hỗ trợ:

- PDF.
- DOCX.
- PNG.
- JPG.
- MP3.
- MP4 nếu cần.

Mức ưu tiên: Bắt buộc.

---

## FR-16: Responsive design

Website phải hoạt động tốt trên:

- Desktop.
- Tablet.
- Mobile.

Mức ưu tiên: Bắt buộc.

---

# 6. Yêu cầu dữ liệu

## 6.1. Lesson

Một bài học cần có:

- id.
- lesson_number.
- slug.
- title.
- semester.
- description.
- thumbnail_url.
- is_published.
- created_at.
- updated_at.

## 6.2. Resource

Một tài nguyên cần có:

- id.
- lesson_id.
- title.
- resource_group.
- resource_type.
- file_url.
- external_url.
- description.
- is_public.
- created_at.
- updated_at.

## 6.3. Profile

Một profile admin cần có:

- id.
- email.
- full_name.
- avatar_url.
- role.
- created_at.
- updated_at.

---

# 7. Yêu cầu phi chức năng

## NFR-01: Dễ sử dụng

Giao diện phải rõ ràng, ít thao tác, phù hợp với giáo viên tiểu học.

## NFR-02: Hiệu năng

Trang danh sách và trang chi tiết phải tải nhanh.

## NFR-03: Bảo trì dễ

Code cần rõ ràng, chia component hợp lý.

## NFR-04: Mở rộng được

Có thể thêm loại tài nguyên mới trong tương lai mà không phải sửa toàn bộ cấu trúc.

## NFR-05: Bảo mật

Admin dashboard chỉ cho phép admin truy cập.

## NFR-06: Responsive

Website cần hiển thị tốt trên desktop, tablet, mobile.

---

# 8. Acceptance Criteria

## Trang chủ

- Có hero section.
- Có mô tả dự án.
- Có 3 nhóm tài nguyên.
- Có CTA đến danh sách bài học.

## Trang Văn học lớp 4

- Hiển thị danh sách bài học.
- Có filter học kỳ.
- Có filter theo loại tài nguyên.
- Card bài học rõ ràng.

## Trang chi tiết bài học

- Hiển thị đúng tài nguyên theo bài học.
- Chia tài nguyên theo 3 nhóm.
- Tài nguyên không có thì không hiển thị block rỗng.

## Admin dashboard

- Admin đăng nhập được bằng Google.
- Admin tạo được bài học.
- Admin tạo được tài nguyên.
- Admin upload được file.
- Tài nguyên sau khi tạo hiển thị ở frontend.

---

# 9. Dữ liệu mẫu nên seed ban đầu

Seed ít nhất 12 bài có video:

- Bài 2: Thi nhạc.
- Bài 6: Nghệ sĩ trống.
- Bài 8: Đò ngang.
- Bài 10: Tiếng nói của cỏ cây.
- Bài 12: Nhà phát minh 6 tuổi.
- Bài 13: Con vẹt xanh.
- Bài 16: Trước ngày xa quê.
- Bài 25: Bay cùng ước mơ.
- Bài 30: Cánh chim nhỏ.
- Bài 3: Ông Bụt đã đến.
- Bài 15: Người thầy đầu tiên của bố tôi.
- Bài 28: Chuyến du lịch thú vị.

---

# 10. Ràng buộc triển khai

- Không xây LMS.
- Không tạo học sinh là user role.
- Không tạo nghiệp vụ giao bài/chấm điểm.
- Tập trung vào kho học liệu và mẫu dạy học.
- Ưu tiên MVP đơn giản, chạy được, dễ demo.
