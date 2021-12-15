import EventEmitter from 'events';

export class Channel extends EventEmitter {
  constructor(ws) {
    super();
    this.connections = new Set();
    this.ws = ws;
    this.ws.on('message', (...args) => {
      this.emit('message', ...args);
      this.connections.forEach(peer => peer.send(...args));
    });
    this.ws.on('close', (...args) => {
      this.emit('close', ...args);
      this.destory();
    });
  }
  send(message) {
    this.ws.send(message);
    return this;
  }
  join(peer) {
    if (this.connections.has(peer)) return peer;
    this.connections.add(peer);
    peer.on('message', message => this.send(message));
    peer.on('close', () => this.connections.delete(peer));
    return peer;
  }
  destory() {
  }
}

export class ChannelManager extends EventEmitter {
  constructor() {
    super();
    this.clients = new Map();
    setInterval(() => {
      console.log('clients: ', this.clients.size);
    }, 3000);
  }
  create(id, ws) {
    let { connect } = ws;
    const channel = new Channel(ws);
    if (connect && this.clients.has(connect)) {
      console.log('connect', connect);
      connect = this.clients.get(connect);
      channel.join(connect);
    }
    channel.on('close', () => this.remove(id));
    this.clients.set(id, channel);
    return channel;
  }
  remove(id) {
    this.clients.delete(id);
    return this;
  }
  broadcast(message) {
    this.clients.forEach(channel => channel.send(message));
    return this;
  }
}