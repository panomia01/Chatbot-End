import React, { useState } from "react";
import Chatbot from "./Components/Chatbot/Chatbot"
import Recorder from "./Components/Recorder/Recorder"
import test from "./Components/Images/giphy.gif"
import { withScriptjs } from "react-google-maps";
import { ImageBackground } from 'react-native';
import Map from './Components/Google/Google';
import { render } from 'react-dom';


function App() {
  const [test123, settest123] = useState(false)
  const MapLoader = withScriptjs(Map);

  const sethiddenvar = () => {
  if (test123 === true) 
  {
  settest123(false) 
  }
  else if (test123 === false)
  {
  settest123(true)  
  }
}
  return (
    <div
    >
       <ImageBackground source={test} style={{width: '100%', height: '100vh',flex:1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center" }}>
       <Chatbot test123={test123} sethiddenvar={sethiddenvar}/>
       <Recorder/>
       <div hidden = {test123}>
          <MapLoader
              googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCyxo_rSHzw3wXKZt0ictZVVlVNrf0EV-k"
              loadingElement={<div style={{ height: `100%` }} />}
          />
       </div>
       </ImageBackground> 
    </div>
  );
}

render(<App />, document.getElementById('root'));
export default App;
