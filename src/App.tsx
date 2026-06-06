import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Public pages
import { Home } from './pages/Home';
import { Lessons } from './pages/Lessons';
import { LessonDetail } from './pages/LessonDetail';
import { Resources } from './pages/Resources';
import { About } from './pages/About';

// Admin pages
import { Login } from './pages/admin/Login';
import { Dashboard } from './pages/admin/Dashboard';
import { LessonCreateEdit } from './pages/admin/LessonCreateEdit';
import { ResourceCreateEdit } from './pages/admin/ResourceCreateEdit';

// Protected Route wrapper
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FCFBF7]">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-[#A8D5BA] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-[#6B756D] font-medium">Đang kiểm tra phân quyền Admin...</p>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-[#FCFBF7]">
          {/* Main Navigation Header */}
          <Navbar />
          
          {/* Primary View Area */}
          <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/van-hoc-lop-4" element={<Lessons />} />
              <Route path="/bai-hoc/:slug" element={<LessonDetail />} />
              <Route path="/kho-tai-nguyen" element={<Resources />} />
              <Route path="/gioi-thieu" element={<About />} />
              
              {/* Admin Login Route */}
              <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="/admin/login" element={<Login />} />
              
              {/* Admin Dashboard Protected Routes */}
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/dashboard/lessonCreate"
                element={
                  <ProtectedRoute>
                    <LessonCreateEdit />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/dashboard/lessonEdit/:id"
                element={
                  <ProtectedRoute>
                    <LessonCreateEdit />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/dashboard/resourceCreate"
                element={
                  <ProtectedRoute>
                    <ResourceCreateEdit />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/dashboard/resourceEdit/:id"
                element={
                  <ProtectedRoute>
                    <ResourceCreateEdit />
                  </ProtectedRoute>
                }
              />

              {/* Wildcard Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Footer Area */}
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
