import React from "react";
import "./SidebarChannel.scss";
import { DocumentData } from "firebase/firestore";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setChannelInfo } from "../../features/channelSlice";
import { RootState } from "../../app/store";

type Props = {
  id: string;
  channel: DocumentData;
};

const SidebarChannelList = (props: Props) => {
  const channelId = useAppSelector((state: RootState) => state.channel.channelId);
  const { id, channel } = props;
  // console.log(channel)
  const dispatch = useAppDispatch();

  return (
    <div className="sidebarChannel"
    onClick={() =>
      dispatch(
        setChannelInfo({
          channelId: id,
          channelName: channel.channel.channelName,
        })
      )
    }
  >
    <h4 className={id === channelId ? "active" : ""}>
      <span className="sidebarChannelHash">#</span>
      {channel.channel.channelName}
    </h4>
  </div>
  );
};

export default SidebarChannelList;
