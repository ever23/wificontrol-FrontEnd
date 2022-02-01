const PUBLIC_VAPID_KEY="BA1jE5aA3EDdz-y-OO5loitvpoqGCk1-WXSff5kNSsytGmGHHWyb18hFqGb81B-70CMPf-d82e--2JU4EidIO2c"
import axios from 'axios'
import { __esModule } from 'luxon';
const subscription = async () => { 
  // Service Worker
  console.log("Registering a Service worker");
  const register = await navigator.serviceWorker.register("/admin/static/notificacion.worker.js", {
    scope: "/admin/static/"
  });
  console.log("New Service Worker");

  // Listen Push Notifications
  console.log("Listening Push Notifications");
  console.log(register.pushManager.subscribe)
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey:urlBase64ToUint8Array(PUBLIC_VAPID_KEY)
  });

  console.log(subscription);

  // Send Notification
  await axios.post("/api/notificaciones/suscribir",subscription);
  console.log("Subscribed!");
  return register;
};

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
/*
// UI
const form = document.querySelector('#myform');
const message = document.querySelector('#message');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  fetch('/new-message', {
    method: 'POST',
    body: JSON.stringify({message: message.value}),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  form.reset();
});
*/
export default function () {
let worker;
	if ("serviceWorker" in navigator) {
    worker=subscription().catch(err => console.log(err));
}
return worker
}
