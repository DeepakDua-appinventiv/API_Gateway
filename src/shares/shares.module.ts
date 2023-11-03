import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SharesController } from './shares.controller';
import { SHARES_SERVICE_NAME, SHARES_PACKAGE_NAME } from './shares.pb';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: SHARES_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50052',
          package: SHARES_PACKAGE_NAME,
          protoPath: 'node_modules/grpc-nest-proto/proto/shares.proto',
        },
      },
    ]),
  ],
  controllers: [SharesController]
})
export class SharesModule {}
