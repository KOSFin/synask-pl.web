import React, { useState } from 'react';
import { supabase } from '../../utils/supabaseUtils';
import styles from './LoginPage.styles';

import { useDevice } from '../../providers/useDevice';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { device } = useDevice();

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log('Начинаем процесс входа...');

    setLoading(true);
    setError('');

    try {
      console.log(`Вызываем граничную функцию "custom-sign-in" для пользователя: ${email}`);
      
      // Вызываем нашу кастомную функцию, а не стандартный метод auth
      const { data, error: invokeError } = await supabase.functions.invoke('custom-sign-in', {
        body: { email, password },
      });

      if (invokeError) {
        // Эта ошибка означает проблему с вызовом самой функции (сеть, 500-е ошибки)
        console.error('Ошибка вызова функции:', invokeError);
        setError('Не удалось связаться с сервером. Попробуйте снова.');
        return; // Выходим из функции
      }

      console.log('Получен ответ от функции:', data);

      if (data.error) {
        // Эта ошибка пришла из нашей логики внутри функции (например, неверный пароль)
        console.error('Ошибка от логики функции:', data.error);
        setError(data.error); // Показываем пользователю осмысленную ошибку
        return;
      }

      if (data.session) {
        console.log('Функция выполнена успешно, получена сессия:', data.session);
        // Это КЛЮЧЕВОЙ шаг: мы устанавливаем сессию в клиенте Supabase,
        // чтобы он сохранил токены и знал, что пользователь вошел.
        const { error: setSessionError } = await supabase.auth.setSession(data.session);

        if (setSessionError) {
            console.error("Критическая ошибка: не удалось установить сессию на клиенте", setSessionError);
            setError('Произошла ошибка при установке сессии.');
        } else {
            console.log('Пользователь успешно вошел в систему. Сессия установлена.');
            alert('Вход выполнен успешно!');
            // Здесь можно перенаправить пользователя, например:
            window.location.href = `/${device}/`;
        }
      }

    } catch (e) {
      console.error('Произошла непредвиденная ошибка:', e);
      setError('Произошла непредвиденная ошибка. Проверьте консоль.');
    } finally {
      // Вне зависимости от результата, выключаем состояние загрузки
      setLoading(false);
      console.log('Процесс входа завершен.');
    }
  };

  return (
    <div style={styles.page}>
      <form onSubmit={handleLogin} style={styles.form}>
        <h1 style={styles.title}>Вход в аккаунт</h1>
        
        <input
          type="email"
          placeholder="Электронная почта"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />

        <button 
          type="submit"
          disabled={loading}
          style={loading ? {...styles.button, ...styles.buttonLoading} : styles.button}
        >
          {loading ? 'Вход...' : 'Войти'}
        </button>

        {error && <p style={styles.errorText}>{error}</p>}
      </form>
    </div>
  );
}

export default LoginPage;