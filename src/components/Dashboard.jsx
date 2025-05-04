import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { supabase } from '../lib/supabase';
import { glassmorphismStyles } from '../styles/theme';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) throw error;
        setUser(user);
      } catch (error) {
        toast.error('Error fetching user data');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (loading) {
    return (
      <div style={glassmorphismStyles.container}>
        <h2 style={{ color: 'white', textAlign: 'center' }}>Loading...</h2>
      </div>
    );
  }

  return (
    <div style={glassmorphismStyles.container}>
      <h2 style={{ 
        color: 'white', 
        textAlign: 'center', 
        marginBottom: '2rem',
        fontSize: 'clamp(1.2rem, 3vw, 2rem)',
      }}>
        Welcome, {user?.user_metadata?.full_name || 'User'}!
      </h2>
      <div style={{ 
        color: 'white', 
        marginBottom: '2rem',
        fontSize: 'clamp(0.9rem, 2vw, 1rem)',
      }}>
        <p>Email: {user?.email}</p>
        <p>Last Sign In: {new Date(user?.last_sign_in_at).toLocaleString()}</p>
      </div>
      <button
        onClick={handleLogout}
        style={glassmorphismStyles.button}
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard; 