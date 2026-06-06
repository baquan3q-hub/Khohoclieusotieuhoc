import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { dbService } from '../services/db';
import type { Lesson, Resource } from '../types';
import { ResourceCard } from '../components/ResourceCard';
import { ChevronRight, Sprout, ArrowLeft, Info } from 'lucide-react';

export const LessonDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLessonAndResources = async () => {
      if (!slug) return;
      try {
        const lessonData = await dbService.getLessonBySlug(slug);
        setLesson(lessonData);

        if (lessonData) {
          const resourcesData = await dbService.getResources(lessonData.id);
          setResources(resourcesData);
        }
      } catch (err) {
        console.error('Error loading lesson details:', err);
      } finally {
        setLoading(false);
      }
    };
    loadLessonAndResources();
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-4">
        <div className="w-12 h-12 border-4 border-[#A8D5BA] border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-[#6B756D] font-medium">Đang tải học liệu...</p>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-6">
        <span className="text-6xl">🔍</span>
        <h2 className="font-display font-bold text-2xl text-[#2F3A32]">Không tìm thấy bài học</h2>
        <p className="text-[#6B756D]">Bài học bạn đang truy cập không tồn tại hoặc đã bị ẩn.</p>
        <Link
          to="/van-hoc-lop-4"
          className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-[#A8D5BA] text-[#2F3A32] font-bold hover:bg-[#8ec3a2]"
        >
          <ArrowLeft size={16} />
          <span>Quay về danh sách bài học</span>
        </Link>
      </div>
    );
  }

  // Filter resources by group
  const interactiveDigital = resources.filter(
    (r) => r.resource_group === 'interactive_digital'
  );
  const readingSupport = resources.filter(
    (r) => r.resource_group === 'reading_support'
  );
  const teachingModel = resources.filter(
    (r) => r.resource_group === 'teaching_model'
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-1.5 text-sm text-[#6B756D] font-medium">
        <Link to="/" className="hover:text-[#2F3A32] transition-colors">Trang chủ</Link>
        <ChevronRight size={14} />
        <Link to="/van-hoc-lop-4" className="hover:text-[#2F3A32] transition-colors">Văn học lớp 4</Link>
        <ChevronRight size={14} />
        <span className="text-[#2F3A32] font-semibold truncate max-w-[200px] sm:max-w-none">
          Bài {lesson.lesson_number}: {lesson.title}
        </span>
      </nav>

      {/* Hero Header Card */}
      <div className="bg-white border border-[#E6E4DD] rounded-3xl overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8 items-center">
        {/* Left text */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex flex-wrap gap-2">
            <span className="bg-[#DFF3E3] text-[#2F3A32] text-xs font-bold px-3 py-1 rounded-full border border-[#A8D5BA]/40">
              Bài số {lesson.lesson_number}
            </span>
            <span className="bg-[#FFF6DA] text-[#6B756D] text-xs font-bold px-3 py-1 rounded-full border border-[#FFF6DA]">
              Học kỳ {lesson.semester}
            </span>
          </div>

          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[#2F3A32] leading-tight my-0">
            {lesson.title}
          </h1>

          <p className="text-base text-[#6B756D] leading-relaxed">
            {lesson.description || 'Bài học đọc hiểu Ngữ văn lớp 4 trong phân phối chương trình SGK.'}
          </p>

          <Link
            to="/van-hoc-lop-4"
            className="inline-flex items-center space-x-1.5 text-sm font-bold text-[#6B756D] hover:text-[#2F3A32] transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Quay về danh sách</span>
          </Link>
        </div>

        {/* Right image or Sprout Icon Placeholder */}
        <div className="lg:col-span-4 aspect-video w-full rounded-2xl overflow-hidden shadow-sm border border-[#E6E4DD] bg-gradient-to-br from-[#DFF3E3] to-[#FFF6DA] flex items-center justify-center">
          {lesson.thumbnail_url ? (
            <img
              src={lesson.thumbnail_url}
              alt={lesson.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center justify-center space-y-2">
              <span className="text-6xl filter drop-shadow">🌱</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B756D] bg-[#FCFBF7]/90 px-3 py-1 rounded-full border border-[#E6E4DD]">
                Đọc hiểu Lớp 4
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Resources lists */}
        <div className="lg:col-span-8 space-y-12">
          {resources.length === 0 ? (
            <div className="bg-white border border-[#E6E4DD] rounded-2xl p-10 text-center space-y-4">
              <Info size={40} className="mx-auto text-amber-500" />
              <h3 className="font-display font-bold text-lg text-[#2F3A32]">Học liệu đang được cập nhật</h3>
              <p className="text-sm text-[#6B756D] max-w-sm mx-auto">
                Admin đang thiết kế và sẽ sớm đăng tải các học liệu số, kịch bản sân khấu hóa cũng như giáo án mẫu cho bài học này.
              </p>
            </div>
          ) : (
            <>
              {/* 1. Học liệu số tương tác */}
              {interactiveDigital.length > 0 && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 border-b border-[#E6E4DD] pb-3">
                    <span className="text-2xl">💻</span>
                    <div>
                      <h2 className="font-display font-extrabold text-2xl text-[#2F3A32] m-0">
                        Học liệu số tương tác
                      </h2>
                      <p className="text-xs text-[#6B756D]">Video bài học & Phiếu học tập tương tác trực tiếp</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {interactiveDigital.map((r) => (
                      <ResourceCard key={r.id} resource={r} />
                    ))}
                  </div>
                </div>
              )}

              {/* 2. Học liệu hỗ trợ đọc hiểu */}
              {readingSupport.length > 0 && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 border-b border-[#E6E4DD] pb-3">
                    <span className="text-2xl">🎧</span>
                    <div>
                      <h2 className="font-display font-extrabold text-2xl text-[#2F3A32] m-0">
                        Học liệu hỗ trợ đọc hiểu
                      </h2>
                      <p className="text-xs text-[#6B756D]">Podcast kể chuyện & Phiếu bài tập trực quan tải về</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {readingSupport.map((r) => (
                      <ResourceCard key={r.id} resource={r} />
                    ))}
                  </div>
                </div>
              )}

              {/* 3. Mẫu tổ chức dạy học */}
              {teachingModel.length > 0 && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 border-b border-[#E6E4DD] pb-3">
                    <span className="text-2xl">📋</span>
                    <div>
                      <h2 className="font-display font-extrabold text-2xl text-[#2F3A32] m-0">
                        Mẫu tổ chức dạy học
                      </h2>
                      <p className="text-xs text-[#6B756D]">Kịch bản phân vai sân khấu hóa & Giáo án thiết kế bài dạy</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {teachingModel.map((r) => (
                      <ResourceCard key={r.id} resource={r} />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Right Side: Quick sidebar help */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#DFF3E3]/40 border border-[#A8D5BA] rounded-3xl p-6 space-y-4">
            <h3 className="font-display font-bold text-lg text-[#2F3A32] flex items-center space-x-2">
              <Sprout size={18} className="text-emerald-700" />
              <span>Góc sư phạm</span>
            </h3>
            
            <p className="text-sm text-[#6B756D] leading-relaxed">
              Các tài nguyên của bài <strong>{lesson.title}</strong> được tổ chức đồng bộ để giáo viên có thể phối hợp nhịp nhàng các phương pháp:
            </p>

            <ul className="space-y-3 text-xs text-[#6B756D]">
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2 font-bold">✓</span>
                <span><strong>Khởi động / Khám phá:</strong> Dùng video và podcast để tạo cảm xúc, giới thiệu nhân vật truyện.</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2 font-bold">✓</span>
                <span><strong>Thực hành đọc hiểu:</strong> Sử dụng phiếu bài tập trực quan tại lớp.</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2 font-bold">✓</span>
                <span><strong>Vận dụng / Sáng tạo:</strong> Triển khai đóng kịch phân vai theo mẫu kịch bản sân khấu hóa để học sinh khắc sâu bài học nhân sinh.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LessonDetail;
