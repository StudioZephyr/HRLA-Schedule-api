
import { server } from './socket.js';


const PORT = process.env.SOCKET_PORT;


server.listen(PORT, ()=> {
  console.log(`Socket server is now listening in on port ${PORT}`);
})

