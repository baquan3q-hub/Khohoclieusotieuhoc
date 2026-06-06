import React, { useState } from 'react';
import type { Resource, ResourceType } from '../types';
import { dbService } from '../services/db';
import { AudioPlayer } from './AudioPlayer';
import { VideoEmbed } from './VideoEmbed';
import {
  Play,
  Headphones,
  FileText,
  Clipboard,
  Download,
  ExternalLink,
  BookOpen,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface ResourceCardProps {
  resource: Resource;
  showLessonInfo?: boolean;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({ resource, showLessonInfo = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getResourceTypeDetails = (type: ResourceType) => {
    switch (type) {
      case 'video':
        return {
          icon: <Play size={18} className="text-blue-600" />,
          bgColor: 'bg-blue-50 border-blue-100',
          textColor: 'text-blue-700',
          label: 'Video bài học',
        };
      case 'interactive_worksheet':
        return {
          icon: <Clipboard size={18} className="text-purple-600" />,
          bgColor: 'bg-purple-50 border-purple-100',
          textColor: 'text-purple-700',
          label: 'Phiếu tương tác',
        };
      case 'podcast':
        return {
          icon: <Headphones size={18} className="text-pink-600" />,
          bgColor: 'bg-pink-50 border-pink-100',
          textColor: 'text-pink-700',
          label: 'Podcast kể chuyện',
        };
      case 'visual_worksheet':
        return {
          icon: <FileText size={18} className="text-emerald-600" />,
          bgColor: 'bg-emerald-50 border-emerald-100',
          textColor: 'text-emerald-700',
          label: 'Phiếu trực quan',
        };
      case 'drama_script':
        return {
          icon: <BookOpen size={18} className="text-amber-600" />,
          bgColor: 'bg-amber-50 border-amber-100',
          textColor: 'text-amber-700',
          label: 'Kịch bản sân khấu',
        };
      case 'lesson_plan':
        return {
          icon: <BookOpen size={18} className="text-indigo-600" />,
          bgColor: 'bg-indigo-50 border-indigo-100',
          textColor: 'text-indigo-700',
          label: 'Giáo án mẫu',
        };
      default:
        return {
          icon: <FileText size={18} className="text-gray-600" />,
          bgColor: 'bg-gray-50 border-gray-100',
          textColor: 'text-gray-700',
          label: 'Tài nguyên',
        };
    }
  };

  const details = getResourceTypeDetails(resource.resource_type);
  const fileUrl = resource.file_url;
  const externalUrl = resource.external_url;
  
  // Decide which action type this resource uses
  const isEmbeddable = resource.resource_type === 'video' || resource.resource_type === 'podcast';
  const isExternal = resource.resource_type === 'interactive_worksheet' && externalUrl;
  const isDownloadable = (resource.resource_type === 'visual_worksheet' || 
                          resource.resource_type === 'drama_script' || 
                          resource.resource_type === 'lesson_plan') && fileUrl;

  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!fileUrl) return;
    
    // Extract a descriptive filename
    const fileExt = fileUrl.split('.').pop()?.split('?')[0] || 'pdf';
    const cleanTitle = resource.title.toLowerCase().replace(/[^a-z0-9àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ\s]/g, '').replace(/\s+/g, '-');
    const filename = `${cleanTitle}.${fileExt}`;
    
    dbService.downloadFileDirectly(fileUrl, filename);
  };

  const handleActionClick = () => {
    if (isEmbeddable) {
      setIsExpanded(!isExpanded);
    } else if (isExternal && externalUrl) {
      window.open(externalUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="bg-white border border-[#E6E4DD] rounded-2xl p-5 shadow-sm transition-all duration-300 hover:shadow-md flex flex-col space-y-4">
      <div className="flex items-start justify-between space-x-3">
        {/* Type Badge & Meta info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap gap-2 items-center mb-2">
            <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${details.bgColor} ${details.textColor}`}>
              {details.icon}
              <span className="ml-1">{details.label}</span>
            </span>

            {showLessonInfo && resource.lessons && (
              <span className="inline-flex items-center text-xs font-semibold bg-[#FFF6DA] text-[#6B756D] px-2.5 py-0.5 rounded-full border border-[#FFF6DA]">
                Bài {resource.lessons.lesson_number}: {resource.lessons.title}
              </span>
            )}
          </div>

          <h4 className="font-display font-bold text-lg text-[#2F3A32] leading-snug">
            {resource.title}
          </h4>
        </div>
      </div>

      <p className="text-sm text-[#6B756D] leading-relaxed">
        {resource.description || 'Tài nguyên hỗ trợ giáo án dạy đọc hiểu Ngữ văn lớp 4.'}
      </p>

      {/* Embedded View Panel (Expanded) */}
      {isExpanded && isEmbeddable && (
        <div className="border-t border-[#E6E4DD] pt-4 mt-2">
          {resource.resource_type === 'video' && externalUrl && (
            <VideoEmbed url={externalUrl} title={resource.title} />
          )}
          {resource.resource_type === 'podcast' && fileUrl && (
            <AudioPlayer url={fileUrl} title={resource.title} />
          )}
          {!externalUrl && !fileUrl && (
            <div className="p-4 bg-amber-50 text-amber-800 rounded-xl text-sm italic">
              Không tìm thấy file nguồn phát trực tiếp.
            </div>
          )}
        </div>
      )}

      {/* Actions Row */}
      <div className="flex items-center justify-between pt-2 border-t border-[#E6E4DD]/65">
        <span className="text-xs text-[#6B756D]/75 italic">
          {isEmbeddable ? 'Hỗ trợ xem trực tiếp' : isExternal ? 'Liên kết nền tảng ngoài' : 'Tải xuống trực tiếp'}
        </span>

        {isEmbeddable && (
          <button
            onClick={handleActionClick}
            className="inline-flex items-center space-x-1.5 px-4.5 py-2 rounded-xl text-sm font-bold bg-[#DFF3E3] text-[#2F3A32] hover:bg-[#A8D5BA] transition-colors"
          >
            <span>{isExpanded ? 'Thu gọn' : resource.resource_type === 'video' ? 'Xem video' : 'Nghe Podcast'}</span>
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        )}

        {isExternal && (
          <button
            onClick={handleActionClick}
            className="inline-flex items-center space-x-1.5 px-4.5 py-2 rounded-xl text-sm font-bold bg-[#FFF6DA] text-[#2F3A32] hover:bg-[#F6B26B] hover:text-white transition-colors"
          >
            <span>Mở phiếu tương tác</span>
            <ExternalLink size={15} />
          </button>
        )}

        {isDownloadable && (
          <button
            onClick={handleDownload}
            className="inline-flex items-center space-x-1.5 px-4.5 py-2 rounded-xl text-sm font-bold bg-[#DFF3E3] text-[#2F3A32] hover:bg-[#A8D5BA] transition-colors"
          >
            <span>Tải tài liệu</span>
            <Download size={15} />
          </button>
        )}

        {!isEmbeddable && !isExternal && !isDownloadable && (
          <span className="text-xs text-red-500 italic">Đang cập nhật nguồn tài liệu</span>
        )}
      </div>
    </div>
  );
};
export default ResourceCard;
