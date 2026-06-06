import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { Profile } from '../types';

interface AuthContextType {
  user: any | null;
  profile: Profile | null;
  loading: boolean;
  isAdmin: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  loginMockAdmin: () => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  // Check and fetch profile from DB or localStorage
  const fetchProfile = async (userId: string, email: string): Promise<Profile | null> => {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single();

        if (!error && data) {
          return data as Profile;
        }
      } catch (err) {
        console.error('Error fetching profile from Supabase:', err);
      }
    }

    // Fallback to local profile (check if email is admin)
    const isAdminEmail = email === 'baquan3q@gmail.com';
    return {
      id: userId,
      email,
      full_name: email.split('@')[0],
      avatar_url: `https://api.dicebear.com/7.x/adventurer/svg?seed=${email}`,
      role: isAdminEmail ? 'admin' : 'guest',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  };

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      // Offline mode check
      const mockSession = localStorage.getItem('mock_session');
      if (mockSession) {
        const parsed = JSON.parse(mockSession);
        setUser(parsed.user);
        setProfile(parsed.profile);
      }
      setLoading(false);
      return;
    }

    // 1. Get initial session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        const userProfile = await fetchProfile(session.user.id, session.user.email || '');
        setProfile(userProfile);
      }
      setLoading(false);
    });

    // 2. Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setLoading(true);
      if (session?.user) {
        setUser(session.user);
        const userProfile = await fetchProfile(session.user.id, session.user.email || '');
        setProfile(userProfile);
      } else {
        setUser(null);
        setProfile(null);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const loginWithGoogle = async () => {
    if (isSupabaseConfigured()) {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        },
      });
      if (error) throw error;
    } else {
      // Mock login directly
      loginMockAdmin();
    }
  };

  const loginWithEmail = async (email: string, password: string) => {
    if (isSupabaseConfigured()) {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
    } else {
      // If Supabase is not configured, fall back to mock admin if matching baquan3q@gmail.com
      if (email === 'baquan3q@gmail.com') {
        loginMockAdmin();
      } else {
        throw new Error('Chưa cấu hình Supabase. Vui lòng đăng nhập với tài khoản baquan3q@gmail.com.');
      }
    }
  };

  const loginMockAdmin = () => {
    const mockUser = {
      id: 'mock-admin-id',
      email: 'baquan3q@gmail.com',
      user_metadata: {
        full_name: 'Quân Admin Demo',
        avatar_url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=baquan3q',
      },
    };
    const mockProfile: Profile = {
      id: mockUser.id,
      email: mockUser.email,
      full_name: 'Quân Admin Demo',
      avatar_url: mockUser.user_metadata.avatar_url,
      role: 'admin',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    setUser(mockUser);
    setProfile(mockProfile);
    localStorage.setItem('mock_session', JSON.stringify({ user: mockUser, profile: mockProfile }));
  };

  const logout = async () => {
    if (isSupabaseConfigured()) {
      await supabase.auth.signOut();
    }
    setUser(null);
    setProfile(null);
    localStorage.removeItem('mock_session');
  };

  const isAdmin = profile?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        isAdmin,
        loginWithGoogle,
        loginWithEmail,
        loginMockAdmin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
