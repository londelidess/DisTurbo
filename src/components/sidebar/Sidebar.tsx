import React , { useEffect, useState } from "react";
import "./Sidebar.scss";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import SidebarChannel from "./SidebarChannel";
import MicIcon from '@mui/icons-material/Mic';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import SettingsIcon from '@mui/icons-material/Settings';
import { auth, db } from '../../firebase'
import { useAppDispatch, useAppSelector } from "../../app/hooks";
// import { collection, query } from "firebase/firestore/lite"
import { doc, onSnapshot, collection, query, DocumentData } from "firebase/firestore";

interface Channel{
  id:string;
  channel:DocumentData;
}


const Sidebar = () => {
  const[channels, setChannels] = useState<Channel[]>([]);

  const user = useAppSelector((state)=>state.user)
  const q = query(collection(db, "channels"))

useEffect(()=>{
  onSnapshot(q,(querySnapshot)=>{
    const channelsResults:Channel[] = [];
    querySnapshot.docs.forEach((doc) =>

    channelsResults.push({
      id: doc.id,
      channel:doc.data(),
    })
  );
  setChannels(channelsResults)
  })
},[])

  return (
    <div className="sidebar">
      {/* sidebarleft */}
      <div className="sidebarLeft">
        <div className="serverIcon">
          <img src="./discord-icon.svg" alt="" />
        </div>

        <div className="serverIcon">
          <img src="./discord-icon.svg" alt="" />
        </div>
      </div>
      {/* sidebarRight */}
      <div className="sidebarRight">
        <div className="sidebarTop">
          <h3>Disturbo</h3>
          <ExpandMoreIcon />
        </div>
        {/* sidebar channels */}
        <div className="sidebarChannels">
          <div className="sidebarChannelsHeader">
            <div className="sidebarHeader">
              <ExpandMoreIcon />
              <h4>Programming Channel</h4>
            </div>
            <AddIcon className="sidebarAddIcon" />
          </div>
          <div className="sidebarChannelList">
          {channels.map((channel)=>(
            <SidebarChannel channel={channel} id={channel.id} key={channel.id}/>

          ))}
            {/* <SidebarChannel />
            <SidebarChannel />
            <SidebarChannel /> */}
          </div>

          <div className="sidebarFooter">
            <div className="sidebarAccount">
              <img src={user?.photo} alt="img" onClick={()=> auth.signOut()} />
              <div className="accountName">
                <h4>{user?.displayName}</h4>
                <span>#{user?.uid.substring(0,4)}</span>
              </div>
            </div>
            <div className='sidebarVoice'>
              <MicIcon />
              <HeadphonesIcon />
              <SettingsIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
