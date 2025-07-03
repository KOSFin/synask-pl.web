import { precacheAndRoute } from 'workbox-precaching';

import { initializeApp } from 'firebase/app';
import { getMessaging, onBackgroundMessage } from 'firebase/messaging/sw';

precacheAndRoute(self.__WB_MANIFEST);

const firebaseConfig = {
  apiKey: "AIzaSyBOpdvHgqkIG7zCehwu8QxyeO2ojCt_xUw",
  authDomain: "synask-web.firebaseapp.com",
  projectId: "synask-web",
  storageBucket: "synask-web.firebasestorage.app",
  messagingSenderId: "609747028504",
  appId: "1:609747028504:web:8876b384cc000c737bd16d",
  measurementId: "G-T5F7JZ1L6W"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

onBackgroundMessage(messaging, payload => {
  if (payload?.notification) {
    console.log('[firebase-messaging-sw.js] Авто-показ уведомления:', payload.notification.title);
    return;
  }

  const { title, ...rest } = payload.data;
  self.registration.showNotification(title, rest);
});