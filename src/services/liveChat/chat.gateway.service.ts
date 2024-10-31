import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  private users: { [userId: string]: string } = {}; // userId -> socket.id eşlemesi
  private rooms: { [roomId: string]: string[] } = {}; // roomId -> socket.id listesi

  @SubscribeMessage('joinRoom')
  handleJoinRoom(
    @MessageBody() data: { roomId: string; userId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const { roomId, userId } = data;

    this.users[userId] = client.id;

    client.join(roomId);

    if (!this.rooms[roomId]) {
      this.rooms[roomId] = [];
    }
    this.rooms[roomId].push(client.id);

    console.log(`User ${userId} joined room: ${roomId}`);
  }

  @SubscribeMessage('sendMessage')
  handleMessage(
    @MessageBody()
    message: {
      event: string;
      data: { roomId: string; sender: string; text: string };
    },
  ) {
    console.log('Received message:', message);

    const { roomId, sender, text } = message.data;

    this.server.to(roomId).emit('receiveMessage', { sender, text });

    console.log(`Message sent in room ${roomId}: ${text}`);
  }

  handleDisconnect(client: Socket) {
    for (const roomId in this.rooms) {
      this.rooms[roomId] = this.rooms[roomId].filter((id) => id !== client.id);
      if (this.rooms[roomId].length === 0) {
        delete this.rooms[roomId];
      }
    }
    console.log(`Client disconnected: ${client.id}`);
  }
}
