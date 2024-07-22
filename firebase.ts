import { getApp, getApps, initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";

// Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBLRavFJVJ3T_ZRsH86WNmHP70HSZlruU",
  authDomain: "kltn-56ae4.firebaseapp.com",
  projectId: "kltn-56ae4",
  storageBucket: "kltn-56ae4.appspot.com",
  messagingSenderId: "936640374389",
  appId: "1:936640374389:web:b00ba0c57f1917fa2cfa3c",
  measurementId: "G-P8MGH4LMES",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const messaging = async () => {
  const supported = await isSupported();
  return supported ? getMessaging(app) : null;
};

export const fetchToken = async () => {
  try {
    const fcmMessaging = await messaging();
    if (fcmMessaging) {
      const token = await getToken(fcmMessaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_FCM_VAPID_KEY,
      });
      return token;
    }
    return null;
  } catch (err) {
    console.error("An error occurred while fetching the token:", err);
    return null;
  }
};

export { app, messaging };
