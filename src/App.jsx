import React, { useState, useEffect } from "react";
import Navlinks from "./components/Navlinks";
import Chatlist from "./components/Chatlist";
import Chatbox from "./components/Chatbox";
import Login from "./components/Login";
import Register from "./components/Register";
import { auth } from "./firebase/firebase";
import { ToastContainer } from "react-toastify";
import { setUserOnline } from "./firebase/userStatus";  


const App = () => {
  const [isLogiin, setIsLogin] = useState(true);
  const [user, setUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isChatListOpen, setIsChatListOpen] = useState(false);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
    }

    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (user) {
        console.log("Setting user online:", user.uid);
      setUserOnline(user.uid);
    }
    });

    return () => unsubscribe();
  }, []);
  return (
    <div>
      {user ? (
        <div className="flex lg:flex-row flex-col items-start w-[100%]">
          <Navlinks onToggleChatList={() => setIsChatListOpen((v) => !v)} />
          <Chatlist setSelectedUser={setSelectedUser} isOpen={isChatListOpen} onClose={() => setIsChatListOpen(false)} />
          <Chatbox selectedUser={selectedUser} />
        </div>
      ) : (
        <>
          
          {isLogiin ? (
            <Login isLogiin={isLogiin} setIsLogin={setIsLogin} />
          ) : (
            <Register isLogiin={isLogiin} setIsLogin={setIsLogin} />
          )}
        </>
      )}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default App;
