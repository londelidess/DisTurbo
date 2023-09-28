import React from "react";
// import { useSelector } from 'react-redux'
import {useAppSelector} from "./app/hooks";
import "./App.scss";
import Sidebar from "./components/sidebar/Sidebar";
import Chat from "./components/chat/Chat";
import Login from "./components/login/Login"

function App() {
  const user = useAppSelector((state) => state.user);
// const user = null
  return (
    <div className="App">
      {user ? (
        <>
          {/* sidebar */}
          <Sidebar />
          {/* chat */}
          <Chat />
        </>
      ) : (
        <><Login /></>
      )}
    </div>
  );
}

export default App;
