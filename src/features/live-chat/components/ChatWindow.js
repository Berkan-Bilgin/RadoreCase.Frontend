import React from 'react';

const ChatWindow = ({ messages, message, setMessage, sendMessage }) => {
  return (
    <div className="card chat-window">
      <div className="card-header bg-primary text-white">Chat</div>
      <div className="card-body chat-body" style={{ height: '300px', overflowY: 'scroll' }}>
        {messages.map((m, index) => (
          <div key={index} className="chat-message">
            <strong>{m.user}:</strong> {m.message}
          </div>
        ))}
      </div>
      <div className="card-footer">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Mesajınızı yazın..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="input-group-append">
            <button className="btn btn-primary" type="button" onClick={sendMessage}>
              Gönder
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
