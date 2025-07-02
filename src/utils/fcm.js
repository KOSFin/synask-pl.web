import { getToken } from "firebase/messaging";
import { messaging } from "./firebaseUtils";

const VAPID_KEY = import.meta.env.VITE_FIREBASE_VAPID_KEY;

export const requestFcmToken = async () => {
  try {
    const permission = await Notification.requestPermission();

    if (permission !== 'granted') {
      console.warn('Разрешение на уведомления не получено');
      return null;
    }

    const token = await getToken(messaging, { vapidKey: VAPID_KEY });

    if (token) {
      localStorage.setItem('fcm_token', token);
      return token;
    } else {
      console.warn('Не удалось получить токен');
      return null;
    }
  } catch (error) {
    console.error('Ошибка получения FCM токена', error);
    return null;
  }
};

export const getSavedFcmToken = () => {
  return localStorage.getItem('fcm_token') || null;
};
