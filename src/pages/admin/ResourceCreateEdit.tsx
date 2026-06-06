import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { dbService } from '../../services/db';
import type { Lesson, ResourceGroup, ResourceType } from '../../types';
import { ArrowLeft, Save, Upload, Link2, FileText, PlusCircle, Edit } from 'lucide-react';

export const ResourceCreateEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id;
  const navigate = useNavigate();

  const [lessons, setLessons] = useState<Lesson[]>([]);
  
  // Form fields
  const [title, setTitle] = useState('');
  const [selectedLessonId, setSelectedLessonId] = useState('');
  const [resourceGroup, setResourceGroup] = useState<ResourceGroup>('interactive_digital');
  const [resourceType, setResourceType] = useState<ResourceType>('video');
  const [sourceMode, setSourceMode] = useState<'link' | 'upload'>('link');
  const [externalUrl, setExternalUrl] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const loadLessons = async () => {
      try {
        const data = await dbService.getLessons();
        setLessons(data);
        if (data.length > 0 && !isEdit) {
          setSelectedLessonId(data[0].id);
        }
      } catch (err) {
        console.error('Error fetching lessons list for select:', err);
      } finally {
        if (!isEdit) setLoading(false);
      }
    };
    loadLessons();
  }, [isEdit]);

  useEffect(() => {
    const fetchResource = async () => {
      if (!isEdit || !id) return;
      try {
        const resources = await dbService.getResources();
        const found = resources.find((r) => r.id === id);
        if (found) {
          setTitle(found.title);
          setSelectedLessonId(found.lesson_id || '');
          setResourceGroup(found.resource_group);
          setResourceType(found.resource_type);
          setDescription(found.description || '');
          setIsPublic(found.is_public);
          
          if (found.file_url) {
            setFileUrl(found.file_url);
            setSourceMode('upload');
          } else {
            setExternalUrl(found.external_url || '');
            setSourceMode('link');
          }
        } else {
          alert('Không tìm thấy tài nguyên học liệu này!');
          navigate('/admin/dashboard');
        }
      } catch (err) {
        console.error('Error fetching resource:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchResource();
  }, [id, isEdit, navigate]);

  // Adjust resource type options based on the chosen resource group
  useEffect(() => {
    if (resourceGroup === 'interactive_digital') {
      setResourceType('video');
    } else if (resourceGroup === 'reading_support') {
      setResourceType('podcast');
    } else if (resourceGroup === 'teaching_model') {
      setResourceType('drama_script');
    }
  }, [resourceGroup]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const publicUrl = await dbService.uploadFile(file);
      setFileUrl(publicUrl);
      alert('Tải file lên thành công!');
    } catch (err: any) {
      alert('Tải file lên thất bại: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) {
      alert('Vui lòng nhập tiêu đề học liệu.');
      return;
    }

    setSubmitting(true);
    const payload = {
      title,
      lesson_id: selectedLessonId || null,
      resource_group: resourceGroup,
      resource_type: resourceType,
      description,
      is_public: isPublic,
      file_url: sourceMode === 'upload' ? fileUrl : null,
      external_url: sourceMode === 'link' ? externalUrl : null,
    };

    try {
      if (isEdit && id) {
        await dbService.updateResource(id, payload);
        alert('Cập nhật tài nguyên học liệu thành công!');
      } else {
        await dbService.createResource(payload);
        alert('Thêm tài nguyên học liệu mới thành công!');
      }
      navigate('/admin/dashboard');
    } catch (err) {
      alert('Đã xảy ra lỗi khi lưu thông tin học liệu.');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-10 h-10 border-4 border-[#A8D5BA] border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-[#6B756D] text-sm">Đang tải thông tin form...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      {/* Back button */}
      <div>
        <Link
          to="/admin/dashboard"
          className="inline-flex items-center space-x-1 text-sm font-bold text-[#6B756D] hover:text-[#2F3A32]"
        >
          <ArrowLeft size={16} />
          <span>Quay về Dashboard</span>
        </Link>
      </div>

      {/* Header */}
      <div className="flex items-center space-x-2 border-b border-[#E6E4DD] pb-4">
        {isEdit ? <Edit className="text-[#A8D5BA]" /> : <PlusCircle className="text-[#A8D5BA]" />}
        <h1 className="text-2xl font-extrabold text-[#2F3A32] my-0">
          {isEdit ? 'Chỉnh sửa tài nguyên học liệu' : 'Thêm tài nguyên học liệu mới'}
        </h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white border border-[#E6E4DD] rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Title */}
          <div className="sm:col-span-2 space-y-1.5">
            <label className="text-sm font-bold text-[#2F3A32]">Tiêu đề tài nguyên *</label>
            <input
              type="text"
              required
              placeholder="Ví dụ: Video bài học Thi nhạc, Phiếu trắc nghiệm cảm thụ,..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6E4DD] text-sm focus:outline-none focus:ring-2 focus:ring-[#A8D5BA] focus:border-transparent transition-all"
            />
          </div>

          {/* Linked Lesson */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-[#2F3A32]">Bài học SGK liên kết *</label>
            <select
              value={selectedLessonId}
              onChange={(e) => setSelectedLessonId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6E4DD] text-sm focus:outline-none focus:ring-2 focus:ring-[#A8D5BA] focus:border-transparent bg-white"
            >
              <option value="">-- Chọn bài học liên kết --</option>
              {lessons.map((l) => (
                <option key={l.id} value={l.id}>
                  Bài {l.lesson_number}: {l.title} (Kỳ {l.semester})
                </option>
              ))}
            </select>
          </div>

          {/* Resource Group */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-[#2F3A32]">Nhóm sư phạm *</label>
            <select
              value={resourceGroup}
              onChange={(e) => setResourceGroup(e.target.value as ResourceGroup)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6E4DD] text-sm focus:outline-none focus:ring-2 focus:ring-[#A8D5BA] focus:border-transparent bg-white"
            >
              <option value="interactive_digital">Học liệu số tương tác (Video/Phiếu tương tác)</option>
              <option value="reading_support">Học liệu hỗ trợ đọc hiểu (Podcast/PDF)</option>
              <option value="teaching_model">Mẫu tổ chức dạy học (Kịch bản/Giáo án)</option>
            </select>
          </div>

          {/* Resource Type */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-[#2F3A32]">Loại học liệu cụ thể *</label>
            <select
              value={resourceType}
              onChange={(e) => setResourceType(e.target.value as ResourceType)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6E4DD] text-sm focus:outline-none focus:ring-2 focus:ring-[#A8D5BA] focus:border-transparent bg-white"
            >
              {resourceGroup === 'interactive_digital' && (
                <>
                  <option value="video">Video bài học</option>
                  <option value="interactive_worksheet">Phiếu bài tập tương tác (Link Quizizz/Form...)</option>
                </>
              )}
              {resourceGroup === 'reading_support' && (
                <>
                  <option value="podcast">Podcast (MP3 Audio)</option>
                  <option value="visual_worksheet">Phiếu bài tập trực quan (PDF/DOCX...)</option>
                </>
              )}
              {resourceGroup === 'teaching_model' && (
                <>
                  <option value="drama_script">Kịch bản sân khấu hóa (PDF/DOCX)</option>
                  <option value="lesson_plan">Giáo án mẫu (PDF/DOCX)</option>
                </>
              )}
            </select>
          </div>

          {/* Mode Selector */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-[#2F3A32]">Cách cung cấp tài liệu *</label>
            <div className="flex space-x-4 pt-1">
              <label className="flex items-center space-x-1.5 text-sm cursor-pointer select-none">
                <input
                  type="radio"
                  name="sourceMode"
                  checked={sourceMode === 'link'}
                  onChange={() => setSourceMode('link')}
                  className="text-[#A8D5BA] focus:ring-[#A8D5BA]"
                />
                <span>Sử dụng liên kết ngoài</span>
              </label>
              <label className="flex items-center space-x-1.5 text-sm cursor-pointer select-none">
                <input
                  type="radio"
                  name="sourceMode"
                  checked={sourceMode === 'upload'}
                  onChange={() => setSourceMode('upload')}
                  className="text-[#A8D5BA] focus:ring-[#A8D5BA]"
                />
                <span>Tải tệp tin lên</span>
              </label>
            </div>
          </div>

          {/* Source URL fields depending on mode */}
          <div className="sm:col-span-2 space-y-1.5">
            {sourceMode === 'link' ? (
              <>
                <label className="text-sm font-bold text-[#2F3A32] flex items-center space-x-1">
                  <Link2 size={16} />
                  <span>Liên kết nguồn ngoài (YouTube, Quizizz, Google Form...) *</span>
                </label>
                <input
                  type="url"
                  required={sourceMode === 'link'}
                  placeholder="Dán URL đầy đủ có giao thức http:// hoặc https://"
                  value={externalUrl}
                  onChange={(e) => setExternalUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6E4DD] text-sm focus:outline-none focus:ring-2 focus:ring-[#A8D5BA] focus:border-transparent font-mono"
                />
              </>
            ) : (
              <div className="space-y-3 p-4 bg-[#FCFBF7] border border-[#E6E4DD] rounded-2xl">
                <label className="text-sm font-bold text-[#2F3A32] flex items-center space-x-1">
                  <Upload size={16} />
                  <span>Tải tệp tin lên hệ thống (PDF, Word, MP3, Hình ảnh) *</span>
                </label>
                
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.mp3"
                  onChange={handleFileUpload}
                  className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#DFF3E3] file:text-[#2F3A32] file:cursor-pointer hover:file:bg-[#A8D5BA]"
                />

                {uploading && <p className="text-xs text-emerald-600 font-semibold animate-pulse">Đang đẩy file lên kho lưu trữ...</p>}

                {fileUrl && (
                  <div className="flex items-center space-x-2 text-xs text-[#6B756D] bg-white p-2 border border-[#E6E4DD] rounded-xl font-mono truncate">
                    <FileText size={14} className="text-[#A8D5BA] shrink-0" />
                    <span className="truncate">{fileUrl}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Description */}
          <div className="sm:col-span-2 space-y-1.5">
            <label className="text-sm font-bold text-[#2F3A32]">Mô tả học liệu</label>
            <textarea
              rows={3}
              placeholder="Ghi chú thêm về nội dung học liệu này hoặc cách giáo viên khai thác..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6E4DD] text-sm focus:outline-none focus:ring-2 focus:ring-[#A8D5BA] focus:border-transparent transition-all"
            />
          </div>

          {/* Status Checkbox */}
          <div className="sm:col-span-2 flex items-center space-x-2">
            <input
              type="checkbox"
              id="isPublic"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
              className="h-5 w-5 rounded text-[#A8D5BA] focus:ring-[#A8D5BA] border-[#E6E4DD] cursor-pointer"
            />
            <label htmlFor="isPublic" className="text-sm font-bold text-[#2F3A32] cursor-pointer select-none">
              Cho phép hiển thị công khai tới mọi giáo viên
            </label>
          </div>
        </div>

        {/* Action Row */}
        <div className="flex justify-end space-x-3 pt-4 border-t border-[#E6E4DD]/65">
          <button
            type="button"
            onClick={() => navigate('/admin/dashboard')}
            className="px-5 py-2.5 rounded-xl border border-[#E6E4DD] text-gray-700 text-sm font-semibold hover:bg-gray-50"
          >
            Hủy bỏ
          </button>
          <button
            type="submit"
            disabled={submitting || uploading}
            className="px-6 py-2.5 rounded-xl bg-[#A8D5BA] text-[#2F3A32] font-bold text-sm hover:bg-[#8ec3a2] inline-flex items-center space-x-1 disabled:opacity-50"
          >
            <Save size={16} />
            <span>{submitting ? 'Đang lưu...' : 'Lưu lại'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
export default ResourceCreateEdit;
