import React from "react";
import "./Chat.scss";
import ChatHeader from "./ChatHeader";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import GifIcon from "@mui/icons-material/Gif";
import ChatMessage from './ChatMessage'

const Chat = () => {
  return (
    <div className="chat">
      {/* chat header */}
      <ChatHeader />
      {/* message */}
      <div className="chatMessage">

        <ChatMessage />
        <ChatMessage />
        <ChatMessage />
        <ChatMessage />
      </div>
      {/* chat input */}
      <div className="chatInput">
        <AddCircleOutlineIcon />
        <form>
          <input type="text" placeholder="Send messages to #Makoto" />
          <button type="submit" className="chatInputButton">
            Send
          </button>
        </form>
        <div className="chatInputIcons">
          <CardGiftcardIcon />
          <EmojiEmotionsIcon />
          <GifIcon />
        </div>
      </div>
    </div>
  );
};

export default Chat;
