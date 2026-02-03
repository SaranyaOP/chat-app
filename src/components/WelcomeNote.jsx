import React from "react";
import logo from "../../public/assets/logo.png";

const WelcomeNote = () => {
  return (
    <div className="flex flex-col justify-center items-center p-3 mb-4">
      <img src={logo} width="100" />
      <h1 className="text-5xl font-bold font-mono">PingMe!</h1>
      <p className="text-lg text-gray-800 p-1">
        Instant messages. Real connections.
      </p>
      {/* <p className="text-sm text-gray-400">
        A simple, distraction-free chat experience built for speed and clarity.
      </p> */}
    </div>
  );
};

export default WelcomeNote;
