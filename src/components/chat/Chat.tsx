import React, { useState } from "react";
import "./Chat.scss";
import ChatHeader from "./ChatHeader";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
// import {
//   AddCircleOutline,
//   CardGiftcardOutlined,
//   EmojiEmotionsOutlined,
// } from "@mui/icons-material";
import GifIcon from "@mui/icons-material/Gif";
import ChatMessage from "./ChatMessage";
import { useAppSelector } from "../../app/hooks";
import { db } from "../../firebase";
import {
  addDoc,
  collection,
  CollectionReference,
  DocumentData,
  DocumentReference,
  serverTimestamp,
} from "firebase/firestore";
// import useFirebase from "../hooks/useFirebase";
import useSubCollection from "../../hooks/useSubCollection";
// import { async } from "@firebase/util";

const Chat = () => {
  const [inputText, setInputText] = useState<string>("");
  const channelName = useAppSelector((state) => state.channel.channelName);
  const channelId = useAppSelector((state) => state.channel.channelId);
  const user = useAppSelector((state) => state.user.user);

  const { subDocuments: messages } = useSubCollection("channels", "messages");

  const sendMessage = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const collectionRef: CollectionReference<DocumentData> = collection(
      db,
      "channels",
      String(channelId),
      "messages"
    );

    const docRef: DocumentReference<DocumentData> = await addDoc(
      collectionRef,
      {
        message: inputText,
        timestamp: serverTimestamp(),
        user: user,
      }
    );
    // console.log(docRef);
    setInputText("");
  };

  return (
    <div className="chat">
      {/* chat header */}
      <ChatHeader channelName={channelName} />
      {/* message */}
      <div className="chatMessage">
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            messageId={message.id}
            channelId={String(channelId)}
            message={message.message}
            timestamp={message.timestamp}
            user={message.user}
          />
        ))}
        {/* <ChatMessage />
        <ChatMessage />
        <ChatMessage /> */}
      </div>
      {/* chat input */}
      <div className="chatInput">
        <AddCircleOutlineIcon fontSize="large" />
        <form>
          <input
            type="text"
            placeholder={`Send messages to #${channelName}`}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInputText(e.target.value)
            }
            value={inputText}
          />
          <button
            type="submit"
            className="chatInputButton"
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
              sendMessage(e)
            }
          >
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
