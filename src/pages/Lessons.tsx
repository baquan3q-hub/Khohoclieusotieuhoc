import React, { useEffect, useState } from 'react';
import { dbService } from '../services/db';
import type { Lesson, ResourceType } from '../types';
import { LessonCard } from '../components/LessonCard';
import { Search, RefreshCw, BookOpen } from 'lucide-react';

export const Lessons: React.FC = () => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [resourcesMap, setResourcesMap] = useState<Record<string, ResourceType[]>>({});
  const [loading, setLoading] = useState(true);

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSemester, setSelectedSemester] = useState<'all' | 1 | 2>('all');
  const [requiredResourceType, setRequiredResourceType] = useState<ResourceType | 'all'>('all');

  useEffect(() => {
    const loadData = async () => {
      try {
        const lessonsData = await dbService.getLessons();
        setLessons(lessonsData);

        const map: Record<string, ResourceType[]> = {};
        for (const l of lessonsData) {
          const res = await dbService.getResources(l.id);
          map[l.id] = res.map(r => r.resource_type);
        }
        setResourcesMap(map);
      } catch (err) {
        console.error('Error fetching lessons list:', err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedSemester('all');
    setRequiredResourceType('all');
  };

  // Filter logic
  const filteredLessons = lessons.filter((lesson) => {
    // 1. Search Query
    const matchesSearch = lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lesson.lesson_number && `bài ${lesson.lesson_number}`.includes(searchQuery.toLowerCase()));

    // 2. Semester filter
    const matchesSemester = selectedSemester === 'all' || lesson.semester === selectedSemester;

    // 3. Resource type filter
    const lessonResources = resourcesMap[lesson.id] || [];
    const matchesResource = requiredResourceType === 'all' || lessonResources.includes(requiredResourceType);

    return matchesSearch && matchesSemester && matchesResource;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="text-center md:text-left space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#2F3A32] tracking-tight">
          Danh sách Bài học Văn học lớp 4
        </h1>
        <p className="text-base text-[#6B756D] max-w-3xl">
          Tìm kiếm bài học theo phân phối chương trình sách giáo khoa Tiếng Việt lớp 4 và lọc nhanh các học liệu cần thiết.
        </p>
      </div>

      {/* Filter and Search Section */}
      <div className="bg-white border border-[#E6E4DD] rounded-2xl p-5 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Search Box */}
          <div className="md:col-span-4 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B756D]" size={18} />
            <input
              type="text"
              placeholder="Tìm tên bài, số bài (ví dụ: Thi nhạc)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E6E4DD] text-sm focus:outline-none focus:ring-2 focus:ring-[#A8D5BA] focus:border-transparent transition-all"
            />
          </div>

          {/* Semester Selector */}
          <div className="md:col-span-3 flex items-center space-x-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B756D] whitespace-nowrap">Học kỳ:</span>
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value === 'all' ? 'all' : Number(e.target.value) as 1 | 2)}
              className="w-full py-2.5 px-3 rounded-xl border border-[#E6E4DD] text-sm focus:outline-none focus:ring-2 focus:ring-[#A8D5BA] focus:border-transparent bg-white"
            >
              <option value="all">Tất cả học kỳ</option>
              <option value="1">Học kỳ 1</option>
              <option value="2">Học kỳ 2</option>
            </select>
          </div>

          {/* Resource Filter */}
          <div className="md:col-span-3 flex items-center space-x-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B756D] whitespace-nowrap">Tài nguyên:</span>
            <select
              value={requiredResourceType}
              onChange={(e) => setRequiredResourceType(e.target.value as ResourceType | 'all')}
              className="w-full py-2.5 px-3 rounded-xl border border-[#E6E4DD] text-sm focus:outline-none focus:ring-2 focus:ring-[#A8D5BA] focus:border-transparent bg-white"
            >
              <option value="all">Tất cả tài nguyên</option>
              <option value="video">Video bài học</option>
              <option value="interactive_worksheet">Phiếu tương tác</option>
              <option value="podcast">Podcast kể chuyện</option>
              <option value="visual_worksheet">Phiếu trực quan</option>
              <option value="drama_script">Kịch bản đóng vai</option>
              <option value="lesson_plan">Giáo án mẫu</option>
            </select>
          </div>

          {/* Reset button */}
          <div className="md:col-span-2 flex justify-end">
            <button
              onClick={handleResetFilters}
              className="w-full md:w-auto inline-flex items-center justify-center space-x-1 px-4 py-2.5 rounded-xl border border-[#A8D5BA] text-[#2F3A32] text-sm font-bold hover:bg-[#DFF3E3] transition-colors"
            >
              <RefreshCw size={14} />
              <span>Đặt lại bộ lọc</span>
            </button>
          </div>
        </div>
      </div>

      {/* Lessons List Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-2xl h-[420px] border border-[#E6E4DD] animate-pulse"></div>
          ))}
        </div>
      ) : filteredLessons.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredLessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              resourceTypes={resourcesMap[lesson.id] || []}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-[#E6E4DD] rounded-2xl p-16 text-center space-y-4">
          <BookOpen className="mx-auto text-[#6B756D]/40" size={48} />
          <h3 className="font-display font-bold text-xl text-[#2F3A32]">Không tìm thấy bài học nào</h3>
          <p className="text-sm text-[#6B756D] max-w-md mx-auto">
            Hãy thử thay đổi từ khóa tìm kiếm hoặc điều chỉnh lại bộ lọc để tìm được các bài học mong muốn.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-5 py-2.5 rounded-xl bg-[#DFF3E3] text-[#2F3A32] font-bold text-sm hover:bg-[#A8D5BA] transition-colors"
          >
            Hiển thị lại tất cả bài học
          </button>
        </div>
      )}
    </div>
  );
};
export default Lessons;
