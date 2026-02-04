import React, { use, useEffect, useMemo, useState } from "react";
import defaultAvatar from "../../public/assets/default.jpg";
import { RiMore2Fill } from "react-icons/ri";
import SearchModal from "./SearchModal";
import { formatTimestamp } from "../utils/formatTimestamp";

import chatData from "../data/chats";
import { db, listenForChats } from "../firebase/firebase";
import { auth } from "../firebase/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { ref, onValue } from "firebase/database";
import { rtdb } from "../firebase/firebase";
//import SettingsModal from "./SettingsModal";

const Chatlist = ({ setSelectedUser, isOpen, onClose }) => {
  const [chats, setChats] = useState([]);
  const [user, setUser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState();
  const onlineUserIDs = Object.keys(onlineUsers || {});
  const isOnline = onlineUserIDs.includes(user?.uid);
  //const [showSettings, setShowSettings] = useState(false); // Add this state

  useEffect(() => {
    const userDocRef = doc(db, "users", auth?.currentUser?.uid);
    const unsubscribe = onSnapshot(userDocRef, (doc) => {
      if (doc.exists()) {
        setUser(doc.data());
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const statusRef = ref(rtdb, "/status");

    const unsubscribe = onValue(
      statusRef,
      (snapshot) => {
        const data = snapshot.val();
        console.log("RTDB Raw Data:", data); // Check your browser console!
        const filteredData = Object.fromEntries(
          Object.entries(data).filter(
            ([key, value]) => value.state === "online",
          ),
        );

        setOnlineUsers(filteredData);
      },
      (error) => {
        console.error("RTDB Error:", error); // This will tell you if it's a Permission issue
      },
    );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = listenForChats(setChats);
    //setChats(chatData);
    return () => unsubscribe();
  }, []);

  const sortedChats = useMemo(() => {
    return [...chats].sort((a, b) => {
      const aTimestamp =
        a?.lastMessageTimestamp?.seconds +
        a?.lastMessageTimestamp?.nanoseconds / 1e9;
      const bTimestamp =
        b?.lastMessageTimestamp?.seconds +
        b?.lastMessageTimestamp?.nanoseconds / 1e9;

      return bTimestamp - aTimestamp;
    });
  }, [chats]);

  const startChat = (user) => {
    setSelectedUser(user);
    if (onClose) onClose();
  };
  return (
    <section
      className={`relative ${isOpen ? "flex fixed top-0 left-0 z-50" : "hidden"} lg:flex flex-col items-start justify-start bg-white h-[100vh] w-[100%] lg:w-[600px]`}
    >
      <header className="flex items-center justify-between w-[100%] lg:border-b border-b-1 border-[#898989b9] p-4 sticky md:static top-0 z-[100]">
        <main className="flex items-center gap-3">
          <div className="relative inline-block">
            <img
              src={defaultAvatar}
              alt="avatar"
              className="w-12 h-12 rounded-full object-cover block"
            />

            {isOnline && (
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white" />
            )}
          </div>
          <span>
            <h3 className="p-0 font-semibold text-[#2A3D39] md:text-[17px]">
              {user?.fullName || "Unknown User"}
            </h3>
            <p className="p-0 font-light text-[#2A3D39] text-[15px]">
              @{user?.username || "unknown"}
            </p>
          </span>
        </main>
        <button
          // onClick={() => setShowSettings(true)}
          className="bg-[#D9F2ED] w-[35px] h-[35px] p-2 flex items-center justify-center rounded-lg"
        >
          <RiMore2Fill color="#01AA85" className="w-[28px] h-[28px]" />
        </button>
        {/* {showSettings && (
        // <SettingsModal 
        //   user={user} 
        //   onClose={() => setShowSettings(false)} 
        // />
      )} */}
      </header>
      <div className="w-[100%] mt-[10px] px-5">
        <header className="flex items-center justify-between">
          <h3 className="text-[16px]">Messages ({chats?.length || 0})</h3>
          <SearchModal startChat={startChat} />
        </header>
      </div>
      <main className="flex flex-col items-start mt-[1.5rem] pb-3 w-[100%]">
        {sortedChats.map((chat) => (
          <button
            key={chat?.uid}
            className="flex items-start justify-between w-[100%] border-b border-[#9090902c] px-5 pb-3 pt-3"
          >
            {chat.users
              ?.filter((user) => user?.email !== auth?.currentUser?.email)
              ?.map((user) => (
                <>
                  <div
                    className="flex items-start gap-3"
                    onClick={() => startChat(user)}
                  >
                    <div className="relative inline-block">
                      <img
                        src={user?.image || defaultAvatar}
                        className="h-[40px] w-[40px] rounded-full object-cover block"
                      />
                      {onlineUserIDs.includes(user?.uid) && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white" />
                      )}
                    </div>
                    <span>
                      <h2 className="p-0 font-semibold text-[#2A3d39] text-left text-[17px]">
                        {user?.fullName || "ChatFrik"}
                      </h2>
                      <p className="p-0 font-light text-[#2A3d39] text-left text-[14px]">
                        {chat?.lastMessage}
                      </p>
                    </span>
                  </div>
                  <p className="p-0 font-regular text-gray-400 text-left text-[11px]">
                    {formatTimestamp(chat?.lastMessageTimestamp)}
                  </p>
                </>
              ))}
          </button>
        ))}
      </main>
    </section>
  );
};

export default Chatlist;
