// EnableNotificationsButton.jsx
import React, { useState } from 'react';
import { requestFcmToken } from '../../utils/fcm';

const EnableNotificationsButton = () => {
  const [enabled, setEnabled] = useState(!!localStorage.getItem('fcm_token'));

  const handleClick = async () => {
    const token = await requestFcmToken();
    if (token) setEnabled(true);
  };

  return enabled ? (
    <span>Уведомления включены ✅</span>
  ) : (
    <button onClick={handleClick}>Включить уведомления</button>
  );
};

export default EnableNotificationsButton;
