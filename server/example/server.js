import http, { createServer } from 'http';
import {  WebSocketBridge} from '../index.js';

const server = createServer((req, res) => {
  res.end('ok');
});

const wss = new WebSocketBridge({ server });
server.on('upgrade', wss.handleUpgrade(ws => {
  console.log('websocket was connected', ws);
}));

server.listen(3000);