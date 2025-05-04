import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaFingerprint } from 'react-icons/fa';
import { glassmorphismStyles } from '../styles/theme';
import { useUser } from '../context/UserContext';
import { supabase } from '../lib/supabase';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const { signUp, isLoading } = useUser();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      await signUp({
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
      });
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleBiometricRegister = async () => {
    return navigate('/biometric-register');
    // try {
    //   const { data, error } = await supabase.auth.signInWithOAuth({
    //     provider: 'google',
    //     options: {
    //       redirectTo: `${window.location.origin}/dashboard`,
    //     },
    //   });

    //   if (error) throw error;
    // } catch (error: any) {
    //   toast.error(error.message);
    // }
  };

  return (
    <div style={glassmorphismStyles.container}>
      <h2 style={{ 
        color: 'white', 
        textAlign: 'center', 
        marginBottom: '2rem',
        fontSize: 'clamp(1.2rem, 3vw, 2rem)',
      }}>
        Register
      </h2>
      <form onSubmit={handleSubmit} style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '1rem',
        width: '100%',
      }}>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          style={glassmorphismStyles.input}
          required
          disabled={isLoading}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={glassmorphismStyles.input}
          required
          disabled={isLoading}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          style={glassmorphismStyles.input}
          required
          disabled={isLoading}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          style={glassmorphismStyles.input}
          required
          disabled={isLoading}
        />
        <button 
          type="submit" 
          style={{
            ...glassmorphismStyles.button,
            opacity: isLoading ? 0.7 : 1,
          }}
          disabled={isLoading}
        >
          {isLoading ? 'Registering...' : 'Register'}
        </button>
        <button
          type="button"
          onClick={handleBiometricRegister}
          style={{
            ...glassmorphismStyles.button,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            fontSize: 'clamp(0.9rem, 2vw, 1rem)',
            opacity: isLoading ? 0.7 : 1,
          }}
          disabled={isLoading}
        >
          <FaFingerprint /> Register with Biometrics
        </button>
      </form>
      <p style={{ 
        color: 'white', 
        textAlign: 'center', 
        marginTop: '1rem',
        fontSize: 'clamp(0.9rem, 2vw, 1rem)',
      }}>
        Already have an account?{' '}
        <Link to="/login" style={{ color: '#fff', textDecoration: 'underline' }}>
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register; 