import { getToken, deleteToken } from "firebase/messaging";
import { messaging } from "./firebaseUtils";

const VAPID_KEY = import.meta.env.VITE_FIREBASE_VAPID_KEY;
const TOKEN_KEY = 'fcm_token';

export async function refreshFcmToken() {
  try {
    const swRegistration = await navigator.serviceWorker.ready;
    const newToken = await getToken(messaging, {
      vapidKey: VAPID_KEY,
      serviceWorkerRegistration: swRegistration
    });
    const saved = localStorage.getItem(TOKEN_KEY);
    if (newToken && newToken !== saved) {
      localStorage.setItem(TOKEN_KEY, newToken);
      console.log("🔄 FCM token updated:", newToken);
    }
    return newToken;
  } catch (e) {
    console.error("FCM getToken error:", e);
    return null;
  }
}

export async function clearFcmToken() {
  try {
    await deleteToken(messaging);
    localStorage.removeItem(TOKEN_KEY);
    console.log("🗑 FCM token deleted");
  } catch (e) {
    console.error("FCM deleteToken error:", e);
  }
}

export function getSavedFcmToken() {
  return localStorage.getItem(TOKEN_KEY);
}
