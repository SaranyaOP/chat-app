// Use 'as' to give them unique names
import { ref as dbRef, set, onDisconnect } from "firebase/database";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { storage, db, auth, rtdb } from "./firebase";

export const setUserOnline = (uid) => {
  if (!uid) return;

  // Use the database-specific alias
  const statusRef = dbRef(rtdb, `/status/${uid}`);

  set(statusRef, {
    state: "online",
    last_changed: Date.now(),
  });

  onDisconnect(statusRef).set({
    state: "offline",
    last_changed: Date.now(),
  });
};

export const uploadProfileImage = async (file) => {
  const user = auth.currentUser;
  if (!user) throw new Error("No user logged in");

  if (file.size > 81920) {
    throw new Error("File size must be below 2KB!");
  }

  try {
    // Use the storage-specific alias
    const fileRef = storageRef(storage, `profile_pics/${user.uid}`);

    const snapshot = await uploadBytes(fileRef, file);
    const photoURL = await getDownloadURL(snapshot.ref);

    const userDocRef = doc(db, "users", user.uid);
    await updateDoc(userDocRef, {
      image: photoURL,
    });

    return photoURL;
  } catch (error) {
    console.error("Upload Error:", error);
    throw error;
  }
};
