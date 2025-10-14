import fastify from "fastify";
import { env } from "../src/infra/config/env"
import { Server } from "socket.io";
import Websocket from "../src/infra/websocket/websocket";

const socketServer = fastify();
export const io = new Server(socketServer.server, {
    cors: {
      origin: "*"
    }
  });

const start = async () => {
  try {
    await socketServer.listen({ port: env.SOCKET_PORT });
    console.log(`⚙️  Websocket server is running on port ${env.SOCKET_PORT}`);
    await new Websocket().initialize();
  } catch (err) {
    socketServer.log.error(err);
    process.exit(1);
  }
};

start();
