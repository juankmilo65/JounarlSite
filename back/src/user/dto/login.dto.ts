import { ApiProperty } from '@nestjs/swagger';

export class LoginDTO {
    @ApiProperty()
    readonly userName: String;

    @ApiProperty()
    readonly password: String;
  }