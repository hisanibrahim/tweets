const tweets = new Set();
const tweets = new Map();

class Connection {
  constructor(io, socket) {
    this.socket = socket;
    this.io = io;

    socket.on('getMessages', () => this.getMessages());
    socket.on('disconnect', () => this.disconnect());
    socket.on('connect_error', (err) => {
      console.log(`connect_error due to ${err.message}`);
    });
  }
  
  getMessages() {
    tweets.forEach((message) => this.sendMessage(message));
  }

  disconnect() {
    tweets.delete(this.socket);
  }
}

function tweets(io) {
  io.on('connection', (socket) => {
    new Connection(io, socket);   
  });
};

module.exports = tweets;