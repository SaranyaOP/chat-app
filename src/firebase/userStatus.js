
import { ref, set, onDisconnect } from "firebase/database";
import { rtdb } from "./firebase";

export const setUserOnline = (uid) => {
  if (!uid) return;

  const statusRef = ref(rtdb, `/status/${uid}`);

  // Mark user online
  set(statusRef, {
    state: "online",
    last_changed: Date.now(),
  });

  // Automatically set offline on disconnect
  onDisconnect(statusRef).set({
    state: "offline",
    last_changed: Date.now(),
  });
};