import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserService } from './user.service';
import { User } from './interfaces/User';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/getUsers')
  getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Get('/getUsersById/:id')
  getUsersById(@Param('id') id: string): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Post('/createUser')
  async createUser(@Res() res, @Body() user: CreateUserDTO): Promise<User> {
    const userCreated = await this.userService.createUser(user);

    return res.status(HttpStatus.CREATED).json({
      message: 'User Successfully Created',
      user: userCreated,
    });
  }
}
