import React, { useState } from 'react';
import useChat from '../hooks/useChat';
import ChatWindow from './ChatWindow';

const ChatBox = () => {
  const { connect, disconnect, sendMessage, setMessage, connection, message, messages } = useChat();

  const [username, setUsername] = useState('');

  const handleConnect = async () => {
    await connect(username);
    setUsername('');
  };

  return (
    <div className="container">
      <div className="row">
        <div>
          {!connection ? (
            <>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="İsminizi girin..."
                className="form-control mb-2"
              />
              <button onClick={() => handleConnect(username)}>Bağlantı Kur</button>
            </>
          ) : (
            <button onClick={disconnect} style={{ marginLeft: '10px' }}>
              Bağlantıyı Sonlandır
            </button>
          )}

          {connection && (
            <ChatWindow
              messages={messages}
              message={message}
              setMessage={setMessage}
              sendMessage={sendMessage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
