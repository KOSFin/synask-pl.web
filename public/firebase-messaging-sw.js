import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging/sw';

const firebaseApp = initializeApp({
    apiKey: "AIzaSyBOpdvHgqkIG7zCehwu8QxyeO2ojCt_xUw",
    authDomain: "synask-web.firebaseapp.com",
    projectId: "synask-web",
    storageBucket: "synask-web.firebasestorage.app",
    messagingSenderId: "609747028504",
    appId: "1:609747028504:web:8876b384cc000c737bd16d",
    measurementId: "G-T5F7JZ1L6W"
});

const messaging = getMessaging(firebaseApp);

messaging.onBackgroundMessage(function (payload) {
  const { title, body } = payload.notification;
  self.registration.showNotification(title, {
    body,
  });
});
