import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { RedisModuleOptions } from '@liaoliaots/nestjs-redis/dist/redis/interfaces/redis-module-options.interface';

import { users } from '../seeds/seeds.json'

@Module({
  imports: [
    AuthModule,
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService,
      ): Promise<RedisModuleOptions> => ({
        readyLog: true,
        errorLog: true,
        closeClient: true,
        config: {
          host: configService.get('REDIS_HOST') || 'localhost',
          port: 6379,
          onClientCreated(client) {
            client.on('ready', () => {
              users.forEach(({playerId, password}) => {
                client.hset(playerId, { password })
              })
            });
          }
        }
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
