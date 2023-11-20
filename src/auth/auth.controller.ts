import {
  Body,
  Controller, HttpCode,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginRequestDto } from './dto/login-request.dto';

@Controller('/auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Login' })
  @Post('/login')
  @HttpCode(200)
  @ApiResponse({ type: LoginResponseDto })
  public async login(@Body() body: LoginRequestDto): Promise<LoginResponseDto> {
    return this.authService.login(body)
  }
}
