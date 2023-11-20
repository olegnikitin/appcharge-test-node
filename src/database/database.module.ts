import { Module } from '@nestjs/common';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { UserService } from './user.service';

@Module({
  imports: [RedisModule],
  providers: [UserService],
  exports: [UserService],
})
export class DatabaseModule {}
