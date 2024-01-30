import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
// import { Server } from 'http';
import * as fs from 'fs';
import { join } from 'path';

@WebSocketGateway(8080, { cors: '*' })
export class MsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  handleMessage(@MessageBody() ms: string): void {
    console.log(ms);

    this.server.emit('message', ms);
  }

  private readonly chunkSize = 1024 * 1024;

  @SubscribeMessage('startVideo')
  startVideoBroadcast(@MessageBody() data: any, client: Socket) {
    console.log(data);
    this.server.emit('videoTime', data);
  }

  @SubscribeMessage('video')
  handleVideoRequest(client: Socket): void {
    const path = join(
      __dirname,
      '..',
      '..',
      'storage',
      'video-1706050201132-675629205.mp4',
    );

    console.log(path);

    fs.readFile(path, (err, data) => {
      if (err) {
        client.emit('videoError', 'Error reading file');
        return;
      }

      for (let i = 0; i < data.length; i += this.chunkSize) {
        const chunk = data.slice(i, i + this.chunkSize);
        client.emit('videoChunk', {
          chunk,
          isFinal: i + this.chunkSize >= data.length,
        });
      }
    });
  }
}
