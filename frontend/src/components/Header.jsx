import React from "react";
import { ChatData } from "../context/chatContext";
import { UserData } from "../context/userContext";

const Header = () => {
  const {chats} = ChatData()
  const {user} = UserData()
  return (
    <div>
      <p className="text-lg mb-6">{`Hi! ${user.name}, How can I help you today?`}</p>
      {chats && chats.length === 0 && (
        <p className="text-lg mb-6">Create New Chat to Continue</p>
      )}
    </div>
  );
};

export default Header;