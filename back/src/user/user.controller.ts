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
import { RelateJournalUserDTO } from './dto/relateJournalUser.dto';
import { LoginDTO } from './dto/login.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/getUsers')
  getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Post('/validateUsersByUserAndPassword')
  async validateUsersByUserAndPassword(@Res() res, @Body() login: LoginDTO) : Promise<string>
  {
    let message = "";
    const response= await this.userService.validateUsersByUserAndPassword(login)
    message =  response.length === 0 ? "User or Password does not exist.": "Login OK.";
    
    return res.status(HttpStatus.OK).json({
    user: response.length === 0 ? {}: response[0],
    message:message
  });
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

  @Post('/relateJournalToUser')
  async relateJournalToUser(@Res() res, @Body() relation: RelateJournalUserDTO): Promise<User>{
    const userUpdated = await this.userService.relateJournalToUser(relation);
    return res.status(HttpStatus.OK).json({
      message: 'Journal related successfully',
      user: userUpdated,
    });
  }
}
