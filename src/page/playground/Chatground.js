import React, { useState } from 'react';
import ChatBox from '../../features/live-chat/components/ChatBox';
import './Chatground.css';

const Chatground2 = () => {
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

export default Chatground2;
