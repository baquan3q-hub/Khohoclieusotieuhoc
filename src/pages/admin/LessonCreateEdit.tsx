import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { dbService } from '../../services/db';
import { ArrowLeft, Save, PlusCircle, Edit, Link2, Image as ImageIcon } from 'lucide-react';

export const LessonCreateEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id;
  const navigate = useNavigate();

  const [lessonNumber, setLessonNumber] = useState<number>(1);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [semester, setSemester] = useState<1 | 2>(1);
  const [description, setDescription] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [thumbnailMode, setThumbnailMode] = useState<'link' | 'file'>('file');
  const [imageUploading, setImageUploading] = useState(false);
  const [isPublished, setIsPublished] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Vui lòng chọn tệp tin hình ảnh (PNG, JPG, JPEG)!');
      return;
    }

    setImageUploading(true);
    try {
      const publicUrl = await dbService.uploadFile(file);
      setThumbnailUrl(publicUrl);
      alert('Tải ảnh lên thành công!');
    } catch (err: any) {
      alert('Tải ảnh lên thất bại: ' + err.message);
    } finally {
      setImageUploading(false);
    }
  };

  // Helper to convert title to slug
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // remove tone marks
      .replace(/đ/g, 'd')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  useEffect(() => {
    if (title && !isEdit) {
      setSlug(generateSlug(title));
    }
  }, [title, isEdit]);

  useEffect(() => {
    const fetchLesson = async () => {
      if (!isEdit || !id) return;
      try {
        const lessons = await dbService.getLessons();
        const found = lessons.find((l) => l.id === id);
        if (found) {
          setLessonNumber(found.lesson_number);
          setTitle(found.title);
          setSlug(found.slug);
          setSemester(found.semester);
          setDescription(found.description || '');
          setThumbnailUrl(found.thumbnail_url || '');
          setIsPublished(found.is_published);
        } else {
          alert('Không tìm thấy bài học này!');
          navigate('/admin/dashboard');
        }
      } catch (err) {
        console.error('Error fetching lesson:', err);
      }
    };
    fetchLesson();
  }, [id, isEdit, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug) {
      alert('Vui lòng nhập Tên bài và Slug URL');
      return;
    }

    setSubmitting(true);
    const payload = {
      lesson_number: Number(lessonNumber),
      title,
      slug,
      semester,
      description,
      thumbnail_url: thumbnailUrl || null,
      is_published: isPublished,
    };

    try {
      if (isEdit && id) {
        await dbService.updateLesson(id, payload);
        alert('Cập nhật bài học thành công!');
      } else {
        await dbService.createLesson(payload);
        alert('Tạo bài học mới thành công!');
      }
      navigate('/admin/dashboard');
    } catch (err) {
      alert('Đã xảy ra lỗi khi lưu thông tin bài học.');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

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
          {isEdit ? 'Chỉnh sửa bài học SGK' : 'Thêm bài học SGK mới'}
        </h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white border border-[#E6E4DD] rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Title */}
          <div className="sm:col-span-2 space-y-1.5">
            <label className="text-sm font-bold text-[#2F3A32]">Tên bài học *</label>
            <input
              type="text"
              required
              placeholder="Ví dụ: Thi nhạc, Nghệ sĩ trống..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6E4DD] text-sm focus:outline-none focus:ring-2 focus:ring-[#A8D5BA] focus:border-transparent transition-all"
            />
          </div>

          {/* Slug URL */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-[#2F3A32]">Slug URL *</label>
            <input
              type="text"
              required
              placeholder="ví dụ: thi-nhac"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6E4DD] text-sm focus:outline-none focus:ring-2 focus:ring-[#A8D5BA] focus:border-transparent transition-all font-mono"
            />
            <p className="text-xs text-[#6B756D] leading-relaxed">
              💡 <strong>Slug URL là gì?</strong> Đây là phần định danh của bài học trên trình duyệt (ví dụ: <code>/bai-hoc/thi-nhac</code>). Bạn <strong>có thể</strong> viết tiếng Việt có dấu (ví dụ: <code>thi-nhạc</code> hoặc <code>thi nhạc</code>), tuy nhiên hệ thống khuyến nghị dùng chữ viết thường không dấu, phân tách bằng dấu gạch ngang (-) để đường dẫn chuẩn SEO, đẹp mắt và không bị mã hóa ký tự lạ khi chia sẻ link.
            </p>
          </div>

          {/* Lesson Number */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-[#2F3A32]">Bài số (Thứ tự) *</label>
            <input
              type="number"
              required
              min="1"
              value={lessonNumber}
              onChange={(e) => setLessonNumber(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6E4DD] text-sm focus:outline-none focus:ring-2 focus:ring-[#A8D5BA] focus:border-transparent transition-all"
            />
          </div>

          {/* Semester */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-[#2F3A32]">Học kỳ *</label>
            <select
              value={semester}
              onChange={(e) => setSemester(Number(e.target.value) as 1 | 2)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6E4DD] text-sm focus:outline-none focus:ring-2 focus:ring-[#A8D5BA] focus:border-transparent bg-white"
            >
              <option value="1">Học kỳ 1</option>
              <option value="2">Học kỳ 2</option>
            </select>
          </div>

          {/* Thumbnail Image */}
          <div className="sm:col-span-2 space-y-3">
            <label className="text-sm font-bold text-[#2F3A32] block">Ảnh đại diện bài học</label>
            
            {/* Mode selection tabs */}
            <div className="flex space-x-4 border-b border-[#E6E4DD] pb-2">
              <button
                type="button"
                onClick={() => setThumbnailMode('file')}
                className={`text-xs font-bold pb-1.5 border-b-2 transition-all ${thumbnailMode === 'file' ? 'border-[#A8D5BA] text-[#2F3A32]' : 'border-transparent text-[#6B756D]'}`}
              >
                Tải ảnh lên (PNG/JPG)
              </button>
              <button
                type="button"
                onClick={() => setThumbnailMode('link')}
                className={`text-xs font-bold pb-1.5 border-b-2 transition-all ${thumbnailMode === 'link' ? 'border-[#A8D5BA] text-[#2F3A32]' : 'border-transparent text-[#6B756D]'}`}
              >
                Nhập link ảnh ngoài
              </button>
            </div>

            {thumbnailMode === 'file' ? (
              <div className="space-y-3 p-4 bg-[#FCFBF7] border border-[#E6E4DD] rounded-2xl">
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <label className="text-xs text-[#6B756D] block mb-1">Chấp nhận ảnh định dạng .png, .jpg, .jpeg</label>
                    <input
                      type="file"
                      accept="image/png, image/jpeg, image/jpg"
                      onChange={handleImageUpload}
                      className="text-xs text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#DFF3E3] file:text-[#2F3A32] file:cursor-pointer hover:file:bg-[#A8D5BA] transition-all"
                    />
                  </div>
                  
                  {/* Thumbnail Preview */}
                  {thumbnailUrl && (
                    <div className="w-16 h-16 rounded-xl border border-[#E6E4DD] overflow-hidden bg-gray-50 shrink-0 flex items-center justify-center">
                      <img src={thumbnailUrl} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                {imageUploading && (
                  <p className="text-xs text-emerald-600 font-semibold animate-pulse">Đang đẩy ảnh lên hệ thống lưu trữ...</p>
                )}

                {thumbnailUrl && (
                  <div className="flex items-center space-x-2 text-xs text-[#6B756D] bg-white p-2 border border-[#E6E4DD] rounded-xl font-mono truncate">
                    <ImageIcon size={14} className="text-[#A8D5BA] shrink-0" />
                    <span className="truncate">{thumbnailUrl}</span>
                    <button
                      type="button"
                      onClick={() => setThumbnailUrl('')}
                      className="text-red-500 font-bold hover:text-red-700 ml-auto px-1 cursor-pointer"
                    >
                      Xoá ảnh
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                <div className="relative">
                  <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="url"
                    placeholder="Dán URL hình ảnh từ Unsplash hoặc lưu trữ ngoài"
                    value={thumbnailUrl}
                    onChange={(e) => setThumbnailUrl(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-[#E6E4DD] text-sm focus:outline-none focus:ring-2 focus:ring-[#A8D5BA] focus:border-transparent transition-all font-mono"
                  />
                </div>
                {thumbnailUrl && (
                  <div className="w-24 h-24 rounded-xl border border-[#E6E4DD] overflow-hidden bg-gray-50 flex items-center justify-center mt-2">
                    <img src={thumbnailUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Description */}
          <div className="sm:col-span-2 space-y-1.5">
            <label className="text-sm font-bold text-[#2F3A32]">Mô tả tóm tắt nội dung bài</label>
            <textarea
              rows={4}
              placeholder="Nhập giới thiệu ngắn về câu chuyện, thông điệp giáo dục..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6E4DD] text-sm focus:outline-none focus:ring-2 focus:ring-[#A8D5BA] focus:border-transparent transition-all"
            />
          </div>

          {/* Status Checkbox */}
          <div className="sm:col-span-2 flex items-center space-x-2">
            <input
              type="checkbox"
              id="isPublished"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
              className="h-5 w-5 rounded text-[#A8D5BA] focus:ring-[#A8D5BA] border-[#E6E4DD] cursor-pointer"
            />
            <label htmlFor="isPublished" className="text-sm font-bold text-[#2F3A32] cursor-pointer select-none">
              Cho phép hiển thị công khai trên website
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
            disabled={submitting}
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
export default LessonCreateEdit;
