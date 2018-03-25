import SocketIo from 'socket.io';
import http from 'http';

const server = http.createServer();
const io = SocketIo(server);

const PORT = process.env.SOCKET_PORT;

io.on('connection', (client)=> {
  console.log('client connected');
  
})

server.listen(PORT, ()=> {
  console.log(`Socket server is now listening in on port ${PORT}`);
})