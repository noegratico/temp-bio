import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaFingerprint } from 'react-icons/fa';
import { glassmorphismStyles } from '../styles/theme';
import { supabase } from '../lib/supabase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBiometricLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (error) throw error;
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div style={glassmorphismStyles.container}>
      <h2 style={{ 
        color: 'white', 
        textAlign: 'center', 
        marginBottom: '2rem',
        fontSize: 'clamp(1.2rem, 3vw, 2rem)',
      }}>
        Login
      </h2>
      <form onSubmit={handleLogin} style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '1rem',
        width: '100%',
      }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={glassmorphismStyles.input}
          required
          disabled={loading}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={glassmorphismStyles.input}
          required
          disabled={loading}
        />
        <button 
          type="submit" 
          style={{
            ...glassmorphismStyles.button,
            opacity: loading ? 0.7 : 1,
          }}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <button
          type="button"
          onClick={handleBiometricLogin}
          style={{
            ...glassmorphismStyles.button,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            fontSize: 'clamp(0.9rem, 2vw, 1rem)',
            opacity: loading ? 0.7 : 1,
          }}
          disabled={loading}
        >
          <FaFingerprint /> Login with Biometrics
        </button>
      </form>
      <p style={{ 
        color: 'white', 
        textAlign: 'center', 
        marginTop: '1rem',
        fontSize: 'clamp(0.9rem, 2vw, 1rem)',
      }}>
        Don't have an account?{' '}
        <Link to="/register" style={{ color: '#fff', textDecoration: 'underline' }}>
          Register
        </Link>
      </p>
      <p style={{ 
        color: 'white', 
        textAlign: 'center', 
        marginTop: '0.5rem',
        fontSize: 'clamp(0.9rem, 2vw, 1rem)',
      }}>
        <Link to="/biometric-register" style={{ color: '#fff', textDecoration: 'underline' }}>
          Register Biometrics
        </Link>
      </p>
    </div>
  );
};

export default Login; 