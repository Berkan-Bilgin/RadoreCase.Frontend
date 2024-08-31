import React, { useState } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';

const LiveChat = () => {
  const [connection, setConnection] = useState(null);
  const [rooms, setRooms] = useState([]); // Odaların listesini tutmak için state
  const [currentRoom, setCurrentRoom] = useState(null); // Şu anki oda
  const [messages, setMessages] = useState([]); // Mesajları tutmak için state
  const [message, setMessage] = useState(''); // Kullanıcının yazdığı mesaj

  const handleConnect = async () => {
    const newConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:7041/chat') // Backend SignalR hub URL'nizi burada belirtin
      .withAutomaticReconnect()
      .build();

    try {
      await newConnection.start();
      console.log('SignalR bağlantısı kuruldu.');
      setConnection(newConnection);

      newConnection.invoke('AddAdminToGroup'); // Admin'i gruba ekleyin

      newConnection.on('ReceiveRoomList', (roomList) => {
        // Oda listesini güncelle
        setRooms(roomList);
      });

      newConnection.on('ReceiveMessages', (loadedMessages) => {
        console.log('Gelen Mesajlar:', loadedMessages);
        setMessages(loadedMessages); // Mesaj geçmişini state'e al
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
        setConnection(null); // Bağlantıyı temizle
        setRooms([]); // Oda listesini temizle
        setMessages([]); // Mesajları temizle
        setCurrentRoom(null); // Şu anki odayı temizle
      } catch (e) {
        console.log('Bağlantı kesilemedi: ', e);
      }
    }
  };

  const joinRoom = async (room) => {
    if (connection) {
      try {
        await connection.invoke('JoinRoom', room);
        console.log(`Odaya katıldı: ${room}`);
        setCurrentRoom(room); // Şu anki odayı ayarla

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
        setMessage(''); // Mesaj kutusunu temizle
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
              <div className="card chat-window">
                <div
                  className="card-body chat-body"
                  style={{ height: '300px', overflowY: 'scroll' }}
                >
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
