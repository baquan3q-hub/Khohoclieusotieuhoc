-- SQL Seed Data Setup for "Truyện mở ra – Điều hay nở hoa"
-- Hướng dẫn kết nối và chạy:
-- 1. Đăng nhập vào Supabase Console (https://supabase.com)
-- 2. Mở mục "SQL Editor" ở menu bên trái
-- 3. Tạo một query mới (New Query), dán toàn bộ mã dưới đây và bấm "Run"
-- 4. Quay lại trang quản trị Web (Dashboard) và tải lại trang, toàn bộ bài học và học liệu sẽ xuất hiện để bạn chỉnh sửa!

-- Làm sạch dữ liệu cũ để tránh lỗi trùng lặp dữ liệu (Unique Constraint)
DELETE FROM public.resources;
DELETE FROM public.lessons;


-- Chèn dữ liệu bài học (lessons)
WITH inserted_lessons AS (
  INSERT INTO public.lessons (lesson_number, slug, title, semester, description, thumbnail_url, is_published)
  VALUES
    (2, 'thi-nhac', 'Thi nhạc', 1, 'Truyện kể về cuộc thi âm nhạc của các loài vật trong khu rừng, giúp học sinh cảm thụ âm thanh cuộc sống và ý nghĩa của việc tôn trọng sự khác biệt.', null, true),
    (6, 'nghe-si-trong', 'Nghệ sĩ trống', 1, 'Câu chuyện về chú dế muốn trở thành một nghệ sĩ trống giỏi, vượt qua khó khăn để cống hiến âm nhạc cho muôn loài.', null, true),
    (8, 'do-ngang', 'Đò ngang', 1, 'Bài học ý nghĩa về lòng tốt, sự tận tụy thầm lặng của chiếc đò ngang qua sông đưa đón mọi người.', null, true),
    (10, 'tieng-noi-cua-co-cay', 'Tiếng nói của cỏ cây', 1, 'Khám phá thế giới tự nhiên xung quanh qua lăng kính tưởng tượng phong phú, thấu hiểu tiếng nói thầm thì của các loài hoa lá.', null, true),
    (12, 'nha-phat-minh-6-tuoi', 'Nhà phát minh 6 tuổi', 1, 'Truyện về sự tò mò khám phá và tinh thần khoa học của một bạn nhỏ 6 tuổi khi phát hiện ra cơ chế hoạt động thú vị.', null, true),
    (13, 'con-vet-xanh', 'Con vẹt xanh', 1, 'Câu chuyện xúc động về tình yêu thương động vật và sự thấu cảm giữa người với vật qua hình ảnh chú vẹt xanh.', null, true),
    (16, 'truoc-ngay-xa-que', 'Trước ngày xa quê', 1, 'Cảm xúc bồi hồi và những kỷ niệm thân thương của bạn nhỏ trước khi phải rời xa quê hương yêu dấu.', null, true),
    (25, 'bay-cung-uoc-mo', 'Bay cùng ước mơ', 1, 'Gợi mở ước mơ bay cao, bay xa của trẻ thơ thông qua câu chuyện đầy cảm hứng sáng tạo.', null, true),
    (30, 'canh-chim-nho', 'Cánh chim nhỏ', 1, 'Bài học ý nghĩa về sự tự do và tình yêu thương thiên nhiên hoang dã qua hình ảnh chú chim nhỏ.', null, true),
    (3, 'ong-but-da-den', 'Ông Bụt đã đến', 2, 'Một câu chuyện cảm động mang màu sắc cổ tích hiện đại về lòng nhân ái, sự sẻ chia nâng đỡ những hoàn cảnh khó khăn.', null, true),
    (15, 'nguoi-thay-dau-tien-cua-bo-toi', 'Người thầy đầu tiên của bố tôi', 2, 'Bài học sâu sắc về lòng tôn sư trọng đạo, tri ân người thầy đầu tiên qua ký ức của người cha.', null, true),
    (28, 'chuyen-du-lich-thu-vi', 'Chuyến du lịch thú vị', 2, 'Cuộc hành trình kỳ thú mở ra những kiến thức địa lý và văn hóa bổ ích, thắp sáng trí tò mò của trẻ thơ.', null, true)
  RETURNING id, slug
)
-- Chèn học liệu (resources) tương ứng dựa trên slug bài học vừa tạo
INSERT INTO public.resources (lesson_id, title, resource_group, resource_type, file_url, external_url, description, is_public)
VALUES
  ((SELECT id FROM inserted_lessons WHERE slug = 'thi-nhac'), 'Video Bài học: Kịch bản âm nhạc của rừng xanh', 'interactive_digital', 'video', null, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Video giới thiệu các nhạc cụ tự nhiên và bài hát của muôn thú trong rừng.', true),
  ((SELECT id FROM inserted_lessons WHERE slug = 'thi-nhac'), 'Phiếu học tập tương tác: Trắc nghiệm cảm thụ âm thanh', 'interactive_digital', 'interactive_worksheet', null, 'https://quizizz.com/join?gc=123456', 'Phiếu học tập tương tác thiết kế trên Quizizz giúp học sinh nhận diện giọng hát của các nhân vật.', true),
  ((SELECT id FROM inserted_lessons WHERE slug = 'thi-nhac'), 'Podcast kể chuyện: Tiếng hát của ve sầu và chim họa mi', 'reading_support', 'podcast', 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', null, 'Podcast diễn cảm câu chuyện "Thi nhạc" với giọng đọc ấm áp giúp học sinh rèn luyện kỹ năng nghe.', true),
  ((SELECT id FROM inserted_lessons WHERE slug = 'thi-nhac'), 'Phiếu bài tập trực quan: Vẽ sơ đồ dàn nhạc rừng xanh', 'reading_support', 'visual_worksheet', 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', null, 'Phiếu bài tập in ra PDF giúp học sinh nối các loài vật với nhạc cụ phù hợp.', true),
  ((SELECT id FROM inserted_lessons WHERE slug = 'thi-nhac'), 'Kịch bản đóng vai: Ngày hội hòa nhạc rừng xanh', 'teaching_model', 'drama_script', 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', null, 'Kịch bản phân vai ngắn cho 5 học sinh nhập vai các nhân vật: Vàng anh, Ve sầu, Dế mèn, Họa mi.', true),
  ((SELECT id FROM inserted_lessons WHERE slug = 'thi-nhac'), 'Giáo án mẫu thiết kế bài dạy Đọc hiểu "Thi nhạc"', 'teaching_model', 'lesson_plan', 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', null, 'Giáo án mẫu theo Công văn 2345 giúp giáo viên định hướng cách dạy bài đọc hiểu này.', true),
  
  ((SELECT id FROM inserted_lessons WHERE slug = 'nghe-si-trong'), 'Podcast: Câu chuyện về chú dế nghệ sĩ', 'reading_support', 'podcast', 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', null, 'Audio podcast truyền cảm hứng về nghệ sĩ trống của rừng xanh.', true),
  
  ((SELECT id FROM inserted_lessons WHERE slug = 'do-ngang'), 'Phiếu bài tập trực quan: Hành trình của Đò ngang', 'reading_support', 'visual_worksheet', 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', null, 'Phiếu vẽ lại hành trình sông nước của Đò ngang và các hành khách.', true),
  
  ((SELECT id FROM inserted_lessons WHERE slug = 'ong-but-da-den'), 'Video Bài học: Ông Bụt giữa đời thường', 'interactive_digital', 'video', null, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Video phân tích giá trị nhân đạo của tác phẩm.', true);
