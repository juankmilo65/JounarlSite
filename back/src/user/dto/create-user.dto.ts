import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Schema, Types } from 'mongoose';
import { RoleSchema } from '../../role/schema/role.schema';

export class CreateUserDTO {

  @ApiProperty()
  email: String;

  @ApiProperty()
  password: String;

  @ApiProperty()
  _id: String;

  @ApiProperty()
  userName: String;

  @ApiProperty()
  name: String;

  @ApiProperty()
  lastname: String;

  @ApiProperty()
  imgProfile: String;

  @ApiProperty()
  lastLogin: Date;

  @ApiProperty()
  createAt: Date;

  @ApiProperty()
  role: String;
}
