import React, { useState } from "react";
import Chatbot from "./Components/Chatbot/Chatbot"
import Recorder from "./Components/Recorder/Recorder"
import test from "./Images/giphy.gif"
import { ImageBackground } from 'react-native';

function App() {
  return (
    <div
    >
       <ImageBackground source={test} style={{width: '100%', height: '100vh',flex:1,
  display: "flex",
justifyContent: "center",
alignItems: "center" }}>
       <Chatbot/>
       <Recorder/>
       </ImageBackground> 
    </div>
  );
}

export default App;
