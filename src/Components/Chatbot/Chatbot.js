import React, { useState,useEffect } from "react";
import { getAudioStream } from "../Audio/audio";
import { audio,merger,setMerger } from "../Recorder/Recorder"
import { useSpeechSynthesis } from 'react-speech-kit';
import { test123, sethiddenvar } from "../../App.js"
var AWS = require('aws-sdk');
var control = 0;
var dialogstate1 =0;


function Chatbot(props) {
/* APIres is the text variable in the web App */
const[APIres, setresponse] = useState("Say 'hi robot' to start")


useEffect(() => {
  setInterval(() => {
    /* merger is to initiated the sending of audio data from user to lex */
    if(merger === 1){
      setMerger(0)
      Lexresponse();
      
    }
    return() => {
        lexruntime=""
    }
  }, 200);

})


/* params contains the paramaters of the bot which the robot will be using.
   botAlias, botName, contentType, inputStream are required.
   inputstream has been defined below to take in the audio file that is recorded and 
   exported to the format which lex accepts */
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

/* contains the login credentials required to accept AWS. 
   New and existing identity pool can be created/found at https://console.aws.amazon.com/cognito/home?region=us-east-1# 
   Region and Id has to be given or else identity will not be found */
AWS.config.region = 'us-east-1'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  // Provide your Pool Id here
      IdentityPoolId: 'us-east-1:a965f9d5-6111-4304-8cd7-df318a38551d',
  });

/* Creating a lexruntime environment */
var lexruntime = new AWS.LexRuntime();

/* Function for postcontent lex to check for errors, not essential */
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

/* Posting the information received to lex, parameters defined above are used here to
   define which chatbot you using */
function PostToAPI(input) {
  params.inputStream = input
  return lexruntime.postContent(params, test1()).promise();
} 

/* usespeechsynthesis convert text to speech
Lexresponse function sending the info and receive the response
response are then dissected to the various variable to be used */
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