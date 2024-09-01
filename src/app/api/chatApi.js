import { HubConnectionBuilder } from '@microsoft/signalr';

const SIGNALR_URL = process.env.REACT_APP_SIGNALR_URL;
// const SIGNALR_URL = 'https://localhost:7041/chat';

export const createConnection = async () => {
  const newConnection = new HubConnectionBuilder()
    .withUrl(SIGNALR_URL)
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
