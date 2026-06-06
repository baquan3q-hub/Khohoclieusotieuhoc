import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { isSupabaseConfigured } from '../../lib/supabase';
import { ShieldAlert, ArrowLeft, AlertCircle, Play, Mail, Lock } from 'lucide-react';

export const Login: React.FC = () => {
  const { user, isAdmin, loginWithGoogle, loginWithEmail, loginMockAdmin, loading } = useAuth();
  const [email, setEmail] = useState('baquan3q@gmail.com');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // If user is already logged in as Admin, redirect straight to dashboard
    if (user && isAdmin) {
      navigate('/admin/dashboard');
    } else if (user && !isAdmin) {
      setErrorMsg('Tài khoản của bạn không có quyền Admin trong hệ thống. Vui lòng liên hệ quản trị viên.');
    }
  }, [user, isAdmin, navigate]);

  const handleGoogleLogin = async () => {
    setErrorMsg(null);
    setAuthLoading(true);
    try {
      await loginWithGoogle();
    } catch (err: any) {
      console.error('Login error:', err);
      setErrorMsg(err.message || 'Đã xảy ra lỗi khi đăng nhập bằng Google OAuth.');
      setAuthLoading(false);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Vui lòng nhập đầy đủ Email và Mật khẩu.');
      return;
    }
    setErrorMsg(null);
    setAuthLoading(true);
    try {
      await loginWithEmail(email, password);
      navigate('/admin/dashboard');
    } catch (err: any) {
      console.error('Email login error:', err);
      let msg = err.message || 'Lỗi đăng nhập.';
      if (err.message === 'Invalid login credentials' || err.status === 400) {
        msg = 'Email hoặc mật khẩu không chính xác. Quý khách vui lòng kiểm tra lại.';
      } else if (err.message?.includes('provider is not enabled')) {
        msg = 'Phương thức đăng nhập này chưa được kích hoạt.';
      }
      setErrorMsg(msg);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleMockLogin = () => {
    setErrorMsg(null);
    setAuthLoading(true);
    try {
      loginMockAdmin();
      navigate('/admin/dashboard');
    } catch (err: any) {
      setErrorMsg('Lỗi khi đăng nhập bằng tài khoản thử nghiệm.');
    } finally {
      setAuthLoading(false);
    }
  };

  const hasSupabase = isSupabaseConfigured();

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full bg-white border border-[#E6E4DD] rounded-3xl p-8 shadow-md space-y-6">
        {/* Lock Sprout Icon */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-full bg-[#FFF6DA] border border-[#F6B26B]/50 flex items-center justify-center mx-auto text-3xl">
            🔐
          </div>
          <h2 className="font-display font-bold text-2xl text-[#2F3A32]">Đăng nhập Admin</h2>
          <p className="text-sm text-[#6B756D]">
            Hệ thống quản lý nội dung học liệu số Ngữ văn lớp 4.
          </p>
        </div>

        {/* Info panel */}
        <div className="bg-[#DFF3E3]/50 border border-[#A8D5BA]/70 rounded-2xl p-4 text-xs text-[#2F3A32] space-y-2 leading-relaxed">
          <div className="flex items-center space-x-1 font-bold text-emerald-800">
            <AlertCircle size={14} />
            <span>Thông tin tài khoản Admin:</span>
          </div>
          <p>
            • Email admin mặc định: <strong className="font-semibold text-emerald-950">baquan3q@gmail.com</strong>
          </p>
          <p className="text-[#6B756D]">
            * Bạn có thể tự tạo tài khoản này trong Supabase console (Authentication &gt; Users) để đăng nhập bảo mật bằng Email/Mật khẩu hoặc chọn Bypass bên dưới để dùng cục bộ.
          </p>
        </div>

        {/* Error panel */}
        {errorMsg && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-xs text-red-700 flex items-start space-x-2">
            <ShieldAlert size={16} className="text-red-500 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Credentials Form */}
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#2F3A32] uppercase tracking-wider mb-1.5">Email Quản trị</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="baquan3q@gmail.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E6E4DD] focus:border-[#A8D5BA] focus:outline-none text-sm transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#2F3A32] uppercase tracking-wider mb-1.5">Mật khẩu</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E6E4DD] focus:border-[#A8D5BA] focus:outline-none text-sm transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={authLoading || loading}
            className="w-full py-3 px-4 rounded-xl bg-[#A8D5BA] text-[#2F3A32] text-sm font-bold hover:bg-[#8ec3a2] active:scale-98 transition-all disabled:opacity-50 cursor-pointer"
          >
            {authLoading ? 'Đang xác thực...' : 'Đăng nhập'}
          </button>
        </form>

        {/* Separator */}
        <div className="relative flex items-center justify-center my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#E6E4DD]"></div>
          </div>
          <span className="relative bg-white px-3 text-xs text-[#6B756D] uppercase tracking-wider">hoặc các tuỳ chọn khác</span>
        </div>

        {/* Action buttons */}
        <div className="space-y-3">
          {hasSupabase && (
            <button
              onClick={handleGoogleLogin}
              disabled={authLoading || loading}
              className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl border border-[#E6E4DD] text-xs font-bold text-gray-700 hover:bg-gray-50 active:scale-98 transition-all disabled:opacity-50 cursor-pointer"
            >
              <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span>Đăng nhập bằng Google</span>
            </button>
          )}

          <button
            onClick={handleMockLogin}
            disabled={authLoading}
            className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl bg-orange-50 border border-orange-200 text-orange-800 text-xs font-bold hover:bg-orange-100 active:scale-98 transition-all cursor-pointer"
            title="Sử dụng local storage để chỉnh sửa học liệu không cần kết nối tài khoản"
          >
            <Play size={14} className="text-orange-700" />
            <span>Đăng nhập nhanh Demo (Bypass OAuth)</span>
          </button>
        </div>

        {/* Back Link */}
        <div className="text-center pt-2">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center space-x-1 text-xs font-semibold text-[#6B756D] hover:text-[#2F3A32] transition-colors"
          >
            <ArrowLeft size={12} />
            <span>Quay về trang chủ</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default Login;
