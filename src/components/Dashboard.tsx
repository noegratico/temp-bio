import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaSignOutAlt, FaUserCircle, FaClock } from 'react-icons/fa';
import { glassmorphismStyles } from '../styles/theme';
import { useUser } from '../context/UserContext';

const Dashboard = () => {
  const { user, isLoading, signOut } = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  if (isLoading) {
    return (
      <div style={glassmorphismStyles.container}>
        <h2 style={{ 
          color: 'white', 
          textAlign: 'center',
          fontSize: 'clamp(1.2rem, 3vw, 2rem)',
        }}>
          Loading...
        </h2>
      </div>
    );
  }

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div style={glassmorphismStyles.container}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
      }}>
        <h2 style={{ 
          color: 'white', 
          fontSize: 'clamp(1.2rem, 3vw, 2rem)',
        }}>
          Welcome, {user.user_metadata?.full_name || 'User'}!
        </h2>
        <button
          onClick={handleLogout}
          style={{
            ...glassmorphismStyles.button,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
          }}
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>

      <div style={{
        ...glassmorphismStyles.container,
        padding: '2rem',
        marginBottom: '2rem',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}>
          <FaUserCircle style={{ 
            fontSize: '2.5rem', 
            color: 'white',
          }} />
          <div>
            <h3 style={{ 
              color: 'white', 
              margin: 0,
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            }}>
              {user.user_metadata?.full_name || 'User'}
            </h3>
            <p style={{ 
              color: 'rgba(255, 255, 255, 0.8)', 
              margin: 0,
              fontSize: 'clamp(0.9rem, 2vw, 1rem)',
            }}>
              {user.email}
            </p>
          </div>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          color: 'white',
        }}>
          <FaClock style={{ 
            fontSize: '1.5rem', 
            color: 'rgba(255, 255, 255, 0.8)',
          }} />
          <p style={{ 
            margin: 0,
            fontSize: 'clamp(0.9rem, 2vw, 1rem)',
          }}>
            Last Sign In: {user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString() : 'Never'}
          </p>
        </div>
      </div>

      <div style={{
        ...glassmorphismStyles.container,
        padding: '2rem',
      }}>
        <h3 style={{ 
          color: 'white', 
          marginBottom: '1rem',
          fontSize: 'clamp(1rem, 2vw, 1.2rem)',
        }}>
          Account Security
        </h3>
        <p style={{ 
          color: 'rgba(255, 255, 255, 0.8)',
          fontSize: 'clamp(0.9rem, 2vw, 1rem)',
        }}>
          Your account is secured with {user.app_metadata?.provider === 'google' ? 'Google OAuth' : 'email/password'} authentication.
        </p>
      </div>
    </div>
  );
};

export default Dashboard; 