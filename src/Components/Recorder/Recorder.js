import React, { Component, setState } from 'react';
import RecorderJS from 'recorder-js';
import { getAudioStream, exportBuffer } from "../Audio/audio"
import hark from 'hark'
import styled from "styled-components";
import showText from '../Chatbot/Chatbot';
import Chatbot, {control,dialogstate1,setdialogstate} from '../Chatbot/Chatbot'


var audio = ""
var Stoptest = 1;
var merger = 0;

function setMerger(value){
  merger = value
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stream: null,
      recording: false,
      recorder:  new RecorderJS()
    };  
    

  }

  

  async componentDidMount() {
    let stream;

    try {
      stream = await getAudioStream();
    } catch (error) {
      // Users browser doesn't support audio.
      // Add your handler here.
      console.log(error);
    }

    this.setState({ stream });

    setInterval(() => {
      /* if dialog state from return response from lex is "ElicitSlot", recording will be start again and 
      record what user is saying, this is so that the conversation is a flow and does not require a continous trigger(button)
      to initiate conversation */
      if(dialogstate1 === 'ElicitSlot'){
        this.startRecord()
        setdialogstate("")
      }
      /* Stoptest variable is created to checked when user finished speaking and stop the recording*/
      if (Stoptest === 0)
      {
      this.stopRecord()
      console.log('1')
      Stoptest = 1;
    }
    }, 1);
  }


    /*Once recording is started, hark will start.
    Hark is a platform is will automatically detect whether the user is talking or not
    Once user stops talking, the recording will then be stopped
    The next person that edits the codes should find another hark as hark is unreliable and
    it does not work very well so highly suggested to change it LOL*/
    startRecord() {

    console.log("test")
    const { stream } = this.state;
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const recorder = new RecorderJS(audioContext);
    recorder.init(stream);

    this.setState(
      {
        recorder,
        recording: true
      },
      () => {
        recorder.start();
      }
    );
    var speechEvents = hark(stream);
      speechEvents.on('speaking', function() {
      console.log('speaking');
    });
    
    speechEvents.on('stopped_speaking', function() {
      console.log('stopped_speaking');
      Stoptest = 0 
      speechEvents.stop()
    })
    
  }
   /*This function is used to stop the recording of the user and export it to the format which 
   lex will be able to accept before sending to lex(Chatbot), it will also set merger variable value to one to initiate 
   the sending of data to lex function in ChatBot.js */ 
   async stopRecord() {
     //try{
    const { recorder } = this.state;
    var { buffer } = await recorder.stop()
    audio = exportBuffer(buffer[0]);
    // Process the audio here.
    console.log(audio);
    console.log("3")
     //}
     //catch{
       //console.log("error")
     //}
    this.setState({recording: false});
    merger = 1;
  }

  async playRecord() {
    let audioUrl = URL.createObjectURL(audio);
    let audio1 = new Audio(audioUrl);
    audio1.play();

  }
  
  /*To render the button if mic is detected*/
  render() {
    const { recording, stream } = this.state;

    // Don't show record button if their browser doesn't support it.
    if (!stream) {
      return null;
    }

    const Button = styled.button`
    background-color: black;
    color: white;
    font-size: 20px;
    padding: 10px 60px;
    border-radius: 5px;
    margin: 10px 0px;
    cursor: pointer;
    &:disabled {
    color: grey;
    opacity: 0.7;
    cursor: default;
  }
`;
    

    return (
      <div>
      <Button onClick={() => {
          recording ? this.stopRecord() : this.startRecord();
        }}
        >
        {recording ? 'Stop Recording' : 'Start Recording'}
      </Button>
      </div>
    );
  }
}
//<button onClick = {this.playRecord}>play</button>
export { merger, setMerger }
export { audio }
export default App;
