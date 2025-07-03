import React, { useEffect, useState } from 'react';
import { refreshFcmToken, getSavedFcmToken } from '../../utils/fcm';

const NotificationsPage = () => {
  const [token, setToken] = useState(null);
  const [status, setStatus] = useState(Notification.permission);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (Notification.permission === 'granted') {
      refreshFcmToken().then((t) => {
        if (t) {
          setToken(t);
          setStatus('granted');
        }
      });
    }
  }, []);

  const handleEnableNotifications = async () => {
    const newToken = await refreshFcmToken();
    if (newToken) {
      setToken(newToken);
      setStatus('granted');
    } else {
      setStatus('denied');
    }
  };

  const handleCopy = async () => {
    if (!token) return;
    try {
      await navigator.clipboard.writeText(token);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      alert('Не удалось скопировать токен');
    }
  };

  return (
    <div style={{
      padding: 20,
      textAlign: 'center',
      color: '#fff',
      background: '#0e0e0e',
      minHeight: '100vh'
    }}>
      <h2>Уведомления</h2>
      {status === 'granted' && token ? (
        <>
          <p style={{ wordBreak: 'break-word', fontSize: 14 }}>
            <b>Ваш FCM токен:</b><br />{token}
          </p>
          <button onClick={handleCopy} style={{ marginTop: 10, padding: '10px 20px' }}>
            {copied ? 'Скопировано ✅' : 'Скопировать токен'}
          </button>
        </>
      ) : (
        <>
          <p>Разрешите уведомления, чтобы получать сообщения и новости.</p>
          <button onClick={handleEnableNotifications} style={{ padding: '10px 20px' }}>
            Включить уведомления
          </button>
          {status === 'denied' && (
            <p style={{ color: 'red' }}>Вы запретили уведомления. Измените настройки браузера, чтобы включить их снова.</p>
          )}
        </>
      )}
    </div>
  );
};

export default NotificationsPage;
