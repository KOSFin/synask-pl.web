const styles = {
    page: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#f0f2f5',
      fontFamily: 'system-ui, sans-serif',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
      padding: '40px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      width: '100%',
      maxWidth: '400px',
    },
    title: {
      margin: '0 0 20px 0',
      textAlign: 'center',
      color: '#1c1e21',
      fontSize: '28px',
    },
    input: {
      padding: '14px',
      borderRadius: '6px',
      border: '1px solid #dddfe2',
      fontSize: '16px',
      outline: 'none',
    },
    button: {
      padding: '14px',
      borderRadius: '6px',
      border: 'none',
      backgroundColor: '#1877f2',
      color: 'white',
      fontSize: '18px',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
    },
    buttonLoading: {
      backgroundColor: '#8b9dc3',
      cursor: 'not-allowed',
    },
    errorText: {
      color: '#fa383e',
      textAlign: 'center',
      margin: '0',
      fontSize: '14px',
    },
  };
  
  export default styles;