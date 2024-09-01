import { useState, useEffect } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';

const useChat = () => {
  const [connection, setConnection] = useState(null);
  const [roomName, setRoomName] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (connection) {
      connection.on('ReceiveMessage', (user, message) => {
        setMessages((prevMessages) => [...prevMessages, { user, message }]);
      });
    }
  }, [connection]);

  const createConnection = async () => {
    const newConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:7041/chat')
      .withAutomaticReconnect()
      .build();

    try {
      await newConnection.start();
      return newConnection;
    } catch (e) {
      console.error('Bağlantı kurulamadı: ', e);
      return null;
    }
  };

  const joinRoom = async (connection, room) => {
    try {
      await connection.invoke('JoinRoomFromUser', room);
    } catch (e) {
      console.error('Odaya katılamadı: ', e);
    }
  };

  const connect = async (name) => {
    if (!connection) {
      const newConnection = await createConnection();
      if (newConnection) {
        setConnection(newConnection);
        // const room = `room-${newConnection.connection.connectionId}`;
        const room = `${name}`;
        console.log(name);

        setRoomName(room);
        await joinRoom(newConnection, room);
      }
    }
  };

  const disconnect = async () => {
    if (connection) {
      try {
        await connection.stop();
        setConnection(null);
        setRoomName(null);
        setMessages([]);
      } catch (e) {
        console.error('Bağlantı kesilemedi:', e);
      }
    }
  };

  const sendMessage = async () => {
    if (connection && message) {
      try {
        await connection.invoke('SendMessage', roomName, roomName, message);
        setMessage('');
      } catch (e) {
        console.error('Mesaj gönderilemedi:', e);
      }
    }
  };

  return {
    connect,
    disconnect,
    sendMessage,
    setMessage,
    connection,
    message,
    messages,
  };
};

export default useChat;
