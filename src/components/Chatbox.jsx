import React, { useEffect, useState, useMemo, useRef } from "react";
import defaultAvatar from "../../public/assets/default.jpg";
import { formatTimestamp } from "../utils/formatTimestamp";
import { RiSendPlaneFill } from "react-icons/ri";
import { messageData } from "../data/messageData";
import { auth, listenForMessages } from "../firebase/firebase";
import { sendMessage } from "../firebase/firebase";
import logo from "../../public/assets/logo.png";
import { ref, onValue } from "firebase/database";
import { rtdb } from "../firebase/firebase";

const Chatbox = ({ selectedUser, isOpen }) => {
  const [messages, setMessages] = useState([]);
  const [messageText, sendMessageText] = useState("");
  const [onlineUsers, setOnlineUsers] = useState();

  const scrollRef = useRef(null);

  const chatId =
    auth?.currentUser?.uid < selectedUser?.uid
      ? `${auth?.currentUser?.uid}-${selectedUser?.uid}`
      : `${selectedUser?.uid}-${auth?.currentUser?.uid}`;
  const user1 = auth?.currentUser;
  const user2 = selectedUser;
  const senderEmail = auth?.currentUser?.email;
  const onlineUserIDs = Object.keys(onlineUsers || {});
  const isOnline = onlineUserIDs.includes(user2?.uid);

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
    // Simulating fetching data from a local JSON file
    listenForMessages(chatId, setMessages);
  }, [chatId]);
  const sortedMessages = useMemo(() => {
    return [...messages].sort((a, b) => {
      const aTimestamp =
        a?.timestamp?.seconds + a?.timestamp?.nanoseconds / 1e9;
      const bTimestamp =
        b?.timestamp?.seconds + b?.timestamp?.nanoseconds / 1e9;
      return aTimestamp - bTimestamp;
    });
  }, [messages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    // Logic to send message
    const newMessage = {
      sender: senderEmail,
      text: messageText,
      timestamp: {
        seconds: Math.floor(Date.now() / 1000),
        nanoseconds: 0,
      },
    };

    sendMessage(messageText, chatId, user1?.uid, user2?.uid);
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    sendMessageText("");
  };
  return (
    <>
      {selectedUser ? (
        <section
          className={`${isOpen ? "hidden" : "flex"} flex-col items-start justify-start h-screen w-[100%] background-image`}
        >
          <header className="border-b border-gray-400 w-[100%] h-[82px] m:h-fit p-4 bg-white">
            <main className="flex items-center gap-3">
              <span>
                <div className="relative inline-block">
                  <img
                    src={selectedUser?.image || defaultAvatar}
                    alt="Chat Icon"
                    className="w-11 h-11 obect-cover rounded-full block"
                  />
                  {isOnline && (
                    <span className="absolute bottom-0 right-0 block w-3 h-3 bg-green-500 rounded-full ring-2 ring-white"></span>
                  )}
                </div>
              </span>

              <span>
                <h3 className="font-semibold text-[#2A3D39] text-lg">
                  {selectedUser?.fullName || "Unknown User"}
                </h3>
                <p className="font-light text-[#2A3D39] text-sm">
                  @ {selectedUser?.username || "Unknown User"}
                </p>
              </span>
            </main>
          </header>
          <main className="custom-scrollbar relative h-[100vh] w-[100%] flex  flex-col justify-between">
            <section className="px-3 pt-5 b-20 lg:pb-10">
              <div ref={scrollRef} className="overflow-auto h-[80vh]">
                {sortedMessages.map((msg, index) => (
                  <>
                    {msg.sender === senderEmail ? (
                      <div className="flex flex-col items-end w-full">
                        <span className="flex gap-3  h-auto ms-10 me-10">
                          <div>
                            <div className="flex items-center bg-white justify center p-6 rounded-lg shadow-sm">
                              <h4>{msg.text}</h4>
                            </div>
                            <p className="text-gray-400 text-sx mt-3 text-right">
                              {formatTimestamp(msg?.timestamp)}
                            </p>
                          </div>
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-start w-full">
                        <span className="flex gap-3 w-[40%] h-auto ms-10 ">
                          <img
                            src={defaultAvatar}
                            alt="Chat Icon"
                            className="w-11 h-11 object-cover rounded-full "
                          />
                          <div>
                            <div className="flex items-center bg-white justify center p-6 rounded-lg shadow-sm">
                              <h4>{msg.text}</h4>
                            </div>
                            <p className="text-gray-400 text-sx mt-3">
                              {formatTimestamp(msg?.timestamp)}
                            </p>
                          </div>
                        </span>
                      </div>
                    )}
                  </>
                ))}
              </div>
            </section>

            <div className="sticky lg:bottom-0 bottom-[60px] p-3 h-fit w-[100%]">
              <form
                onSubmit={handleSendMessage}
                action=""
                className="flex items-center bg-white h-[45px] w-[100%] px-2 rounded-lg relative shadow-lg"
              >
                <input
                  onChange={(e) => sendMessageText(e.target.value)}
                  value={messageText}
                  type="text"
                  className="h-full text-[#2A3D39] outline-none text-[16px]"
                  placeholder="write your message..."
                />
                <button
                  type="submit"
                  className="flex items-center justify-center absolute right-3 p-2 rounded-full bg-[#D9f2ed] hover:bg-[#c8eae3]"
                >
                  <RiSendPlaneFill color="#01AA85" />
                </button>
              </form>
            </div>
          </main>
        </section>
      ) : (
        <section className="h-screen w-[100%] bg-[#e5f6f3]">
          <div className="flex flex-col justify-center items-center h-[100vh]">
            <img src={logo} width="100" />
            <h1 className="text-[30px] font-bold text-teal-700 mt-5 p-4 text-center">
              Welcome to PingMe!
            </h1>
            <p className="text-gray-500 p-4 text-center">
              Connect and chat with friends easily,securely, fast and free
            </p>
          </div>
        </section>
      )}
    </>
  );
};

export default Chatbox;
