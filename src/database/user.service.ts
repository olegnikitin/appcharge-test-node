import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';

type TUserCreds = {
  playerId: string
  password: string
}

@Injectable()
export class UserService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  getUser({ playerId, password }: TUserCreds) {
    return this.redis.hget(playerId, password);
  }
}