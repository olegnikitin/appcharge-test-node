import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../database/user.service';
import { LoginRequestDto } from './dto/login-request.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
  ) {}

  async login(loginDto: LoginRequestDto): Promise<LoginResponseDto> {
    const isExists = await this.userService.getUser(loginDto);

    if (!isExists) {
      throw new BadRequestException('UserNotExists')
    }

    return {
      sessionId: uuidv4(),
    };
  }
}
