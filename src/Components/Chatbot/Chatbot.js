import React, { useState,useEffect } from "react";
import { getAudioStream } from "../Audio/audio";
import { audio,merger,setMerger } from "../Recorder/Recorder"
import { useSpeechSynthesis } from 'react-speech-kit';
import { test123, sethiddenvar } from "../../App.js"
var AWS = require('aws-sdk');
var control = 0;
var dialogstate1 =0;


function Chatbot(props) {
//const[testvar, setvar] = useState('')
const[APIres, setresponse] = useState("Say 'hi robot' to start")


useEffect(() => {
  setInterval(() => {
    //console.log('Interval triggered');
    if(merger === 1){
      setMerger(0)
      Lexresponse();
      
    }
    return() => {
        lexruntime=""
    }
  }, 200);

})



var params = {
  botAlias: 'pizzaorderingbot', /* required */
  botName: 'pizzabotdup', /* required */
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

function PostToAPI(input) {
  params.inputStream = input
  return lexruntime.postContent(params, test1()).promise();
} 

let audioUrl1
const { speak } = useSpeechSynthesis();

async function Lexresponse() {

  console.log("2")
  let response = await PostToAPI(audio);
  console.log(response);
  let { message,dialogState,intentName } = response

  dialogstate1 = dialogState
  console.log(intentName)
  console.log(dialogState)
  console.log(message)
  
  speak({ text: message })
  setresponse(message)
  if(intentName === "location"){
    await props.sethiddenvar()
    console.log(props.test123)
  }
  
}


  return (
    <div 
      style = {{
        color: "#fbc02d"
      }}>
      <h2>{APIres}</h2>
    </div>
  );
}

function setdialogstate(value){
  dialogstate1 = value
}

export {control,dialogstate1,setdialogstate}
export default Chatbot;

//<button onClick = {showText}>Test</button>