import React, { useState } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';

const ChatBox = () => {
  const [connection, setConnection] = useState(null);
  const [roomName, setRoomName] = useState(null);
  const [message, setMessage] = useState(''); // Kullanıcının yazdığı mesaj
  const [messages, setMessages] = useState([]); // Tüm mesajları tutmak için state

  const handleConnect = async () => {
    if (!connection) {
      const newConnection = new HubConnectionBuilder()
        .withUrl('https://localhost:7041/chat') // Backend SignalR hub URL'nizi burada belirtin
        .withAutomaticReconnect()
        .build();

      setConnection(newConnection);

      try {
        await newConnection.start();
        console.log('SignalR bağlantısı kuruldu.');
        console.log(newConnection);
        console.log('connection', connection);

        // Odayı burada kurabilirsiniz
        const room = `room-${newConnection.connection.connectionId}`; // Örnek olarak benzersiz bir oda adı
        setRoomName(room);

        await newConnection.invoke('JoinRoom', room);
        console.log(`Odaya katıldı: ${room}`);

        //Tüm mesajları dinliyor belki kendimiz dışındaki tüm mesajları dinleyebiliriz.
        newConnection.on('ReceiveMessage', (user, message) => {
          setMessages((prevMessages) => [...prevMessages, { user, message }]);
        });
      } catch (e) {
        console.log('Bağlantı veya oda kurulamadı: ', e);
      }
    } else {
      console.log('Zaten bağlantı mevcut.');
    }
  };

  const sendMessage = async () => {
    if (connection && message) {
      try {
        await connection.invoke('SendMessage', roomName, 'User1', message); // User1 adıyla mesaj gönder
        // setMessages((prevMessages) => [...prevMessages, { user: 'User1', message }]);
        setMessage(''); // Mesaj kutusunu temizle
        console.log('mesaj gönderildi');
      } catch (e) {
        console.error('Mesaj gönderilemedi:', e);
      }
    }
  };

  const handleDisconnect = async () => {
    if (connection) {
      try {
        await connection.stop();
        console.log('SignalR bağlantısı kesildi.');
        setConnection(null); // Bağlantıyı temizle
        setRoomName(null); // Oda ismini temizle
      } catch (e) {
        console.log('Bağlantı kesilemedi: ', e);
      }
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <h2>Chat Box</h2>
          <button onClick={handleConnect}>Bağlantı Kur</button>
          {connection && (
            <button onClick={handleDisconnect} style={{ marginLeft: '10px' }}>
              X
            </button>
          )}
          {connection && (
            <div className="card chat-window">
              <div className="card-header bg-primary text-white">Chat</div>
              <div className="card-body chat-body" style={{ height: '300px', overflowY: 'scroll' }}>
                <div className="chat-message">
                  <strong>User1:</strong> Merhaba!
                </div>
                <div className="chat-message">
                  <strong>User2:</strong> Merhaba, nasılsın?
                </div>
                {messages.map((m, index) => (
                  <div key={index} className="chat-message">
                    <strong>{m.user}:</strong> {m.message}
                  </div>
                ))}
                {/* Daha fazla mesaj buraya eklenecek */}
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

export default ChatBox;
