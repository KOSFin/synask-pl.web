import React, { useState, useEffect, CSSProperties } from 'react';
import { supabase } from '../../utils/supabaseUtils'; // Убедись, что путь верный

// --- Стили для компонента ---
const styles = {
  page: { display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#f0f2f5' },
  form: { padding: '40px', background: 'white', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px', textAlign: 'center' },
  title: { marginBottom: '24px', color: '#1f2937' },
  input: { width: '100%', padding: '12px', marginBottom: '16px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '16px' },
  button: { width: '100%', padding: '12px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', fontSize: '16px', cursor: 'pointer', transition: 'background 0.2s' },
  buttonLoading: { background: '#93c5fd', cursor: 'not-allowed' },
  errorText: { color: '#ef4444', marginTop: '16px' },
  geoPrompt: { background: '#eff6ff', border: '1px solid #bfdbfe', padding: '12px', borderRadius: '6px', marginBottom: '16px', fontSize: '14px', color: '#1e40af' },
  geoDenied: { background: '#fff1f2', border: '1px solid #fecaca', padding: '12px', borderRadius: '6px', marginBottom: '16px', fontSize: '14px', color: '#991b1b' },
  linkButton: { background: 'none', border: 'none', color: '#2563eb', textDecoration: 'underline', cursor: 'pointer', padding: '4px 0', fontSize: '14px' },
};

// --- Компонент для геолокации ---
const GeolocationManager = ({ onLocationUpdate }) => {
  const [permission, setPermission] = useState('prompt');

  const updatePermissionState = () => {
    navigator.permissions.query({ name: 'geolocation' }).then(result => setPermission(result.state));
  };

  useEffect(() => {
    updatePermissionState();
  }, []);

  const requestLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        onLocationUpdate({ latitude: position.coords.latitude, longitude: position.coords.longitude });
        updatePermissionState();
      },
      () => updatePermissionState()
    );
  };

  if (permission === 'prompt') {
    return (
      <div style={styles.geoPrompt}>
        <p>Для повышенной безопасности может потребоваться доступ к местоположению.</p>
        <button type="button" onClick={requestLocation} style={styles.linkButton}>Разрешить доступ</button>
      </div>
    );
  }

  if (permission === 'denied') {
    return (
      <div style={styles.geoDenied}>
        <p>Вы запретили доступ к геолокации. Вход в некоторые аккаунты может быть ограничен.</p>
      </div>
    );
  }
  return null;
};

// --- Основной компонент страницы ---
function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [location, setLocation] = useState(null);

  const getFriendlyErrorMessage = (errorCode = null) => {
    switch (errorCode) {
      case 'MISSING_CREDENTIALS': return 'Пожалуйста, введите email и пароль.';
      case 'INVALID_CREDENTIALS': return 'Неверный логин или пароль.';
      case 'GEOLOCATION_REQUIRED': return 'Для входа в этот аккаунт требуется доступ к геолокации. Разрешите его в браузере и попробуйте снова.';
      case 'SESSION_RECORD_FAILED': return 'Ошибка на сервере при записи сессии. Попробуйте снова.';
      case 'INTERNAL_SERVER_ERROR': return 'Внутренняя ошибка сервера. Мы уже работаем над этим.';
      default: return 'Произошла неизвестная ошибка. Пожалуйста, попробуйте снова.';
    }
  };

  const handleLogin = async () => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch("https://cnicyffiqvdhgyzkogtl.supabase.co/functions/v1/custom-sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          location,
        }),
      });

      const body = await response.json().catch(() => ({}));
      const errorCode = body?.error?.code
      console.log(`[sign-in] Error: ${errorCode}`, response.status, response.status == true, response, body)

      if (errorCode) {
        setError(getFriendlyErrorMessage(errorCode));
        return;
      } else if (response.status != 200) {
        setError('Не удалось связаться с сервером. Проверьте ваше интернет-соединение.');
        return;
      }

      if (body.session && body.customSessionId) {
        await supabase.auth.setSession(body.session);
        localStorage.setItem('custom-session-id', body.customSessionId);
        window.location.href = '/';
      } else {
        setError(getFriendlyErrorMessage(null));
      }
    } catch (e) {
      console.error('Критическая ошибка на клиенте:', e);
      setError(getFriendlyErrorMessage(null));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.form}>
        <h1 style={styles.title}>Вход в аккаунт</h1>
        <GeolocationManager onLocationUpdate={setLocation} />
        <form onSubmit={handleLogin}>
          <input
            style={styles.input}
            type="email"
            placeholder="Электронная почта"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            style={styles.input}
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            style={loading ? { ...styles.button, ...styles.buttonLoading } : styles.button}
            disabled={loading}
          >
            {loading ? 'Вход...' : 'Войти'}
          </button>
          {error && <p style={styles.errorText}>{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default LoginPage;