import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#2F3A32] text-[#FCFBF7] mt-auto border-t border-emerald-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Column */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-3xl">🌱</span>
              <span className="font-display text-2xl font-bold tracking-wide text-white">
                Truyện mở ra
              </span>
            </div>
            <p className="text-[#A8D5BA] font-display text-lg italic">
              “Truyện mở ra – Điều hay nở hoa”
            </p>
            <p className="text-sm text-[#FCFBF7]/70 leading-relaxed">
              Thư viện số lưu trữ tài nguyên và gợi ý phương pháp tổ chức dạy học đọc hiểu văn bản truyện dành cho giáo viên và sinh viên sư phạm tiểu học lớp 4.
            </p>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="font-display text-lg font-bold text-white mb-4">Liên kết chính</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-[#FCFBF7]/70 hover:text-[#A8D5BA] transition-colors">Trang chủ</Link>
              </li>
              <li>
                <Link to="/van-hoc-lop-4" className="text-[#FCFBF7]/70 hover:text-[#A8D5BA] transition-colors">Văn học lớp 4</Link>
              </li>
              <li>
                <Link to="/kho-tai-nguyen" className="text-[#FCFBF7]/70 hover:text-[#A8D5BA] transition-colors">Kho tài nguyên</Link>
              </li>
              <li>
                <Link to="/gioi-thieu" className="text-[#FCFBF7]/70 hover:text-[#A8D5BA] transition-colors">Giới thiệu</Link>
              </li>
            </ul>
          </div>

          {/* Core Principles Column */}
          <div>
            <h3 className="font-display text-lg font-bold text-white mb-4">Tôn chỉ sư phạm</h3>
            <ul className="space-y-2.5 text-sm text-[#FCFBF7]/70">
              <li className="flex items-start">
                <span className="text-[#A8D5BA] mr-2">✦</span>
                Bài học SGK làm trung tâm khai thác.
              </li>
              <li className="flex items-start">
                <span className="text-[#A8D5BA] mr-2">✦</span>
                Tích hợp công nghệ nâng cao kỹ năng đọc hiểu.
              </li>
              <li className="flex items-start">
                <span className="text-[#A8D5BA] mr-2">✦</span>
                Hỗ trợ giáo viên tối ưu thời gian lên lớp.
              </li>
              <li className="flex items-start">
                <span className="text-[#A8D5BA] mr-2">✦</span>
                Không thay thế vai trò hướng dẫn trực tiếp.
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#FCFBF7]/10 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-[#FCFBF7]/50">
          <p>© {new Date().getFullYear()} Truyện mở ra – Điều hay nở hoa. Thiết kế dành cho Giáo dục tiểu học.</p>
          <div className="mt-4 sm:mt-0 flex space-x-4">
            <span className="text-gray-400">Không phải hệ thống LMS quản lý học sinh</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
