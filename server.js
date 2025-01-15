import { createServer } from 'node:http';
import next from 'next';
import { Server } from "socket.io";
const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 8087;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  // const io = new Server(httpServer);
  const io = new Server(httpServer, {
    cors: {
      origin: "*", // Allow all origins
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    // ...

    console.log(socket.id)
    // socket.on('variableFromClient', (data) => {
    //   console.log(data)
    //   socket.emit('variableFromServer', 'Hello from server')
    // });
    socket.on("variableFromApprove", (data) => {
        console.log(data);
        io.emit('directories', data)
      })
    socket.on("logging", (data) => {
      console.log("Server Logging Data " + data);
      io.emit("clientlogging", data)
    })
  });
  
  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});