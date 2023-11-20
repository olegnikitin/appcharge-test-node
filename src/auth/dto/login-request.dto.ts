import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginRequestDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    required: true,
    description: 'playerId',
    example: 'playerId1',
  })
  playerId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    required: true,
    description: 'password',
    example: 'Secure_P@ssw0rD!',
  })
  password: string;
}
