import React, { useState, useEffect } from "react";
import "./Chat.scss";
import ChatHeader from "./ChatHeader";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import GifIcon from "@mui/icons-material/Gif";
import ChatMessage from "./ChatMessage";
import { useAppSelector } from "../../app/hooks";
import { db } from "../../firebase";
import {
  collection,
  CollectionReference,
  DocumentData,
  serverTimestamp,
  Timestamp,
  addDoc,
  DocumentReference,
  onSnapshot,
} from "firebase/firestore";
// import { async } from "@firebase/util";

interface Messages {
  timeStamp:Timestamp;
  message:string;
  user: null | {
    uid: string;
    photo: string;
    email: string;
    displayName: string;
  };
}

const Chat = () => {
  const [inputText, setInputText] = useState<string>("");
  const [messages, setMessages] = useState<Messages[]>([]);
  const channelName = useAppSelector((state) => state.channel.channelName);
  // console.log(channelName)
  const channelId = useAppSelector((state) => state.channel.channelName);
  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
    let collectionRef = collection(
      db,
      "channels",
      String(channelId),
      "messages"
    );

    onSnapshot(collectionRef, (snapshot) => {
      let results:Messages[] = [];
      snapshot.docs.forEach((doc) => {
        results.push({
          timeStamp: doc.data().timestamp,
          message: doc.data().message,
          user: doc.data().user,
        });
      });
      setMessages(results)
      console.log(results)
    });

  }, [channelId]);

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
        timeStamp: serverTimestamp(),
        user: user,
      }
    );
    console.log(docRef);
  };

  return (
    <div className="chat">
      {/* chat header */}
      <ChatHeader channelName={channelName} />
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
          <input
            type="text"
            placeholder="Send messages to #Makoto"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInputText(e.target.value)
            }
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
