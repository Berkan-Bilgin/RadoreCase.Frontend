import React, { useState } from 'react';
import ChatBox from './components/ChatBox';

const LiveChatUser = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatWindow = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button className="chat-button" onClick={toggleChatWindow}>
        Canlı Destek
      </button>

      <div className="chat-window" style={{ display: isOpen ? 'block' : 'none' }}>
        <div className="chat-window-header">
          <h5>Canlı Destek</h5>
          <button onClick={toggleChatWindow}>X</button>
        </div>
        <ChatBox />
      </div>
    </div>
  );
};

export default LiveChatUser;
