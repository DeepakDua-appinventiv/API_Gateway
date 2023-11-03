import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { SharesModule } from './shares/shares.module';
import { SharesController } from './shares/shares.controller';

@Module({
  imports: [UsersModule, SharesModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
