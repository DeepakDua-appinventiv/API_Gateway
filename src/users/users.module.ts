import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UsersController } from './users.controller';
import { USERS_SERVICE_NAME, USERS_PACKAGE_NAME, WALLET_SERVICE_NAME } from './users.pb';
import { UsersService } from './users.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: USERS_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50051',
          package: USERS_PACKAGE_NAME,
          protoPath: 'node_modules/grpc-nest-proto/proto/users.proto',
        },
      },
    ]),
    ClientsModule.register([
      {
        name: WALLET_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50051',
          package: USERS_PACKAGE_NAME,
          protoPath: 'node_modules/grpc-nest-proto/proto/users.proto',
        },
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}

