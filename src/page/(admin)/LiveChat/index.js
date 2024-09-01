import React, { useState } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';

const LiveChat = () => {
  const [connection, setConnection] = useState(null);
  const [rooms, setRooms] = useState([]); // Odaların listesini tutmak için state
  const [currentRoom, setCurrentRoom] = useState(null); // Şu anki oda
  const [messages, setMessages] = useState([]); // Mesajları tutmak için state
  const [message, setMessage] = useState(''); // Kullanıcının yazdığı mesaj

  const connectionUrl = process.env.REACT_APP_SIGNALR_URL;

  const handleConnect = async () => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(connectionUrl)
      .withAutomaticReconnect()
      .build();

    try {
      await newConnection.start();
      console.log('SignalR bağlantısı kuruldu.');
      setConnection(newConnection);

      newConnection.invoke('AddAdminToGroup');

      newConnection.invoke('LoadRooms');

      newConnection.on('ReceiveRooms', (roomList) => {
        console.log(roomList);
        setRooms(roomList);
      });

      newConnection.on('ReceiveRoomList', (roomList) => {
        console.log(roomList);
        setRooms(roomList);
      });

      newConnection.on('ReceiveMessages', (loadedMessages) => {
        console.log('Gelen Mesajlar:', loadedMessages);
        setMessages(loadedMessages);
      });

      newConnection.on('ReceiveMessage', (user, message) => {
        // Mesajları güncelle
        setMessages((prevMessages) => [...(prevMessages || []), { user, message }]);
      });
    } catch (e) {
      console.log('Bağlantı kurulamadı: ', e);
    }
  };

  const handleDisconnect = async () => {
    if (connection) {
      try {
        await connection.stop();
        console.log('SignalR bağlantısı kesildi.');
        setConnection(null);
        setRooms([]);
        setMessages([]);
        setCurrentRoom(null);
      } catch (e) {
        console.log('Bağlantı kesilemedi: ', e);
      }
    }
  };

  const joinRoom = async (room) => {
    if (connection) {
      try {
        await connection.invoke('JoinRoomFromAdmin', room);
        console.log(`Odaya katıldı: ${room}`);
        setCurrentRoom(room);

        // Odadaki mesaj geçmişini yükle
        await connection.invoke('LoadMessages', room);
      } catch (e) {
        console.error('Odaya katılma hatası:', e);
      }
    }
  };

  const sendMessage = async () => {
    if (connection && message && currentRoom) {
      try {
        await connection.invoke('SendMessage', currentRoom, 'Admin', message);
        setMessage('');
      } catch (e) {
        console.error('Mesaj gönderilemedi:', e);
      }
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <h2>Admin Tarafı</h2>
          {!connection ? (
            <button onClick={handleConnect}>Bağlantı Kur</button>
          ) : (
            <button onClick={handleDisconnect}>X</button>
          )}
          <div>
            <h3>Oluşturulan Odalar:</h3>
            <ul>
              {rooms.map((room, index) => (
                <li key={index} onClick={() => joinRoom(room)} style={{ cursor: 'pointer' }}>
                  {room}
                </li>
              ))}
            </ul>
          </div>
          {currentRoom && (
            <div>
              <h3>Oda: {currentRoom}</h3>
              <div className="card ">
                <div className="card-body" style={{ height: '300px', overflowY: 'scroll' }}>
                  {messages.map((m, index) => (
                    <div key={index} className="chat-message">
                      <strong>{m.userName || m.user}:</strong> {m.message}
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveChat;
