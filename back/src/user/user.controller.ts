import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Res,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserService } from './user.service';
import { User } from './interfaces/User';
import { RelateJournalUserDTO } from './dto/relateJournalUser.dto';
import { LoginDTO } from './dto/login.dto';
import { catchError, map, tap } from 'rxjs/operators';
import { from, Observable, of, throwError } from 'rxjs';
import { hasRoles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guards';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService,) { }

  @hasRoles('Admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/getUsers')
  getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Post('/login')
  login(@Body() login: LoginDTO): Observable<any> {
    return from(this.userService.login(login)).pipe(
      map((jwt: string) => {
        return { access_token: jwt }
      }));
  }

  @Get('/getUsersById/:id')
  getUsersById(@Param('id') id: string): Observable<User> {
    return this.userService.getUserById(id);
  }

  @Post('/createUser')
  async createUser(@Body() user: CreateUserDTO): Promise<User | any> {
    if (Object.entries(user).length === 0) return { error: "Object cannot be empty" };
    const responseUser = await this.userService.validateUser(user);
    if (!responseUser) {
      user.email = user.email.toLocaleLowerCase();
      return this.userService.createUser(user).pipe(
        map((user: User) => user),
        catchError(err => of({ error: err.message }))
      );
    }
    else {
      return throwError({ error: 'User already exist.' });
    }
  }

  @Post('/relateJournalToUser')
  async relateJournalToUser(@Res() res, @Body() relation: RelateJournalUserDTO): Promise<User> {
    const userUpdated = await this.userService.relateJournalToUser(relation);
    return res.status(HttpStatus.OK).json({
      message: 'Journal related successfully',
      user: userUpdated,
    });
  }
}
