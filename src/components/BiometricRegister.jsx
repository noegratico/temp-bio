import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaFingerprint } from 'react-icons/fa';
import { glassmorphismStyles } from '../styles/theme';

const BiometricRegister = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const handleStartRegistration = () => {
    setIsRegistering(true);
    toast.info('Please place your finger on the sensor');
    // Simulated biometric registration process
    setTimeout(() => {
      toast.success('Biometric registration successful!');
      setIsRegistering(false);
      navigate('/');
    }, 3000);
  };

  return (
    <div style={glassmorphismStyles.container}>
      <h2 style={{ 
        color: 'white', 
        textAlign: 'center', 
        marginBottom: '2rem',
        fontSize: 'clamp(1.2rem, 3vw, 2rem)',
      }}>
        Register Biometrics
      </h2>
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '2rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <FaFingerprint 
          size="clamp(48px, 10vw, 64px)" 
          color="white" 
          style={{
            transition: 'transform 0.3s ease',
            transform: isRegistering ? 'scale(1.1)' : 'scale(1)',
          }}
        />
      </div>
      <p style={{ 
        color: 'white', 
        textAlign: 'center', 
        marginBottom: '2rem',
        fontSize: 'clamp(0.9rem, 2vw, 1rem)',
        padding: '0 1rem',
      }}>
        {isRegistering
          ? 'Please place your finger on the sensor...'
          : 'Click the button below to start biometric registration'}
      </p>
      <button
        onClick={handleStartRegistration}
        disabled={isRegistering}
        style={{
          ...glassmorphismStyles.button,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          opacity: isRegistering ? 0.7 : 1,
          fontSize: 'clamp(0.9rem, 2vw, 1rem)',
        }}
      >
        <FaFingerprint /> {isRegistering ? 'Registering...' : 'Start Registration'}
      </button>
      <p style={{ 
        color: 'white', 
        textAlign: 'center', 
        marginTop: '1rem',
        fontSize: 'clamp(0.9rem, 2vw, 1rem)',
      }}>
        <Link to="/" style={{ color: '#fff', textDecoration: 'underline' }}>
          Back to Login
        </Link>
      </p>
    </div>
  );
};

export default BiometricRegister; 