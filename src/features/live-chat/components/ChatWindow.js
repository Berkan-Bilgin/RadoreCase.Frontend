import React from 'react';
import './index.css';

const ChatWindow = ({ messages, message, setMessage, sendMessage }) => {
  return (
    <div>
      <div className="messageArea">
        {messages.map((m, index) => (
          <div key={index} className="chat-message">
            <strong>{m.user}:</strong> {m.message}
          </div>
        ))}
      </div>

      <div className="input-group submit-button">
        <input
          type="text"
          className="form-control"
          placeholder="Mesajınızı yazın..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="input-group-append ">
          <button className="btn btn-primary" type="button" onClick={sendMessage}>
            Gönder
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
