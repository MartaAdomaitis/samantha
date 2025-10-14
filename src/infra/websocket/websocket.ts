import { randomUUID } from "node:crypto";
import { io } from "../../../main/websocket-server"
import { Socket } from "socket.io";

export default class Websocket {
  public async initialize() {
    io.on("connection", (socket: Socket) => {
      const userId = socket.handshake.auth.userId || socket.id;
      const roomId = randomUUID();
      
      socket.join(roomId);
      
      socket.emit("room_joined", { roomId, userId });

      socket.on("send_message", (data: any) => {
        console.log("📥 Received message:");
        console.log("   - Content:", data.message);
        console.log("   - Sender:", data.sender);
        console.log("   - Room ID:", data.roomId);
        console.log("   - Socket ID:", socket.id);
        console.log("   - Timestamp:", data.timestamp);
        // TO DO: add message treatment service
        
        socket.to(data.roomId).emit("message", {
          message: data.message,
          sender: data.sender,
          timestamp: data.timestamp
        });
      });

      socket.on("user_joined", (data: any) => {
        socket.to(data.roomId).emit("user_joined", {
          username: data.username,
          userId: data.userId
        });
      });

      socket.on("disconnect", async () => {
        const sockets = await io.in(userId).fetchSockets();
        if (sockets.length === 0) {
          // no more active connections for the given user
        }
      });
    });
  }

  public async emit(message: string, room: string) {
    io.to(room).emit("message", {
      message: message,
      sender: "Samantha",
      timestamp: new Date()
    });
  }  
}