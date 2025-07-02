// utils/fcm.js

import { getToken } from "firebase/messaging";
import { messaging } from "./firebaseUtils"; // Убедись, что путь верный

const VAPID_KEY = import.meta.env.VITE_FIREBASE_VAPID_KEY;

export const requestFcmToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    console.log('Notification permission:', permission);

    if (permission !== 'granted') {
      console.warn('Разрешение на уведомления не получено');
      return null;
    }

    // 🕵️‍♂️ КЛЮЧЕВОЕ ИЗМЕНЕНИЕ:
    // Получаем уже существующую регистрацию сервис-воркера, созданную VitePWA.
    // navigator.serviceWorker.ready гарантирует, что воркер активен.
    const swRegistration = await navigator.serviceWorker.ready;

    // Передаём эту регистрацию в getToken, чтобы он не создавал новую.
    const token = await getToken(messaging, {
      vapidKey: VAPID_KEY,
      serviceWorkerRegistration: swRegistration, // 👈 Вот оно
    });

    if (token) {
      console.log('FCM Token received:', token);
      localStorage.setItem('fcm_token', token);
      return token;
    } else {
      console.warn('Не удалось получить токен. Убедитесь, что сервис-воркер зарегистрирован правильно.');
      return null;
    }
  } catch (error) {
    console.error('Ошибка получения FCM токена:', error);
    return null;
  }
};

export const getSavedFcmToken = () => {
  return localStorage.getItem('fcm_token') || null;
};