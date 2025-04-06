import React, { useState } from 'react';
import '../css/dialpad.css';

const DialPad = () => {
  const [input, setInput] = useState('');

  const handleKeyPress = (key) => {
    setInput((prev) => prev + key);
  };

  const handleBackspace = () => {
    setInput((prev) => prev.slice(0, -1));
  };

  const handleCall = () => {
    // Placeholder: You can add functionality here later
    console.log('Calling', input);
  };

  return (
    <div className="dialpad-container">
      <div className="dialpad-display">
        <input
          type="text"
          value={input}
          readOnly
          placeholder="Enter number"
        />
        <button className="backspace" onClick={handleBackspace}>⌫</button>
      </div>

      <div className="dialpad-grid">
        {['1','2','3','4','5','6','7','8','9','*','0','#'].map((key) => (
          <button
            key={key}
            className="dialpad-key"
            onClick={() => handleKeyPress(key)}
          >
            {key}
          </button>
        ))}
      </div>

      <button className="call-button" onClick={handleCall}>
        Call
      </button>
    </div>
  );
};

export default DialPad;