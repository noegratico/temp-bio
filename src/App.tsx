import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login';
import Register from './components/Register';
import BiometricRegister from './components/BiometricRegister';
import Dashboard from './components/Dashboard';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserProvider } from './context/UserContext';

function App() {
  const queryClient = new QueryClient();
  
  return (

    <div className="app" style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      width: '100vw',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>

<BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
        <Routes>
          <Route path="/" element={ <Dashboard /> } />
          <Route path="/login" element={ <Login /> } />
          <Route path="/register" element={ <Register /> } />
          <Route path="/biometric-register" element={ <BiometricRegister />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        </UserProvider>
      </QueryClientProvider>
    </BrowserRouter>
      </div>
      <ToastContainer 
        position="top-right" 
        autoClose={3000}
      />
    </div>
  );
}

export default App;
