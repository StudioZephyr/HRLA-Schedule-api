import SocketIo from 'socket.io';
import http from 'http';

import clientEvents from './clientEvents.js';

const server = http.createServer();
const io = SocketIo(server);

const PORT = process.env.SOCKET_PORT;

io.on('connection', (client)=> {
  console.log('client connected');
  for (let ioEvent in clientEvents) {
    client.on(ioEvent, clientEvents[ioEvent].bind(null, {io, client}))
  }
  
})

server.listen(PORT, ()=> {
  console.log(`Socket server is now listening in on port ${PORT}`);
})