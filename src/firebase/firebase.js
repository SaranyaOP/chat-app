import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getFirestore,
  onSnapshot,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDyr8MZqAt-19ETURnpmbEUM2hlpdo3AhM",
  authDomain: "chat-app-df093.firebaseapp.com",
  projectId: "chat-app-df093",
  storageBucket: "chat-app-df093.firebasestorage.app",
  messagingSenderId: "94009508783",
  appId: "1:94009508783:web:d2b568c6d783a99d92a55a",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const rtdb = getDatabase(app);
const storage = getStorage(app);

export const listenForChats = (setChats) => {
  const chatsRef = collection(db, "chats");
  const unsubscribe = onSnapshot(chatsRef, (snapshot) => {
    const chats = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    const filteredChats = chats.filter((chat) =>
      chat?.users?.some((user) => user?.email === auth.currentUser?.email),
    );
    setChats(filteredChats);
  });
  return unsubscribe;
};

export const sendMessage = async (messageText, chatId, user1, user2) => {
  // Function to send message logic here
  const chatsRef = doc(db, "chats", chatId);
  const user1Doc = await getDoc(doc(db, "users", user1));
  const user2Doc = await getDoc(doc(db, "users", user2));
  console.log(user1Doc);
  console.log(user2Doc);

  const user1Data = user1Doc.data();
  const user2Data = user2Doc.data();

  const chatDoc = await getDoc(chatsRef);
  if (!chatDoc.exists()) {
    await setDoc(chatsRef, {
      users: [user1Data, user2Data],
      lastMessage: messageText,
      lastMessageTimestamp: serverTimestamp(),
    });
  } else {
    await updateDoc(chatsRef, {
      lastMessage: messageText,
      lastMessageTimestamp: serverTimestamp(),
    });
  }

  const messagesRef = collection(db, "chats", chatId, "messages");
  await addDoc(messagesRef, {
    text: messageText,
    sender: auth.currentUser.email,
    timestamp: serverTimestamp(),
  });
};

export const listenForMessages = (chatId, setMessages) => {
  const chatRef = collection(db, "chats", chatId, "messages");
  onSnapshot(chatRef, (snapshot) => {
    const messages = snapshot.docs.map((doc) => doc.data());

    setMessages(messages);
  });
};

export { auth, db, rtdb, storage };
