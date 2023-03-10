import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

import socketIOClient from "socket.io-client";
import { io } from "socket.io-client";
import ChatWindow from './components/ChatWindow';
import Home from './components/Home';



const ENDPOINT = "http://localhost:8000";
// const ENDPOINT = "http://172.24.9.112:8000";
//const ENDPOINT = "http://ec2co-ecsel-nz5uvdeupfu0-2013886296.us-east-1.elb.amazonaws.com";



function App() {

  const [response, setResponse] = useState("");
  const [socket, setSocket] = useState(null);
  const [socketId, setSocketId] = useState('');

  useEffect(() => {
    const socketIO = io(ENDPOINT);
    socketIO.on("connect", () => {
      setSocketId(socketIO.id);
      setSocket(socketIO);
    });    

    return () => {
      socketIO.emit("UserIsOffline", localStorage.getItem('userId'));
      socketIO.disconnect();
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/chat' element={<ChatWindow 
                                          socket={socket} 
                                          socketId={socketId}
                                          ENDPOINT={ENDPOINT} 
                                          />} 
                                        />
        </Routes>
      </BrowserRouter> 
    </div>
  );
}

export default App;
