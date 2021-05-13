import React, { useState } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
 
function Example() {
  const [value, setValue] = useState('');
  const { speak } = useSpeechSynthesis();
  let utterance = new SpeechSynthesisUtterance("Hello world!");
 

  const test = () => {
    speak({ text: value })
    //speechSynthesis.speak(utterance);
  }
  return (
    <div>
      <textarea
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <button onClick={test}>Speak</button>
    </div>
  );
}

export default Example
