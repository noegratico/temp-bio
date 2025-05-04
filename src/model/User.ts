import { supabase } from '../lib/supabase';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { Database } from '../supabase/types';

export type User = Database['public']['Tables']['users']['Row'];

export interface SignUpData {
  email: string;
  password: string;
  fullName: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export const UserService = {
  getSession: async () => {
    console.log('[UserService] Getting session...');
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.error('[UserService] Session error:', error);
      throw error;
    }
    console.log('[UserService] Session data:', data);
    return data;
  },

  signUp: async ({ email, password, fullName }: SignUpData) => {
    console.log('[UserService] Signing up user:', { email, fullName });
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      console.error('[UserService] Sign up error:', error);
      throw error;
    }

    if (data.user) {
      console.log('[UserService] Creating user record in database...');
      const { error: dbError } = await supabase
        .from('users')
        .insert(
          {
            id: data.user.id,
            email: data.user.email,
            username: fullName,
          },
        );

      if (dbError) {
        console.error('[UserService] Error creating user record:', dbError);
        throw dbError;
      }
      console.log('[UserService] User record created successfully');
    }

    console.log('[UserService] Sign up successful:', data);
    return data;
  },

  signIn: async ({ email, password }: SignInData) => {
    console.log('[UserService] Signing in user:', { email });
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error('[UserService] Sign in error:', error);
      throw error;
    }
    console.log('[UserService] Sign in successful:', data);
    return data;
  },

  signOut: async () => {
    console.log('[UserService] Signing out...');
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('[UserService] Sign out error:', error);
      throw error;
    }
    console.log('[UserService] Sign out successful');
  },

  getUserData: async (userId: string) => {
    console.log('[UserService] Getting user data for:', userId);
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) {
      console.error('[UserService] Get user data error:', error);
      throw error;
    }
    console.log('[UserService] User data retrieved:', data);
    return data;
  },

  updateUserData: async (userId: string, data: Partial<User>) => {
    console.log('[UserService] Updating user data:', { userId, data });
    const { data: updatedData, error } = await supabase
      .from('profiles')
      .update(data)
      .eq('id', userId)
      .select()
      .single();
    
    if (error) {
      console.error('[UserService] Update user data error:', error);
      throw error;
    }
    console.log('[UserService] User data updated:', updatedData);
    return updatedData;
  },

  onAuthStateChange: (callback: (event: any, session: any) => void) => {
    console.log('[UserService] Setting up auth state change listener');
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('[UserService] Auth state changed:', { event, session });
      callback(event, session);
    });
    return { data: { subscription } };
  },
};
