import React from 'react';

export const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Title */}
      <div className="text-center space-y-3">
        <span className="text-5xl">🌱</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#2F3A32] my-0">
          Giới thiệu Dự án
        </h1>
        <p className="text-lg text-[#A8D5BA] font-display italic font-semibold">
          “Truyện mở ra – Điều hay nở hoa”
        </p>
      </div>

      {/* Concept block */}
      <div className="bg-white border border-[#E6E4DD] rounded-3xl p-8 shadow-sm space-y-6">
        <h2 className="font-display font-bold text-2xl text-[#2F3A32] border-b border-[#E6E4DD] pb-3 m-0">
          Concept: Khu vườn truyện kể
        </h2>
        <p className="text-base text-[#6B756D] leading-relaxed">
          Chúng tôi xem mỗi câu chuyện văn học trong sách giáo khoa Tiếng Việt lớp 4 như một hạt giống tâm hồn tốt đẹp. Giáo viên tiểu học và sinh viên sư phạm là những người gieo mầm và nâng đỡ. Để hạt giống đó nảy mầm, đơm hoa kết trái trong lòng học sinh, chúng tôi cung cấp những <strong>học liệu số và mô tả hoạt động giảng dạy</strong> như những chất xúc tác khoa học, sinh động nhất.
        </p>
      </div>

      {/* Target Users */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white border border-[#E6E4DD] rounded-3xl p-6 space-y-3">
          <div className="w-12 h-12 rounded-xl bg-[#DFF3E3] flex items-center justify-center text-xl">
            👩‍🏫
          </div>
          <h3 className="font-display font-bold text-xl text-[#2F3A32]">Dành cho Giáo viên</h3>
          <p className="text-sm text-[#6B756D] leading-relaxed">
            Giúp giáo viên tiết kiệm tối đa thời gian tìm kiếm tư liệu giảng dạy. Dễ dàng khai thác nhanh video bài học giới thiệu nhân vật, podcast câu chuyện cho học sinh luyện nghe, và tải phiếu bài tập trực quan về in ấn.
          </p>
        </div>

        <div className="bg-white border border-[#E6E4DD] rounded-3xl p-6 space-y-3">
          <div className="w-12 h-12 rounded-xl bg-[#FFF6DA] flex items-center justify-center text-xl">
            🎓
          </div>
          <h3 className="font-display font-bold text-xl text-[#2F3A32]">Dành cho Sinh viên Sư phạm</h3>
          <p className="text-sm text-[#6B756D] leading-relaxed">
            Nguồn học liệu tham khảo bổ ích để làm tiểu luận, thiết kế đồ dùng dạy học hoặc soạn giáo án thực tập giảng dạy theo đúng quy chuẩn đổi mới của Bộ Giáo dục và Đào tạo.
          </p>
        </div>
      </div>

      {/* Contact Section */}
      <div className="space-y-6">
        <h2 className="font-display font-bold text-2xl text-[#2F3A32] text-center">
          Thông tin liên hệ
        </h2>

        <div className="bg-[#FFF6DA]/40 border border-[#F6B26B]/30 rounded-3xl p-8 space-y-6">
          <p className="text-sm text-[#6B756D] leading-relaxed text-center max-w-xl mx-auto">
            Mọi ý kiến đóng góp, phản hồi về học liệu hoặc mong muốn hợp tác đồng hành cùng dự án, quý thầy cô và các bạn sinh viên vui lòng liên hệ với ban quản trị qua các kênh thông tin dưới đây:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#E6E4DD]/65">
            {/* Email Card */}
            <div className="bg-white border border-[#E6E4DD] rounded-2xl p-5 flex items-center space-x-4">
              <span className="text-3xl">✉️</span>
              <div className="space-y-1">
                <span className="text-xs uppercase font-bold text-[#6B756D] tracking-wider">Hòm thư điện tử</span>
                <a
                  href="mailto:truyenmoradieuhaynohoa@gmail.com"
                  className="block text-sm font-bold text-[#2F3A32] hover:text-[#A8D5BA] transition-colors"
                >
                  truyenmoradieuhaynohoa@gmail.com
                </a>
              </div>
            </div>

            {/* Phone Card */}
            <div className="bg-white border border-[#E6E4DD] rounded-2xl p-5 flex items-center space-x-4">
              <span className="text-3xl">📞</span>
              <div className="space-y-1">
                <span className="text-xs uppercase font-bold text-[#6B756D] tracking-wider">Đường dây nóng</span>
                <a
                  href="tel:0384463512"
                  className="block text-sm font-bold text-[#2F3A32] hover:text-[#A8D5BA] transition-colors font-mono"
                >
                  0384463512
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default About;
