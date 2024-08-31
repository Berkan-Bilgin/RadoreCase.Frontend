import React, { useState } from 'react';
import useChat from '../hooks/useChat';
import ChatWindow from './ChatWindow';

const ChatBox2 = () => {
  const { connect, disconnect, sendMessage, setMessage, connection, message, messages } = useChat();

  const [isChatWindowOpen, setIsChatWindowOpen] = useState(true);

  const toggleChatWindow = () => {
    setIsChatWindowOpen((prevState) => !prevState);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <h2>Chat Box2</h2>
          {!connection ? (
            <button onClick={connect}>Bağlantı Kur</button>
          ) : (
            <button onClick={disconnect} style={{ marginLeft: '10px' }}>
              Bağlantıyı Sonlandır
            </button>
          )}
          <button onClick={toggleChatWindow}>
            {isChatWindowOpen ? 'Chat Penceresini Kapat' : 'Chat Penceresini Aç'}
          </button>
          {connection && isChatWindowOpen && (
            <ChatWindow
              messages={messages}
              message={message}
              setMessage={setMessage}
              sendMessage={sendMessage}
            />
          )}
        </div>
        <div className="col-md-6 bg-danger text-white">
          <p className="text-white">
            isConnected: {JSON.stringify(connection?.connection.connectionId)}
          </p>
          <p className="text-white">
            isConnected: {JSON.stringify(connection?.connection._connectionStarted)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatBox2;
