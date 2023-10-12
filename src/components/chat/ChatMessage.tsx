import React from "react";
import "./ChatMessage.scss";
import { Avatar } from "@mui/material";
import { Timestamp } from "firebase/firestore";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useAppSelector } from "../../app/hooks";

type Props = {
  messageId: string;
  channelId: string;
  timestamp: Timestamp;
  message: string;
  user: {
    uid: string;
    photo: string;
    email: string;
    displayName: string;
  };
};

const ChatMessage = (props: Props) => {
  const sessionUser = useAppSelector((state) => state.user.user);
  const { message, timestamp, user } = props;
  // console.log("Current User ID:", sessionUser?.uid);
  // console.log("Message User ID:", user.uid);
  const handleDelete = async () => {
      const messageRef = doc(
        db,
        "channels",
        props.channelId,
        "messages",
        props.messageId
      );
      await deleteDoc(messageRef);
  };

  return (
    <div className="message">
      <Avatar src={user?.photo} />

      <div className="messageInfo">
        <h3>
          {user?.displayName}
          <span className="messageTimestamp">
            {new Date(timestamp?.toDate()).toLocaleString()}
          </span>
        </h3>
        <h4>{message}</h4>
        {sessionUser?.uid === user.uid && (
          <button className="messageDeleteButton" onClick={handleDelete}>Delete</button>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
