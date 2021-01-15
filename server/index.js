import WebSocketServer from './server.js';
import { ChannelManager } from './channel.js';

class WebSocketBridge extends WebSocketServer {
  constructor(...options) {
    super(...options);
    this.channelManager = new ChannelManager();
    this.on('connection', ws => this.channelManager.create(ws.id, ws));
  }
}

export {
  WebSocketServer,
  WebSocketBridge,
};
