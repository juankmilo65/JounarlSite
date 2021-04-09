import { ApiProperty } from '@nestjs/swagger';

export class LoginDTO {
    @ApiProperty()
    readonly email: String;

    @ApiProperty()
    readonly password: String;
  }