import { Module } from '@nestjs/common';
import { ChatGateway } from '../services/liveChat/chat.gateway.service';

@Module({
  providers: [ChatGateway],
})
export class ChatModule {}
