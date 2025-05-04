export const glassmorphismStyles = {
  container: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '16px',
    padding: '2rem',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
    margin: '0 auto',
    '@media (maxWidth: 480px)': {
      padding: '1.5rem',
      margin: '1rem',
    },
  },
  input: {
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '8px',
    padding: '0.8rem',
    color: 'white',
    width: '100%',
    fontSize: '1rem',
    '&:focus': {
      outline: 'none',
      borderColor: 'rgba(255, 255, 255, 0.4)',
    },
    '@media (maxWidth: 480px)': {
      padding: '0.6rem',
      fontSize: '0.9rem',
    },
  },
  button: {
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '8px',
    padding: '0.8rem 1.5rem',
    color: 'white',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    width: '100%',
    fontSize: '1rem',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.2)',
    },
    '@media (maxWidth: 480px)': {
      padding: '0.6rem 1.2rem',
      fontSize: '0.9rem',
    },
  },
}; 