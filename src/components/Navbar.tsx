import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, LogOut, LayoutDashboard } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { profile, logout, isAdmin } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const isActive = (path: string) => {
    return location.pathname === path ? 'text-[#2F3A32] font-semibold border-b-2 border-[#A8D5BA]' : 'text-[#6B756D] hover:text-[#2F3A32]';
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#FCFBF7]/85 backdrop-blur-md border-b border-[#E6E4DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex items-center w-[250px] justify-start shrink-0">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-3xl">🌱</span>
              <span className="font-display text-lg sm:text-xl font-bold text-[#2F3A32] tracking-wide flex flex-col leading-tight">
                <span>Truyện mở ra</span>
                <span className="text-xs sm:text-sm text-[#F6B26B] font-semibold">Điều hay nở hoa</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center flex-1 space-x-8">
            <Link to="/" className={`py-2 text-base transition-colors ${isActive('/')}`}>
              Trang chủ
            </Link>
            <Link to="/van-hoc-lop-4" className={`py-2 text-base transition-colors ${isActive('/van-hoc-lop-4')}`}>
              Văn học lớp 4
            </Link>
            <Link to="/kho-tai-nguyen" className={`py-2 text-base transition-colors ${isActive('/kho-tai-nguyen')}`}>
              Kho tài nguyên
            </Link>
            <Link to="/gioi-thieu" className={`py-2 text-base transition-colors ${isActive('/gioi-thieu')}`}>
              Giới thiệu
            </Link>
          </div>

          {/* Auth & Actions */}
          <div className="hidden md:flex items-center justify-end w-[250px] shrink-0">
            {profile ? (
              <div className="flex items-center space-x-4 border-l border-[#E6E4DD] pl-4">
                <div className="flex items-center space-x-2">
                  {profile.avatar_url ? (
                    <img
                      src={profile.avatar_url}
                      alt={profile.full_name || ''}
                      className="w-8 h-8 rounded-full border-2 border-[#A8D5BA]"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-[#DFF3E3] text-[#2F3A32] flex items-center justify-center border-2 border-[#A8D5BA] font-bold text-xs">
                      {profile.full_name?.charAt(0).toUpperCase() || 'A'}
                    </div>
                  )}
                  <span className="text-sm font-medium text-[#2F3A32] max-w-[100px] truncate">
                    {profile.full_name}
                  </span>
                </div>
                
                {isAdmin && (
                  <Link
                    to="/admin/dashboard"
                    className="flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#DFF3E3] text-[#2F3A32] hover:bg-[#A8D5BA] transition-all"
                  >
                    <LayoutDashboard size={14} />
                    <span>Dashboard</span>
                  </Link>
                )}
                
                <button
                  onClick={logout}
                  className="p-1.5 text-[#6B756D] hover:text-red-500 rounded-full hover:bg-red-50 transition-all"
                  title="Đăng xuất"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : null}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="text-[#2F3A32] hover:text-[#A8D5BA] p-2 focus:outline-none"
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-[#E6E4DD] bg-[#FCFBF7] px-4 pt-2 pb-4 space-y-1 shadow-inner">
          <Link
            to="/"
            onClick={toggleMenu}
            className={`block px-3 py-2 rounded-md text-base font-medium ${location.pathname === '/' ? 'bg-[#DFF3E3] text-[#2F3A32]' : 'text-[#6B756D]'}`}
          >
            Trang chủ
          </Link>
          <Link
            to="/van-hoc-lop-4"
            onClick={toggleMenu}
            className={`block px-3 py-2 rounded-md text-base font-medium ${location.pathname === '/van-hoc-lop-4' ? 'bg-[#DFF3E3] text-[#2F3A32]' : 'text-[#6B756D]'}`}
          >
            Văn học lớp 4
          </Link>
          <Link
            to="/kho-tai-nguyen"
            onClick={toggleMenu}
            className={`block px-3 py-2 rounded-md text-base font-medium ${location.pathname === '/kho-tai-nguyen' ? 'bg-[#DFF3E3] text-[#2F3A32]' : 'text-[#6B756D]'}`}
          >
            Kho tài nguyên
          </Link>
          <Link
            to="/gioi-thieu"
            onClick={toggleMenu}
            className={`block px-3 py-2 rounded-md text-base font-medium ${location.pathname === '/gioi-thieu' ? 'bg-[#DFF3E3] text-[#2F3A32]' : 'text-[#6B756D]'}`}
          >
            Giới thiệu
          </Link>
          
          {profile && (
            <div className="border-t border-[#E6E4DD] pt-4 mt-2">
              <div className="space-y-2">
                <div className="flex items-center space-x-3 px-3 py-1">
                  {profile.avatar_url ? (
                    <img
                      src={profile.avatar_url}
                      alt={profile.full_name || ''}
                      className="w-10 h-10 rounded-full border-2 border-[#A8D5BA]"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[#DFF3E3] text-[#2F3A32] flex items-center justify-center border-2 border-[#A8D5BA] font-bold text-sm">
                      {profile.full_name?.charAt(0).toUpperCase() || 'A'}
                    </div>
                  )}
                  <div>
                    <div className="text-base font-semibold text-[#2F3A32]">{profile.full_name}</div>
                    <div className="text-xs text-[#6B756D]">{profile.email}</div>
                  </div>
                </div>
                {isAdmin && (
                  <Link
                    to="/admin/dashboard"
                    onClick={toggleMenu}
                    className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-[#2F3A32] hover:bg-[#DFF3E3]"
                  >
                    <LayoutDashboard size={18} />
                    <span>Quản lý học liệu</span>
                  </Link>
                )}
                <button
                  onClick={() => {
                    logout();
                    toggleMenu();
                  }}
                  className="flex w-full items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                >
                  <LogOut size={18} />
                  <span>Đăng xuất</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};
export default Navbar;
