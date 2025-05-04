import { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { User, UserService, SignUpData, SignInData } from '../model/User';
import { User as SupabaseUser, Session } from '@supabase/supabase-js';

interface UserContextType {
  user: SupabaseUser | null;
  userData: User | null;
  isLoading: boolean;
  signUp: (data: SignUpData) => Promise<{ user: SupabaseUser | null; session: Session | null }>;
  signIn: (data: SignInData) => Promise<{ user: SupabaseUser | null; session: Session | null }>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<User>;
  isAuthenticated: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [userData, setUserData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state
  useEffect(() => {
    console.log('[UserContext] Initializing auth state...');
    const initializeAuth = async () => {
      try {
        const { session } = await UserService.getSession();
        console.log('[UserContext] Initial session:', session);
        if (session?.user) {
          setUser(session.user);
          try {
            const profile = await UserService.getUserData(session.user.id);
            console.log('[UserContext] Initial profile:', profile);
            setUserData(profile);
          } catch (error) {
            console.error('[UserContext] Error fetching profile:', error);
          }
        }
      } catch (error) {
        console.error('[UserContext] Error initializing auth:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Auth state change subscription
  useEffect(() => {
    console.log('[UserContext] Setting up auth state change listener');
    const { data: { subscription } } = UserService.onAuthStateChange(async (event, session) => {
      console.log('[UserContext] Auth state changed:', { event, session });
      if (session?.user) {
        setUser(session.user);
        try {
          const profile = await UserService.getUserData(session.user.id);
          console.log('[UserContext] Profile updated:', profile);
          setUserData(profile);
        } catch (error) {
          console.error('[UserContext] Error fetching profile:', error);
        }
      } else {
        setUser(null);
        setUserData(null);
      }
    });

    return () => {
      console.log('[UserContext] Cleaning up auth state change listener');
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (data: SignUpData) => {
    console.log('[UserContext] Signing up...');
    try {
      const result = await UserService.signUp(data);
      console.log('[UserContext] Sign up successful:', result);
      toast.success('Registration successful! Please check your email for verification.');
      navigate('/');
      return result;
    } catch (error: any) {
      console.error('[UserContext] Sign up error:', error);
      toast.error(error.message);
      throw error;
    }
  };

  const signIn = async (data: SignInData) => {
    console.log('[UserContext] Signing in...');
    try {
      const result = await UserService.signIn(data);
      console.log('[UserContext] Sign in successful:', result);
      toast.success('Login successful!');
      navigate('/dashboard');
      return result;
    } catch (error: any) {
      console.error('[UserContext] Sign in error:', error);
      toast.error(error.message);
      throw error;
    }
  };

  const signOut = async () => {
    console.log('[UserContext] Signing out...');
    try {
      await UserService.signOut();
      console.log('[UserContext] Sign out successful');
      setUser(null);
      setUserData(null);
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error: any) {
      console.error('[UserContext] Sign out error:', error);
      toast.error(error.message);
      throw error;
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    console.log('[UserContext] Updating profile...');
    if (!user?.id) throw new Error('No user ID available');
    try {
      const updatedProfile = await UserService.updateUserData(user.id, data);
      console.log('[UserContext] Profile updated:', updatedProfile);
      setUserData(updatedProfile);
      toast.success('Profile updated successfully');
      return updatedProfile;
    } catch (error: any) {
      console.error('[UserContext] Profile update error:', error);
      toast.error(error.message);
      throw error;
    }
  };

  const value = {
    user,
    userData,
    isLoading,
    signUp,
    signIn,
    signOut,
    updateProfile,
    isAuthenticated: !!user,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}; 