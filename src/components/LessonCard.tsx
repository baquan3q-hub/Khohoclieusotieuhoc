import React from 'react';
import { Link } from 'react-router-dom';
import type { Lesson, ResourceType } from '../types';
import { BookOpen, Video, Headphones, FileText, Clipboard, ArrowRight } from 'lucide-react';

interface LessonCardProps {
  lesson: Lesson;
  resourceTypes: ResourceType[];
}

export const LessonCard: React.FC<LessonCardProps> = ({ lesson, resourceTypes }) => {
  const getResourceIcon = (type: ResourceType) => {
    switch (type) {
      case 'video':
        return <Video size={12} className="text-blue-500" />;
      case 'interactive_worksheet':
        return <Clipboard size={12} className="text-purple-500" />;
      case 'podcast':
        return <Headphones size={12} className="text-pink-500" />;
      case 'visual_worksheet':
        return <FileText size={12} className="text-emerald-500" />;
      case 'drama_script':
        return <BookOpen size={12} className="text-amber-500" />;
      case 'lesson_plan':
        return <BookOpen size={12} className="text-indigo-500" />;
      default:
        return null;
    }
  };

  const getResourceName = (type: ResourceType) => {
    switch (type) {
      case 'video': return 'Video';
      case 'interactive_worksheet': return 'Phiếu tương tác';
      case 'podcast': return 'Podcast';
      case 'visual_worksheet': return 'Phiếu trực quan';
      case 'drama_script': return 'Kịch bản';
      case 'lesson_plan': return 'Giáo án';
      default: return '';
    }
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#E6E4DD] flex flex-col h-full hover:-translate-y-1">
      {/* Thumbnail or Sprout Icon Placeholder */}
      <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-[#DFF3E3] to-[#FFF6DA] flex items-center justify-center border-b border-[#E6E4DD]">
        {lesson.thumbnail_url ? (
          <img
            src={lesson.thumbnail_url}
            alt={lesson.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="flex flex-col items-center justify-center space-y-2 group-hover:scale-105 transition-transform duration-500">
            <span className="text-5xl filter drop-shadow">📖</span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B756D] bg-[#FCFBF7]/90 px-2.5 py-0.5 rounded-full border border-[#E6E4DD]">
              Văn học Lớp 4
            </span>
          </div>
        )}
        <div className="absolute top-3 left-3 bg-[#FCFBF7] text-[#2F3A32] text-xs font-bold px-2.5 py-1 rounded-full shadow-sm border border-[#E6E4DD]">
          Bài {lesson.lesson_number}
        </div>
        <div className="absolute top-3 right-3 bg-[#F6B26B] text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
          Học kỳ {lesson.semester}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display font-bold text-xl text-[#2F3A32] group-hover:text-[#A8D5BA] transition-colors leading-tight mb-2">
          {lesson.title}
        </h3>
        
        <p className="text-sm text-[#6B756D] line-clamp-3 mb-4 flex-1">
          {lesson.description || 'Chưa có mô tả chi tiết cho bài học này.'}
        </p>

        {/* Resources Tags */}
        <div className="mb-5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B756D] block mb-2">
            Học liệu có sẵn
          </span>
          {resourceTypes.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {Array.from(new Set(resourceTypes)).map((type) => (
                <div
                  key={type}
                  className="flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-medium bg-[#FCFBF7] border border-[#E6E4DD] text-[#2F3A32]"
                >
                  {getResourceIcon(type)}
                  <span>{getResourceName(type)}</span>
                </div>
              ))}
            </div>
          ) : (
            <span className="text-xs text-[#6B756D]/60 italic block">Đang cập nhật tài nguyên...</span>
          )}
        </div>

        {/* CTA Link */}
        <Link
          to={`/bai-hoc/${lesson.slug}`}
          className="flex items-center justify-center space-x-1.5 w-full py-2.5 px-4 rounded-xl text-sm font-bold bg-[#DFF3E3] text-[#2F3A32] hover:bg-[#A8D5BA] transition-colors group-hover:shadow-sm"
        >
          <span>Khám phá học liệu</span>
          <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
};
export default LessonCard;
