import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { OrdersController } from './orders.controller';
import { ORDERS_SERVICE_NAME, ORDERS_PACKAGE_NAME } from './orders.pb';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: ORDERS_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50053',
          package: ORDERS_PACKAGE_NAME,
          protoPath: 'node_modules/grpc-nest-proto/proto/orders.proto',
        },
      },
    ]),
    UsersModule
  ],
  controllers: [OrdersController]
})
export class OrdersModule {}
