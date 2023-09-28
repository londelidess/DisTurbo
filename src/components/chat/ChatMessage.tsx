import React from "react";
import "./ChatMessage.scss";
import { Avatar } from "@mui/material";

const ChatMessage = () => {
  return (
    <div className='message'>
      <Avatar />

      <div className="messageInfo">
        <h4>
          App
          <span className="messageTimeStamp">2023/9/27</span>
        </h4>
        <p>message</p>
      </div>
    </div>
  );
};

export default ChatMessage;
