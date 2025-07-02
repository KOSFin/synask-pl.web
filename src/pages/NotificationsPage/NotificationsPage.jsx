// NotificationsPage.jsx
import React, { useState } from 'react';
import { requestFcmToken } from '../../utils/fcm'; // импортируй свою функцию получения токена

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    padding: '20px',
    backgroundColor: '#0e0e0e',
    color: '#fff',
    fontFamily: 'sans-serif',
    textAlign: 'center',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
  description: {
    fontSize: '16px',
    maxWidth: '400px',
    opacity: 0.8,
  },
  button: {
    marginTop: '20px',
    padding: '10px 24px',
    fontSize: '16px',
    backgroundColor: '#4caf50',
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#45a049',
  },
  success: {
    color: '#4caf50',
    fontWeight: 'bold',
  },
};

const NotificationsPage = () => {
  const [status, setStatus] = useState(null);
  const [hover, setHover] = useState(false);

  const handleEnableNotifications = async () => {
    const token = await requestFcmToken();
    if (token) {
      setStatus('success');
    } else {
      setStatus('denied');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.title}>Разрешите уведомления</div>
      <div style={styles.description}>
        Чтобы получать уведомления о новых сообщениях, подписках и других событиях — включите уведомления.
      </div>

      {status === 'success' ? (
        <div style={styles.success}>Уведомления включены ✅</div>
      ) : (
        <button
          style={{
            ...styles.button,
            ...(hover ? styles.buttonHover : {}),
          }}
          onClick={handleEnableNotifications}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          Включить уведомления
        </button>
      )}

      {status === 'denied' && (
        <div style={{ color: '#f44336' }}>Вы запретили уведомления. Измените настройки браузера, чтобы включить их снова.</div>
      )}
    </div>
  );
};

export default NotificationsPage;
