import React, { useState,useEffect } from "react";
import { getAudioStream } from "../Audio/audio";
import { audio,merger,setMerger } from "../Recorder/Recorder"
import { useSpeechSynthesis } from 'react-speech-kit';
import App from '../Recorder/Recorder'

var AWS = require('aws-sdk');
var control = 0;
function Chatbot() {
//const[testvar, setvar] = useState('')
const[APIres, setresponse] = useState()

/*const data = {
  "input" : "pizza"
}*/


useEffect(async () => {
  setInterval(() => {
    //console.log('Interval triggered');
    if(merger === 1){
      setMerger(0)
      showText();
    }
  }, 100);
})



var params = {
  botAlias: 'pizzabot', /* required */
  botName: 'PizzaOrderingBot', /* required */
  //inputText: `input`, /* required */
  contentType: 'audio/x-l16; sample-rate=16000; channel-count=1', /*required audio/x-l16; sample-rate=16000; channel-count=1*/
  //inputStream: input,
  accept: 'text/plain; charset=utf-8',
  userId: 'Test'/* required */
  //sessionAttributes: {}
  //requestAttributes: any /* This value will be JSON encoded on your behalf with JSON.stringify() */,
  //sessionAttributes: any /* This value will be JSON encoded on your behalf with JSON.stringify() */
};

AWS.config.region = 'us-east-1'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  // Provide your Pool Id here
      IdentityPoolId: 'us-east-1:a965f9d5-6111-4304-8cd7-df318a38551d',
  });
var lexruntime = new AWS.LexRuntime();
const test1 = (err, data) => {
  if (err) 
  {
      console.log(err, err.stack); // an error occurred
      console.log("1")
  }
  else     
  {
      console.log(data); 
      console.log("2")
  }
}

async function PostToAPI(input) {
  /*return fetch('https://tynysqld0f.execute-api.us-east-1.amazonaws.com/test', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/octet-stream',
    },
    body: JSON.stringify(input)
  }).then(data => data.json())*/
  
  params.inputStream = input
  return lexruntime.postContent(params, test1()).promise();
  
} 
let audioUrl1
const { speak } = useSpeechSynthesis();
async function showText() {
  /*try {
    let response = fetch('https://4y8vwpmd92.execute-api.us-east-1.amazonaws.com/test', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
  }
  catch (error) {
    console.error(error);
  }*/
  /*console.log(audio)
  var data = {
    input : audio
  }
  console.log(data)*/
  let response = await PostToAPI(audio);
  console.log(response);
  //let audioUrl = URL.createObjectURL(response);
  //let audio1 = new Audio(audioUrl);
  //audio1.play();
  //setresponse(JSON.stringify(response))
  /*let { audioStream } = responsnpm i react-scriptse
  console.log(audioStream)
  let audioblob2 = new Blob(audioStream)
  console.log(audioblob2)
  audioUrl1 = URL.createObjectURL(audioStream);
  let audio2 = new Audio(audioUrlnpm i react-scripts1);
  audio2.play()
  .catch(error => {
    console.log("error")
    //  when an exception is played, the exception flow is followed 
  })*/
  //let audioUrl1 = URL.createObjectURL(audioStream);
  //let audio2 = new Audio(audioStream);
  //audio2.play();
  let { message } = response
  console.log(message)
  await speak({ text: message })
  setresponse(message)
}

const playblob = () => {
  let audio2 = new Audio(audioUrl1);
  audio2.play()
}

const testaudio = () => {
  //speak({ text: value })
  showText()
  speak({ text: APIres })
}

  return (
    <div>
      <h2>{APIres}</h2>
    </div>
  );
}

export {control}
export default Chatbot;

//<button onClick = {showText}>Test</button>