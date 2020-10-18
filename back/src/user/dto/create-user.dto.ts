import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
  
  @ApiProperty()
  readonly userName: String;

  @ApiProperty()
  readonly password: String;

  @ApiProperty()
  readonly name: String;

  @ApiProperty()
  readonly lastname: String;

  @ApiProperty()
  readonly imgProfile: String;

  @ApiProperty()
  readonly lastLogin: Date;

  @ApiProperty()
  readonly createAt: Date;
}
