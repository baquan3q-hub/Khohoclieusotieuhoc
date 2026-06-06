import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { dbService } from '../services/db';
import type { Resource, ResourceGroup, ResourceType } from '../types';
import { ResourceCard } from '../components/ResourceCard';
import { Search, Layers } from 'lucide-react';

export const Resources: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const activeGroup = (searchParams.get('group') as ResourceGroup | 'all') || 'all';
  const activeType = (searchParams.get('type') as ResourceType | 'all') || 'all';

  useEffect(() => {
    const fetchAllResources = async () => {
      try {
        const data = await dbService.getResources();
        setResources(data);
      } catch (err) {
        console.error('Error fetching resources:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllResources();
  }, []);

  const handleGroupTabClick = (group: ResourceGroup | 'all') => {
    const newParams = new URLSearchParams(searchParams);
    if (group === 'all') {
      newParams.delete('group');
    } else {
      newParams.set('group', group);
    }
    // Reset type filter when switching groups
    newParams.delete('type');
    setSearchParams(newParams);
  };

  const handleTypeFilterClick = (type: ResourceType | 'all') => {
    const newParams = new URLSearchParams(searchParams);
    if (type === 'all') {
      newParams.delete('type');
    } else {
      newParams.set('type', type);
    }
    setSearchParams(newParams);
  };

  // Filter logic
  const filteredResources = resources.filter((res) => {
    const matchesSearch = res.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (res.description && res.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (res.lessons?.title && res.lessons.title.toLowerCase().includes(searchQuery.toLowerCase()));
      
    const matchesGroup = activeGroup === 'all' || res.resource_group === activeGroup;
    const matchesType = activeType === 'all' || res.resource_type === activeType;

    return matchesSearch && matchesGroup && matchesType;
  });

  // Get options for type filter based on active group
  const getSubtypesForGroup = (group: ResourceGroup | 'all'): { value: ResourceType; label: string }[] => {
    const allTypes: { value: ResourceType; label: string; group: ResourceGroup }[] = [
      { value: 'video', label: 'Video bài học', group: 'interactive_digital' },
      { value: 'interactive_worksheet', label: 'Phiếu tương tác', group: 'interactive_digital' },
      { value: 'podcast', label: 'Podcast kể chuyện', group: 'reading_support' },
      { value: 'visual_worksheet', label: 'Phiếu trực quan', group: 'reading_support' },
      { value: 'drama_script', label: 'Kịch bản sân khấu', group: 'teaching_model' },
      { value: 'lesson_plan', label: 'Giáo án mẫu', group: 'teaching_model' },
    ];

    if (group === 'all') {
      return allTypes;
    }
    return allTypes.filter((t) => t.group === group);
  };

  const currentTypes = getSubtypesForGroup(activeGroup);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="text-center md:text-left space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#2F3A32] tracking-tight">
          Thư viện Kho tài nguyên
        </h1>
        <p className="text-base text-[#6B756D] max-w-3xl">
          Tìm kiếm trực tiếp học liệu theo nhóm chức năng sư phạm và loại tệp tin thay vì duyệt theo từng bài học SGK.
        </p>
      </div>

      {/* Top Search bar */}
      <div className="max-w-md relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B756D]" size={18} />
        <input
          type="text"
          placeholder="Tìm tên tài nguyên, mô tả, tên bài học liên kết..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E6E4DD] text-sm focus:outline-none focus:ring-2 focus:ring-[#A8D5BA] focus:border-transparent transition-all"
        />
      </div>

      {/* Main Groups Tabs */}
      <div className="border-b border-[#E6E4DD]">
        <div className="flex flex-wrap -mb-px space-x-2 sm:space-x-8">
          <button
            onClick={() => handleGroupTabClick('all')}
            className={`pb-4 px-1 text-base font-bold transition-all border-b-2 ${
              activeGroup === 'all'
                ? 'border-[#A8D5BA] text-[#2F3A32]'
                : 'border-transparent text-[#6B756D] hover:text-[#2F3A32]'
            }`}
          >
            Tất cả tài nguyên
          </button>
          <button
            onClick={() => handleGroupTabClick('interactive_digital')}
            className={`pb-4 px-1 text-base font-bold transition-all border-b-2 ${
              activeGroup === 'interactive_digital'
                ? 'border-[#A8D5BA] text-[#2F3A32]'
                : 'border-transparent text-[#6B756D] hover:text-[#2F3A32]'
            }`}
          >
            💻 Học liệu số tương tác
          </button>
          <button
            onClick={() => handleGroupTabClick('reading_support')}
            className={`pb-4 px-1 text-base font-bold transition-all border-b-2 ${
              activeGroup === 'reading_support'
                ? 'border-[#A8D5BA] text-[#2F3A32]'
                : 'border-transparent text-[#6B756D] hover:text-[#2F3A32]'
            }`}
          >
            🎧 Học liệu hỗ trợ đọc hiểu
          </button>
          <button
            onClick={() => handleGroupTabClick('teaching_model')}
            className={`pb-4 px-1 text-base font-bold transition-all border-b-2 ${
              activeGroup === 'teaching_model'
                ? 'border-[#A8D5BA] text-[#2F3A32]'
                : 'border-transparent text-[#6B756D] hover:text-[#2F3A32]'
            }`}
          >
            📋 Mẫu tổ chức dạy học
          </button>
        </div>
      </div>

      {/* Subtypes Pills Filters */}
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-[#6B756D] mr-2">Bộ lọc phụ:</span>
        <button
          onClick={() => handleTypeFilterClick('all')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${
            activeType === 'all'
              ? 'bg-[#A8D5BA] text-[#2F3A32] border-[#A8D5BA]'
              : 'bg-white border-[#E6E4DD] text-[#6B756D] hover:bg-[#DFF3E3]/40'
          }`}
        >
          Tất cả loại
        </button>

        {currentTypes.map((t) => (
          <button
            key={t.value}
            onClick={() => handleTypeFilterClick(t.value)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${
              activeType === t.value
                ? 'bg-[#A8D5BA] text-[#2F3A32] border-[#A8D5BA]'
                : 'bg-white border-[#E6E4DD] text-[#6B756D] hover:bg-[#DFF3E3]/40'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Grid List */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-2xl h-52 border border-[#E6E4DD] animate-pulse"></div>
          ))}
        </div>
      ) : filteredResources.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((res) => (
            <ResourceCard key={res.id} resource={res} showLessonInfo={true} />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-[#E6E4DD] rounded-2xl p-16 text-center space-y-4">
          <Layers className="mx-auto text-[#6B756D]/40" size={48} />
          <h3 className="font-display font-bold text-xl text-[#2F3A32]">Không tìm thấy tài nguyên nào</h3>
          <p className="text-sm text-[#6B756D] max-w-md mx-auto">
            Hãy thử điều chỉnh từ khóa tìm kiếm hoặc bấm nút "Tất cả tài nguyên" để hiển thị lại toàn bộ danh mục học liệu.
          </p>
        </div>
      )}
    </div>
  );
};
export default Resources;
