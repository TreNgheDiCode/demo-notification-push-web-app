import admin from "firebase-admin";
import { Message } from "firebase-admin/messaging";
import { NextRequest, NextResponse } from "next/server";

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  const serviceAccount = require("@/service_key.json");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export async function POST(request: NextRequest) {
  const { token, title, message, link } = await request.json();

  const payload: Message = {
    token,
    notification: {
      title: title,
      body: message,
    },
    webpush: link && {
      fcmOptions: {
        link,
      },
    },
  };

  const androidPayload: Message = {
    token: "Copy Token Từ Log Trong App Qua Đây",
    notification: {
      title: title,
      body: message,
    },
    android: {
      notification: {
        clickAction: "FLUTTER_NOTIFICATION_CLICK",
      },
    },
  };

  try {
    await admin.messaging().send(payload);
    await admin.messaging().send(androidPayload);

    return NextResponse.json({ success: true, message: "Notification sent!" });
  } catch (error) {
    return NextResponse.json({ success: false, error });
  }
}
