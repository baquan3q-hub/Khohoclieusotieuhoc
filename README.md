# TRUYỆN MỞ RA – ĐIỀU HAY NỞ HOA

## 1. Tổng quan dự án

**Truyện mở ra – Điều hay nở hoa** là một website kho học liệu số hỗ trợ giáo viên tiểu học và sinh viên sư phạm trong việc thiết kế, tổ chức và khai thác hoạt động dạy học đọc hiểu văn bản truyện lớp 4.

Website không được xây dựng theo mô hình LMS. Hệ thống không quản lý học sinh, không giao bài, không chấm điểm và không theo dõi tiến độ học tập. Sản phẩm tập trung vào việc lưu trữ, phân loại, trình bày và khai thác học liệu dạy học một cách trực quan, dễ dùng và phù hợp với giáo viên.

Website đóng vai trò như một thư viện học liệu và ý tưởng sư phạm, nơi giáo viên có thể tìm video, podcast, phiếu bài tập, kịch bản sân khấu hóa và giáo án mẫu để tham khảo, tải xuống hoặc sử dụng trong quá trình dạy học.

---

## 2. Định vị sản phẩm

### 2.1. Website này là gì?

Đây là:

- Kho học liệu số cho dạy học văn học lớp 4.
- Nơi gợi ý ý tưởng tổ chức hoạt động dạy học đọc hiểu.
- Nơi lưu trữ tài nguyên hỗ trợ giáo viên và sinh viên sư phạm.
- Công cụ giúp giáo viên khai thác video, podcast, phiếu bài tập, kịch bản và giáo án mẫu.

### 2.2. Website này không phải là gì?

Website này không phải là:

- LMS quản lý lớp học.
- Hệ thống học trực tuyến cho học sinh.
- Hệ thống giao bài và chấm điểm.
- Nền tảng theo dõi tiến độ học tập.
- Hệ thống quản lý dữ liệu người học.

### 2.3. Lý do không xây theo hướng LMS

Nếu đưa học sinh thành một vai trò người dùng chính, hệ thống sẽ phải xử lý nhiều nghiệp vụ phức tạp như:

- Tài khoản học sinh.
- Lớp học.
- Giáo viên quản lý học sinh.
- Giao bài.
- Nộp bài.
- Chấm điểm.
- Theo dõi mức độ tham gia.
- Dashboard tiến độ.
- Phân quyền dữ liệu người học.

Những chức năng này làm phạm vi dự án lớn, phức tạp và không phù hợp với mục tiêu ban đầu. Vì vậy, sản phẩm chỉ tập trung vào hỗ trợ giáo viên và sinh viên sư phạm khai thác học liệu.

---

## 3. Đối tượng người dùng

### 3.1. Giáo viên tiểu học

Giáo viên là đối tượng chính của website.

Giáo viên sử dụng website để:

- Tìm học liệu theo bài học trong SGK lớp 4.
- Xem video bài học.
- Nghe podcast.
- Tải phiếu bài tập trực quan.
- Mở phiếu bài tập tương tác.
- Tham khảo kịch bản sân khấu hóa.
- Tham khảo giáo án mẫu.
- Lấy ý tưởng tổ chức hoạt động dạy học đọc hiểu.

### 3.2. Sinh viên sư phạm

Sinh viên sư phạm là đối tượng tham khảo.

Sinh viên sử dụng website để:

- Học cách thiết kế học liệu dạy học.
- Tham khảo format giáo án.
- Tham khảo cách tổ chức hoạt động đọc hiểu.
- Tham khảo kịch bản sân khấu hóa.
- Quan sát cách phối hợp video, podcast và phiếu bài tập trong dạy học.

### 3.3. Admin

Admin là người quản trị nội dung website.

Admin sử dụng website để:

- Đăng nhập bằng Google.
- Thêm bài học.
- Sửa bài học.
- Xóa bài học.
- Upload học liệu.
- Gắn học liệu với bài học tương ứng.
- Quản lý trạng thái hiển thị của tài nguyên.

### 3.4. Học sinh

Học sinh không phải là một vai trò chính trong hệ thống.

Học sinh chỉ có thể tiếp cận gián tiếp thông qua học liệu mà giáo viên khai thác hoặc gửi link. Website không cần tạo tài khoản học sinh và không cần lưu dữ liệu học sinh.

---

## 4. Mục tiêu sản phẩm

### 4.1. Mục tiêu nghiệp vụ

- Xây dựng kho học liệu số cho các văn bản truyện lớp 4.
- Hỗ trợ giáo viên tiết kiệm thời gian tìm kiếm tài nguyên.
- Giúp sinh viên sư phạm có nguồn tham khảo khi thiết kế bài dạy.
- Tổ chức tài nguyên rõ ràng theo bài học và mục đích sư phạm.
- Tránh biến website thành LMS phức tạp.

### 4.2. Mục tiêu trải nghiệm người dùng

- Giao diện sáng sủa, dễ nhìn, thân thiện với giáo viên.
- Tìm tài nguyên nhanh theo bài học hoặc loại học liệu.
- Phân loại học liệu rõ ràng, không gây rối.
- Hạn chế thao tác phức tạp.
- Ưu tiên card layout, bộ lọc và trang chi tiết bài học rõ ràng.

### 4.3. Mục tiêu kỹ thuật

- Sử dụng React 19 và TypeScript để xây dựng giao diện.
- Sử dụng Supabase PostgreSQL để lưu metadata bài học và tài nguyên.
- Sử dụng Supabase Storage để lưu file học liệu.
- Sử dụng Supabase Auth với Google Login cho admin.
- Deploy bằng Vercel.
- Quản lý source code bằng GitHub.

---

## 5. Nguyên tắc tổ chức nội dung

Website lấy **bài học trong SGK** làm trung tâm.

Mỗi bài học có thể có nhiều loại học liệu khác nhau. Không bắt buộc bài nào cũng phải có đủ tất cả loại tài nguyên.

Các tài nguyên được gom theo 3 nhóm sư phạm chính:

```text
Văn học lớp 4
├── Học liệu số tương tác
│   ├── Video bài học
│   └── Phiếu bài tập tương tác
│
├── Học liệu hỗ trợ đọc hiểu
│   ├── Podcast
│   └── Phiếu bài tập trực quan
│
└── Mẫu tổ chức dạy học
    ├── Kịch bản sân khấu hóa
    └── Giáo án mẫu
```

---

## 6. Danh mục học liệu hiện có

### 6.1. Video bài học

- Số lượng: 12 video.
- Phân loại theo từng bài học trong SGK.
- Mỗi video có thể có một trang hoặc một khu vực hiển thị trong trang chi tiết bài học.
- Video thuộc nhóm **Học liệu số tương tác**.

Danh sách video:

**Học kỳ 1**

- Bài 2: Thi nhạc
- Bài 6: Nghệ sĩ trống
- Bài 8: Đò ngang
- Bài 10: Tiếng nói của cỏ cây
- Bài 12: Nhà phát minh 6 tuổi
- Bài 13: Con vẹt xanh
- Bài 16: Trước ngày xa quê
- Bài 25: Bay cùng ước mơ
- Bài 30: Cánh chim nhỏ

**Học kỳ 2**

- Bài 3: Ông Bụt đã đến
- Bài 15: Người thầy đầu tiên của bố tôi
- Bài 28: Chuyến du lịch thú vị

### 6.2. Phiếu bài tập tương tác

- Số lượng: 12 phiếu.
- Có thể được triển khai dưới dạng link ngoài như Quizizz hoặc nền tảng tương tác khác.
- Không gọi category là Quizizz, vì Quizizz chỉ là nền tảng triển khai.
- Thuộc nhóm **Học liệu số tương tác**.

### 6.3. Podcast

- Số lượng: 18 podcast.
- Là học liệu âm thanh để nghe kể chuyện, nghe đọc nội dung, nghe gợi mở hoặc cảm thụ văn bản.
- Thuộc nhóm **Học liệu hỗ trợ đọc hiểu**.

### 6.4. Phiếu bài tập trực quan

- Số lượng: 18 phiếu.
- Định dạng: Word, PDF hoặc hình ảnh.
- Giáo viên có thể tải về, in ra hoặc sử dụng trong hoạt động trên lớp.
- Thuộc nhóm **Học liệu hỗ trợ đọc hiểu**.

### 6.5. Kịch bản sân khấu hóa

- Số lượng: 24 bản.
- Định dạng: Word hoặc PDF.
- Hỗ trợ giáo viên tổ chức hoạt động nhập vai, diễn kịch, đọc phân vai.
- Thuộc nhóm **Mẫu tổ chức dạy học**.

### 6.6. Giáo án mẫu

- Số lượng: 2 giáo án mẫu.
- Định dạng: Word hoặc PDF.
- Dành cho giáo viên và sinh viên sư phạm tham khảo cách thiết kế tiết dạy.
- Thuộc nhóm **Mẫu tổ chức dạy học**.

---

## 7. Cấu trúc trang chính

### 7.1. Trang chủ

Mục tiêu:

- Giới thiệu dự án.
- Nêu rõ định vị là kho học liệu và ý tưởng dạy học.
- Dẫn người dùng vào các khu vực chính.

Thành phần:

- Hero section với slogan: “Truyện mở ra – Điều hay nở hoa”.
- Mô tả ngắn về website.
- 3 card nhóm học liệu:
  - Học liệu số tương tác.
  - Học liệu hỗ trợ đọc hiểu.
  - Mẫu tổ chức dạy học.
- Nút “Khám phá học liệu”.
- Một số bài học nổi bật.

### 7.2. Trang Văn học lớp 4

Mục tiêu:

- Hiển thị danh sách bài học trong SGK.
- Cho phép lọc theo học kỳ và nhóm học liệu.

Bộ lọc:

- Tất cả.
- Học kỳ 1.
- Học kỳ 2.
- Có video bài học.
- Có phiếu bài tập tương tác.
- Có podcast.
- Có phiếu bài tập trực quan.
- Có kịch bản sân khấu hóa.
- Có giáo án mẫu.

Card bài học gồm:

- Tên bài học.
- Số bài.
- Học kỳ.
- Ảnh đại diện.
- Các nhãn tài nguyên có sẵn.
- Nút “Xem học liệu”.

### 7.3. Trang chi tiết bài học

Mục tiêu:

- Hiển thị toàn bộ tài nguyên liên quan đến một bài học.
- Giúp giáo viên khai thác nhanh tài nguyên theo mục đích sư phạm.

Cấu trúc:

```text
Tên bài học
Mô tả ngắn
Học kỳ

[Học liệu số tương tác]
- Video bài học
- Phiếu bài tập tương tác

[Học liệu hỗ trợ đọc hiểu]
- Podcast
- Phiếu bài tập trực quan

[Mẫu tổ chức dạy học]
- Kịch bản sân khấu hóa
- Giáo án mẫu
```

Nút hành động:

- Xem video.
- Nghe podcast.
- Mở phiếu bài tập tương tác.
- Tải phiếu bài tập trực quan.
- Tải kịch bản sân khấu hóa.
- Tải giáo án mẫu.

### 7.4. Trang Kho tài nguyên

Mục tiêu:

- Cho phép tìm tài nguyên theo loại thay vì theo bài học.

Tab chính:

- Tất cả.
- Học liệu số tương tác.
- Học liệu hỗ trợ đọc hiểu.
- Mẫu tổ chức dạy học.

Bộ lọc phụ:

- Video bài học.
- Phiếu bài tập tương tác.
- Podcast.
- Phiếu bài tập trực quan.
- Kịch bản sân khấu hóa.
- Giáo án mẫu.

### 7.5. Trang Giới thiệu

Nội dung:

- Lý do xây dựng dự án.
- Đối tượng sử dụng.
- Tinh thần giáo dục của dự án.
- Cách website hỗ trợ giáo viên và sinh viên sư phạm.

### 7.6. Trang Đăng nhập Admin

Mục tiêu:

- Cho phép admin đăng nhập bằng Google.
- Chỉ admin mới được vào dashboard quản trị.

### 7.7. Admin Dashboard

Chức năng:

- Quản lý bài học.
- Quản lý tài nguyên.
- Upload file.
- Thêm link ngoài.
- Sửa/xóa tài nguyên.
- Bật/tắt trạng thái hiển thị.

---

## 8. Công nghệ sử dụng

### 8.1. Design

- Figma.

### 8.2. Frontend

- React 19.
- TypeScript.
- Tailwind CSS.
- React Router hoặc framework tương đương nếu dùng Vite.
- Có thể dùng Next.js nếu muốn routing và deploy tối ưu hơn.

### 8.3. Backend as a Service

- Supabase.

### 8.4. Database

- Supabase PostgreSQL.

### 8.5. Authentication

- Supabase Auth.
- Google Login cho admin.

### 8.6. Storage

- Supabase Storage để lưu:
  - file Word.
  - file PDF.
  - hình ảnh.
  - audio podcast.
  - thumbnail.

### 8.7. Deployment

- GitHub để quản lý source code.
- Vercel để deploy.

---

## 9. Định hướng database

### 9.1. Bảng `lessons`

Lưu thông tin bài học.

```sql
id uuid primary key
lesson_number integer
slug text unique
title text
semester integer
description text
thumbnail_url text
is_published boolean default true
created_at timestamp
updated_at timestamp
```

### 9.2. Bảng `resources`

Lưu tất cả tài nguyên.

```sql
id uuid primary key
lesson_id uuid references lessons(id)
title text
resource_group text
resource_type text
file_url text
external_url text
description text
is_public boolean default true
created_at timestamp
updated_at timestamp
```

### 9.3. Giá trị `resource_group`

```text
interactive_digital = Học liệu số tương tác
reading_support = Học liệu hỗ trợ đọc hiểu
teaching_model = Mẫu tổ chức dạy học
```

### 9.4. Giá trị `resource_type`

```text
video = Video bài học
interactive_worksheet = Phiếu bài tập tương tác
podcast = Podcast
visual_worksheet = Phiếu bài tập trực quan
drama_script = Kịch bản sân khấu hóa
lesson_plan = Giáo án mẫu
```

### 9.5. Bảng `profiles`

Lưu thông tin admin.

```sql
id uuid primary key
email text unique
full_name text
avatar_url text
role text
created_at timestamp
updated_at timestamp
```

Role ban đầu:

```text
admin
```

Không cần tạo role học sinh.
Không cần tạo role giáo viên nếu chưa cần phân quyền tải xuống.

---

## 10. Quy tắc phân quyền

### Guest

Guest có thể:

- Xem trang chủ.
- Xem danh sách bài học.
- Xem chi tiết bài học.
- Xem tài nguyên công khai.

Guest không thể:

- Vào admin dashboard.
- Upload tài nguyên.
- Sửa/xóa dữ liệu.

### Admin

Admin có thể:

- Đăng nhập bằng Google.
- Vào dashboard.
- Thêm/sửa/xóa bài học.
- Thêm/sửa/xóa tài nguyên.
- Upload file.
- Quản lý trạng thái hiển thị.

---

## 11. Luồng người dùng

### 11.1. Luồng giáo viên tìm học liệu theo bài học

```text
Giáo viên vào website
→ Chọn Văn học lớp 4
→ Lọc theo học kỳ
→ Chọn bài học
→ Xem các nhóm tài nguyên
→ Khai thác video, podcast, phiếu bài tập, kịch bản hoặc giáo án
```

### 11.2. Luồng giáo viên tìm tài nguyên theo loại

```text
Giáo viên vào Kho tài nguyên
→ Chọn nhóm tài nguyên
→ Chọn loại tài nguyên
→ Mở hoặc tải tài nguyên cần dùng
```

### 11.3. Luồng sinh viên sư phạm tham khảo mẫu dạy học

```text
Sinh viên vào website
→ Chọn Mẫu tổ chức dạy học
→ Xem kịch bản sân khấu hóa hoặc giáo án mẫu
→ Đối chiếu với học liệu của bài học tương ứng
```

### 11.4. Luồng admin thêm tài nguyên

```text
Admin đăng nhập Google
→ Vào Dashboard
→ Chọn Thêm tài nguyên
→ Chọn bài học liên kết
→ Chọn nhóm tài nguyên
→ Chọn loại tài nguyên
→ Upload file hoặc nhập link ngoài
→ Lưu
→ Tài nguyên hiển thị trên trang bài học
```

---

## 12. MVP cần hoàn thành

### Bắt buộc

- Trang chủ.
- Trang Văn học lớp 4.
- Trang chi tiết bài học.
- Trang Kho tài nguyên.
- Trang Giới thiệu.
- Đăng nhập Google cho admin.
- Admin dashboard đơn giản.
- CRUD bài học.
- CRUD tài nguyên.
- Upload file lên Supabase Storage.
- Lọc tài nguyên theo học kỳ, nhóm và loại.

### Không làm trong MVP

- Tài khoản học sinh.
- Quản lý lớp học.
- Giao bài.
- Chấm điểm.
- Theo dõi tiến độ học tập.
- Dashboard học sinh.
- Dashboard giáo viên theo lớp.
- Bình luận.
- Chat.
- AI gợi ý nội dung.

---

## 13. Tiêu chí hoàn thành

Website được coi là hoàn thành MVP nếu:

- Người dùng có thể xem danh sách bài học.
- Người dùng có thể vào chi tiết từng bài học.
- Tài nguyên được phân nhóm đúng.
- Admin có thể thêm/sửa/xóa tài nguyên.
- File có thể được upload và hiển thị/tải xuống.
- Giao diện sáng sủa, dễ nhìn, phù hợp giáo viên tiểu học.
- Website deploy được lên Vercel.

---

## 14. Nguyên tắc quan trọng cho AI khi triển khai

- Không biến dự án thành LMS.
- Không tạo role học sinh.
- Không xây chức năng giao bài, chấm điểm, quản lý lớp.
- Lấy bài học SGK làm trung tâm.
- Tài nguyên được gom theo nhóm sư phạm.
- Ưu tiên code đơn giản, rõ ràng, dễ bảo trì.
- Ưu tiên UI sáng, sạch, thân thiện với giáo viên.
- Không thiết kế quá trẻ con vì người dùng chính là giáo viên và sinh viên sư phạm.
