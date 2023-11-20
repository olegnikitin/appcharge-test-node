import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty({
    example: '967652d6-41f4-4b0b-8a2d-b4bca3cb959d'
  })
  sessionId: string;
}
