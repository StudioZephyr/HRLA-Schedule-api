
import SocketIo from 'socket.io';
import http from 'http';
import clientEvents from './clientEvents.js';

export const server = http.createServer((request, response) => {
  if (request.method === 'GET') {
    io.sockets.emit('updateRequest');
    response.end();
  }
});
export const io = SocketIo(server);

io.on('connection', (client)=> {
  console.log('client connected');
  for (let ioEvent in clientEvents) {
    client.on(ioEvent, clientEvents[ioEvent].bind(null, {io, client}))
  }
})

export default { server, io };