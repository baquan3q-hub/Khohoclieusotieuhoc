import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { dbService } from '../services/db';
import type { Lesson } from '../types';
import { LessonCard } from '../components/LessonCard';
import { Sprout, Star } from 'lucide-react';

export const Home: React.FC = () => {
  const [featuredLessons, setFeaturedLessons] = useState<Lesson[]>([]);
  const [resourcesMap, setResourcesMap] = useState<Record<string, any[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const lessonsData = await dbService.getLessons();
        // Take 3 featured lessons (e.g. Thi nhạc, Nghệ sĩ trống, Ông Bụt đã đến)
        const featured = lessonsData.filter(l => 
          l.slug === 'thi-nhac' || l.slug === 'nghe-si-trong' || l.slug === 'ong-but-da-den'
        ).slice(0, 3);
        
        // If not found, just take first 3
        if (featured.length === 0) {
          setFeaturedLessons(lessonsData.slice(0, 3));
        } else {
          setFeaturedLessons(featured);
        }

        // Fetch resources for these lessons to show correct badges
        const map: Record<string, any[]> = {};
        for (const l of lessonsData) {
          const res = await dbService.getResources(l.id);
          map[l.id] = res.map(r => r.resource_type);
        }
        setResourcesMap(map);
      } catch (err) {
        console.error('Error loading home page data:', err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#DFF3E3]/60 via-[#FCFBF7] to-[#FCFBF7] pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 bg-[#DFF3E3] border border-[#A8D5BA] px-4 py-1.5 rounded-full text-[#2F3A32] text-sm font-semibold animate-float">
                <Sprout size={16} className="text-emerald-600" />
                <span>Khu vườn Văn học Số lớp 4</span>
              </div>
              
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#2F3A32] leading-tight">
                <span>Truyện mở ra</span>
                <span className="text-[#F6B26B] block mt-1 sm:mt-2">Điều hay nở hoa</span>
              </h1>
              
              <p className="text-lg text-[#6B756D] leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Kho học liệu số sinh động hỗ trợ Giáo viên tiểu học và Sinh viên sư phạm thiết kế, tổ chức hiệu quả hoạt động dạy học đọc hiểu văn bản truyện Tiếng Việt lớp 4.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  to="/van-hoc-lop-4"
                  className="w-full sm:w-auto px-8 py-4 text-center font-bold text-lg rounded-full bg-[#A8D5BA] text-[#2F3A32] hover:bg-[#8ec3a2] shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  Khám phá học liệu
                </Link>
                <Link
                  to="/gioi-thieu"
                  className="w-full sm:w-auto px-8 py-4 text-center font-bold text-lg rounded-full bg-white text-[#2F3A32] hover:bg-[#DFF3E3] border border-[#E6E4DD] transition-all duration-300"
                >
                  Tìm hiểu dự án
                </Link>
              </div>
            </div>

            {/* Right Hero Image */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-72 h-72 sm:w-96 sm:h-96">
                {/* Decorative backgrounds */}
                <div className="absolute inset-0 bg-[#FFF6DA] rounded-full blur-3xl opacity-60"></div>
                <div className="absolute top-10 left-10 w-72 h-72 bg-[#DFF3E3] rounded-full blur-2xl opacity-75"></div>
                
                {/* Sprout Icon Graphic */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white p-10 rounded-full shadow-2xl border-4 border-[#DFF3E3] flex flex-col items-center justify-center animate-pulse duration-4000">
                    <span className="text-8xl sm:text-9xl filter drop-shadow">📖</span>
                    <span className="text-6xl absolute bottom-6 right-6">🌸</span>
                    <span className="text-4xl absolute top-6 left-6 animate-bounce">🌱</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Core Resource Groups */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2F3A32]">
            Hệ sinh thái Học liệu số
          </h2>
          <p className="text-base text-[#6B756D] max-w-2xl mx-auto">
            Học liệu được phân nhóm khoa học theo từng mục đích sư phạm, hỗ trợ giáo viên tối ưu bài dạy đọc hiểu trên lớp.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white border border-[#E6E4DD] rounded-3xl p-8 hover:shadow-xl transition-all duration-300 flex flex-col space-y-4 hover:-translate-y-1">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center">
              <span className="text-3xl">💻</span>
            </div>
            <h3 className="font-display font-bold text-2xl text-[#2F3A32]">Học liệu số tương tác</h3>
            <p className="text-sm text-[#6B756D] leading-relaxed flex-1">
              Bao gồm <strong>Video bài học</strong> sinh động dẫn dắt cốt truyện và các <strong>Phiếu bài tập tương tác</strong> (Quizizz, Form) để củng cố kiến thức đọc hiểu trực quan của học sinh.
            </p>
            <Link to="/kho-tai-nguyen?group=interactive_digital" className="text-blue-600 hover:text-blue-700 font-bold text-sm inline-flex items-center space-x-1">
              <span>Xem tài nguyên</span>
              <span>→</span>
            </Link>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-[#E6E4DD] rounded-3xl p-8 hover:shadow-xl transition-all duration-300 flex flex-col space-y-4 hover:-translate-y-1">
            <div className="w-14 h-14 rounded-2xl bg-pink-50 border border-pink-100 flex items-center justify-center">
              <span className="text-3xl">🎧</span>
            </div>
            <h3 className="font-display font-bold text-2xl text-[#2F3A32]">Học liệu hỗ trợ đọc hiểu</h3>
            <p className="text-sm text-[#6B756D] leading-relaxed flex-1">
              Bao gồm các <strong>Podcast kể chuyện</strong> hỗ trợ luyện nghe, cảm nhận giọng điệu và <strong>Phiếu bài tập trực quan</strong> (PDF/Word) được thiết kế đẹp mắt để in làm bài tại lớp.
            </p>
            <Link to="/kho-tai-nguyen?group=reading_support" className="text-pink-600 hover:text-pink-700 font-bold text-sm inline-flex items-center space-x-1">
              <span>Xem tài nguyên</span>
              <span>→</span>
            </Link>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-[#E6E4DD] rounded-3xl p-8 hover:shadow-xl transition-all duration-300 flex flex-col space-y-4 hover:-translate-y-1">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center">
              <span className="text-3xl">📋</span>
            </div>
            <h3 className="font-display font-bold text-2xl text-[#2F3A32]">Mẫu tổ chức dạy học</h3>
            <p className="text-sm text-[#6B756D] leading-relaxed flex-1">
              Ý tưởng phát triển tiết học qua <strong>Kịch bản sân khấu hóa</strong> (nhập vai diễn kịch) và các mẫu <strong>Giáo án tham khảo</strong> chuẩn sư phạm, đặc biệt hữu ích cho sinh viên.
            </p>
            <Link to="/kho-tai-nguyen?group=teaching_model" className="text-amber-600 hover:text-amber-700 font-bold text-sm inline-flex items-center space-x-1">
              <span>Xem tài nguyên</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Lessons */}
      <section className="bg-[#FFF6DA]/40 py-16 border-y border-[#E6E4DD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="space-y-2 text-center sm:text-left">
              <h2 className="text-3xl font-extrabold text-[#2F3A32] flex items-center justify-center sm:justify-start space-x-2">
                <Star className="text-[#F6B26B] fill-[#F6B26B]" size={28} />
                <span>Bài học nổi bật</span>
              </h2>
              <p className="text-base text-[#6B756D]">
                Các văn bản truyện cốt lõi trong sách giáo khoa Tiếng Việt lớp 4.
              </p>
            </div>
            <Link
              to="/van-hoc-lop-4"
              className="px-6 py-2.5 rounded-full border border-[#A8D5BA] text-[#2F3A32] font-bold hover:bg-[#A8D5BA] transition-colors whitespace-nowrap"
            >
              Tất cả bài học
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white rounded-2xl h-96 animate-pulse border border-[#E6E4DD]"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredLessons.map((lesson) => (
                <LessonCard
                  key={lesson.id}
                  lesson={lesson}
                  resourceTypes={resourcesMap[lesson.id] || []}
                />
              ))}
            </div>
          )}
        </div>
      </section>

    </div>
  );
};
export default Home;
