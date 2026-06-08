import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { dbService } from '../../services/db';
import { isSupabaseConfigured } from '../../lib/supabase';
import type { Lesson, Resource } from '../../types';
import {
  LayoutDashboard,
  BookOpen,
  FileSpreadsheet,
  Plus,
  Edit2,
  Trash2,
  Globe,
  Settings,
  ExternalLink,
  LogOut,
  Download
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { profile, logout } = useAuth();
  const navigate = useNavigate();

  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'lessons' | 'resources'>('overview');

  const loadData = async () => {
    setLoading(true);
    try {
      const lessonsData = await dbService.getLessons();
      const resourcesData = await dbService.getResources();
      setLessons(lessonsData);
      setResources(resourcesData);
    } catch (err) {
      console.error('Error loading dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDeleteLesson = async (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa bài học này? Mọi học liệu liên kết cũng sẽ bị xóa.')) {
      try {
        await dbService.deleteLesson(id);
        alert('Xóa bài học thành công!');
        loadData();
      } catch (err) {
        alert('Lỗi khi xóa bài học.');
      }
    }
  };

  const handleDeleteResource = async (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa tài nguyên học liệu này?')) {
      try {
        await dbService.deleteResource(id);
        alert('Xóa tài nguyên thành công!');
        loadData();
      } catch (err) {
        alert('Lỗi khi xóa tài nguyên.');
      }
    }
  };

  const getGroupName = (group: string) => {
    switch (group) {
      case 'interactive_digital': return '💻 Tương tác';
      case 'reading_support': return '🎧 Đọc hiểu';
      case 'teaching_model': return '📋 Mẫu dạy học';
      default: return group;
    }
  };

  const getTypeName = (type: string) => {
    switch (type) {
      case 'video': return 'Video';
      case 'interactive_worksheet': return 'Phiếu tương tác';
      case 'podcast': return 'Podcast';
      case 'visual_worksheet': return 'Phiếu trực quan';
      case 'drama_script': return 'Kịch bản';
      case 'lesson_plan': return 'Giáo án';
      default: return type;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Dashboard Top Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-[#E6E4DD] pb-5 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#2F3A32] my-0 flex items-center space-x-2">
            <LayoutDashboard className="text-[#A8D5BA]" />
            <span>Dashboard Quản trị</span>
          </h1>
          <p className="text-sm text-[#6B756D] mt-1">
            Chào mừng quay lại, <span className="font-semibold text-[#2F3A32]">{profile?.full_name}</span>. Bạn đang quản lý nội dung học liệu.
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Link
            to="/"
            className="px-4 py-2 rounded-xl border border-[#E6E4DD] text-[#6B756D] text-sm font-semibold hover:bg-white transition-all inline-flex items-center space-x-1"
          >
            <Globe size={16} />
            <span>Xem Website</span>
          </Link>
          <button
            onClick={async () => {
              await logout();
              navigate('/admin/login');
            }}
            className="px-4 py-2 rounded-xl bg-red-50 text-red-600 text-sm font-semibold hover:bg-red-100 transition-all inline-flex items-center space-x-1"
          >
            <LogOut size={16} />
            <span>Đăng xuất</span>
          </button>
        </div>
      </div>

      {/* DB Connection Status Banner */}
      {isSupabaseConfigured() ? (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center justify-between text-[#2F3A32]">
          <div className="flex items-center space-x-3">
            <span className="flex h-3.5 w-3.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
            </span>
            <div>
              <p className="text-sm font-bold text-emerald-900">🟢 Đã kết nối Supabase Cloud (Dữ liệu đồng bộ trực tiếp)</p>
              <p className="text-xs text-emerald-700">Mọi học liệu tải lên sẽ được hiển thị công khai ngay lập tức cho tất cả khách xem trang.</p>
            </div>
          </div>
          <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold font-mono">
            supabase-cloud
          </span>
        </div>
      ) : (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center justify-between text-[#2F3A32]">
          <div className="flex items-center space-x-3">
            <span className="h-3.5 w-3.5 rounded-full bg-amber-500"></span>
            <div>
              <p className="text-sm font-bold text-amber-950">🟠 Đang chạy Local Storage (Ngoại tuyến / Chế độ Demo)</p>
              <p className="text-xs text-amber-700">Dữ liệu được lưu trong trình duyệt hiện tại của bạn. Khách truy cập khác sẽ không nhìn thấy.</p>
            </div>
          </div>
          <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold font-mono">
            local-storage
          </span>
        </div>
      )}

      {/* Tabs list */}
      <div className="flex space-x-2 border-b border-[#E6E4DD]">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3 px-4 text-sm font-bold border-b-2 transition-all ${
            activeTab === 'overview'
              ? 'border-[#A8D5BA] text-[#2F3A32]'
              : 'border-transparent text-[#6B756D] hover:text-[#2F3A32]'
          }`}
        >
          Tổng quan số liệu
        </button>
        <button
          onClick={() => setActiveTab('lessons')}
          className={`pb-3 px-4 text-sm font-bold border-b-2 transition-all ${
            activeTab === 'lessons'
              ? 'border-[#A8D5BA] text-[#2F3A32]'
              : 'border-transparent text-[#6B756D] hover:text-[#2F3A32]'
          }`}
        >
          Quản lý Bài học ({lessons.length})
        </button>
        <button
          onClick={() => setActiveTab('resources')}
          className={`pb-3 px-4 text-sm font-bold border-b-2 transition-all ${
            activeTab === 'resources'
              ? 'border-[#A8D5BA] text-[#2F3A32]'
              : 'border-transparent text-[#6B756D] hover:text-[#2F3A32]'
          }`}
        >
          Quản lý Học liệu ({resources.length})
        </button>
      </div>

      {loading ? (
        <div className="py-20 text-center space-y-4">
          <div className="w-10 h-10 border-4 border-[#A8D5BA] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-[#6B756D] text-sm">Đang đồng bộ dữ liệu quản trị...</p>
        </div>
      ) : (
        <>
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Metric widgets */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white border border-[#E6E4DD] rounded-2xl p-6 shadow-sm flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-[#DFF3E3] flex items-center justify-center text-[#2F3A32]">
                    <BookOpen size={24} />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-[#6B756D] uppercase">Tổng bài học SGK</span>
                    <h3 className="text-3xl font-extrabold text-[#2F3A32] mt-0.5">{lessons.length}</h3>
                  </div>
                </div>

                <div className="bg-white border border-[#E6E4DD] rounded-2xl p-6 shadow-sm flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-700">
                    <FileSpreadsheet size={24} />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-[#6B756D] uppercase">Tổng học liệu số</span>
                    <h3 className="text-3xl font-extrabold text-[#2F3A32] mt-0.5">{resources.length}</h3>
                  </div>
                </div>

                <div className="bg-white border border-[#E6E4DD] rounded-2xl p-6 shadow-sm flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-[#FFF6DA] flex items-center justify-center text-amber-700">
                    <Settings size={24} />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-[#6B756D] uppercase">Admin Đăng nhập</span>
                    <h3 className="text-sm font-bold text-[#2F3A32] mt-1 truncate max-w-[200px]" title={profile?.email}>
                      {profile?.email}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Quick actions & stats */}
              <div className="bg-white border border-[#E6E4DD] rounded-2xl p-6 shadow-sm space-y-4">
                <h3 className="font-display font-bold text-xl text-[#2F3A32] border-b border-[#E6E4DD]/65 pb-3 my-0">
                  Thao tác nhanh
                </h3>
                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/admin/dashboard/lessonCreate"
                    className="inline-flex items-center space-x-1.5 px-5 py-3 rounded-xl bg-[#A8D5BA] text-[#2F3A32] font-bold text-sm hover:bg-[#8ec3a2]"
                  >
                    <Plus size={16} />
                    <span>Thêm bài học mới</span>
                  </Link>
                  <Link
                    to="/admin/dashboard/resourceCreate"
                    className="inline-flex items-center space-x-1.5 px-5 py-3 rounded-xl bg-[#DFF3E3] text-[#2F3A32] font-bold text-sm hover:bg-[#A8D5BA]"
                  >
                    <Plus size={16} />
                    <span>Thêm học liệu mới</span>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: LESSONS MANAGEMENT */}
          {activeTab === 'lessons' && (
            <div className="bg-white border border-[#E6E4DD] rounded-2xl overflow-hidden shadow-sm space-y-4 p-5">
              <div className="flex justify-between items-center pb-3 border-b border-[#E6E4DD]/65">
                <h3 className="font-display font-bold text-xl text-[#2F3A32] my-0">Quản lý bài học SGK</h3>
                <Link
                  to="/admin/dashboard/lessonCreate"
                  className="inline-flex items-center space-x-1 px-4 py-2 rounded-xl bg-[#A8D5BA] text-[#2F3A32] font-bold text-sm hover:bg-[#8ec3a2]"
                >
                  <Plus size={16} />
                  <span>Thêm bài học</span>
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="bg-[#FCFBF7] text-[#6B756D] border-b border-[#E6E4DD] font-semibold text-xs uppercase">
                      <th className="py-3 px-4 w-20">Bài số</th>
                      <th className="py-3 px-4">Tên bài học</th>
                      <th className="py-3 px-4 w-28">Học kỳ</th>
                      <th className="py-3 px-4 w-36">Slug (URL)</th>
                      <th className="py-3 px-4 w-32">Hiển thị</th>
                      <th className="py-3 px-4 w-28 text-right">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lessons.map((lesson) => (
                      <tr key={lesson.id} className="border-b border-[#E6E4DD]/65 hover:bg-[#FCFBF7]/50 transition-all">
                        <td className="py-3.5 px-4 font-bold text-[#2F3A32]">{lesson.lesson_number}</td>
                        <td className="py-3.5 px-4">
                          <Link to={`/bai-hoc/${lesson.slug}`} className="font-bold text-[#2F3A32] hover:text-[#A8D5BA] inline-flex items-center">
                            <span>{lesson.title}</span>
                            <ExternalLink size={12} className="ml-1 text-[#6B756D]" />
                          </Link>
                        </td>
                        <td className="py-3.5 px-4 text-xs font-semibold">Học kỳ {lesson.semester}</td>
                        <td className="py-3.5 px-4 font-mono text-xs text-[#6B756D]">{lesson.slug}</td>
                        <td className="py-3.5 px-4">
                          <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${
                            lesson.is_published ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-500'
                          }`}>
                            {lesson.is_published ? 'Công khai' : 'Nháp'}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex justify-end items-center space-x-2">
                            <Link
                              to={`/admin/dashboard/lessonEdit/${lesson.id}`}
                              className="p-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50"
                              title="Sửa"
                            >
                              <Edit2 size={14} />
                            </Link>
                            <button
                              onClick={() => handleDeleteLesson(lesson.id)}
                              className="p-1.5 rounded-lg border border-red-100 text-red-600 hover:bg-red-50"
                              title="Xóa"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: RESOURCES MANAGEMENT */}
          {activeTab === 'resources' && (
            <div className="bg-white border border-[#E6E4DD] rounded-2xl overflow-hidden shadow-sm space-y-4 p-5">
              <div className="flex justify-between items-center pb-3 border-b border-[#E6E4DD]/65">
                <h3 className="font-display font-bold text-xl text-[#2F3A32] my-0">Quản lý kho học liệu</h3>
                <Link
                  to="/admin/dashboard/resourceCreate"
                  className="inline-flex items-center space-x-1 px-4 py-2 rounded-xl bg-[#A8D5BA] text-[#2F3A32] font-bold text-sm hover:bg-[#8ec3a2]"
                >
                  <Plus size={16} />
                  <span>Thêm học liệu</span>
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="bg-[#FCFBF7] text-[#6B756D] border-b border-[#E6E4DD] font-semibold text-xs uppercase">
                      <th className="py-3 px-4">Bài liên kết</th>
                      <th className="py-3 px-4">Tiêu đề học liệu</th>
                      <th className="py-3 px-4">Nhóm sư phạm</th>
                      <th className="py-3 px-4">Loại tệp</th>
                      <th className="py-3 px-4 w-32">Nguồn file</th>
                      <th className="py-3 px-4 w-28 text-right">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resources.map((res) => (
                      <tr key={res.id} className="border-b border-[#E6E4DD]/65 hover:bg-[#FCFBF7]/50 transition-all">
                        <td className="py-3.5 px-4 font-semibold text-[#2F3A32] text-xs">
                          {res.lessons ? `Bài ${res.lessons.lesson_number}: ${res.lessons.title}` : 'Nháp/Chưa gắn'}
                        </td>
                        <td className="py-3.5 px-4 font-bold text-[#2F3A32] max-w-xs truncate" title={res.title}>
                          {res.title}
                        </td>
                        <td className="py-3.5 px-4 text-xs font-semibold text-[#6B756D]">
                          {getGroupName(res.resource_group)}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-semibold bg-[#FCFBF7] border border-[#E6E4DD]">
                            {getTypeName(res.resource_type)}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          {res.file_url ? (
                            <span className="text-emerald-600 text-xs font-semibold flex items-center space-x-0.5">
                              <Download size={12} />
                              <span>File Upload</span>
                            </span>
                          ) : res.external_url ? (
                            <a
                              href={res.external_url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-blue-500 text-xs font-semibold inline-flex items-center hover:underline"
                            >
                              <span>Link ngoài</span>
                              <ExternalLink size={10} className="ml-0.5" />
                            </a>
                          ) : (
                            <span className="text-gray-400 text-xs italic">Không nguồn</span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex justify-end items-center space-x-2">
                            <Link
                              to={`/admin/dashboard/resourceEdit/${res.id}`}
                              className="p-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50"
                              title="Sửa"
                            >
                              <Edit2 size={14} />
                            </Link>
                            <button
                              onClick={() => handleDeleteResource(res.id)}
                              className="p-1.5 rounded-lg border border-red-100 text-red-600 hover:bg-red-50"
                              title="Xóa"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
export default Dashboard;
