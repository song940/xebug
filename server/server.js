import { parse } from 'url';
import WebSocket from 'ws';

class WebSocketServer extends WebSocket.Server {
  constructor(options) {
    super({ ...options, noServer: false });
  }
  handleUpgrade(cb) {
    return (req, socket, head) => {
      const { query } = parse(req.url, true);
      super.handleUpgrade(req, socket, head, ws => {
        Object.assign(ws, query);
        cb && cb(ws);
        this.emit('connection', ws, req);
      });
    };
  }
}

export default WebSocketServer;