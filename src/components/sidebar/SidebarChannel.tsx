import React from "react";
import "./SidebarChannel.scss";
import { doc, onSnapshot, collection, query, DocumentData } from "firebase/firestore";

type Props = {
  id:string;
  channel:DocumentData
}

const SidebarChannelList = (props:Props) => {
const{id, channel}=props;
console.log(channel)
  return (
    <div className="sidebarChannel">
      <h4>
        <span className="sidebarChannelHash">#</span>
        {channel.channel.channelName}
      </h4>
    </div>
  );
};

export default SidebarChannelList;
