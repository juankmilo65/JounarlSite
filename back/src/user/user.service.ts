import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/User';
import { Model, PaginateModel } from 'mongoose';
import { CreateUserDTO } from './dto/create-user.dto';
import { RelateJournalUserDTO } from './dto/relateJournalUser.dto';
import { LoginDTO } from './dto/login.dto';
import { AuthService } from 'src/auth/services/auth.service';
import { from, Observable, throwError, of, OperatorFunction } from 'rxjs';
import { switchMap, map, catchError, concatMap } from 'rxjs/operators'

@Injectable()
export class UserService {

  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('User') private readonly paginateUserModel: PaginateModel<User>,
    private authService: AuthService
  ) { }

  async getUsers(): Promise<any> {
    const result = [];

    const options = {
      populate: [
        'role'
      ],
      page: Number(2),
      limit: Number(2),
    };

    return await this.paginateUserModel.paginate(null, options);

    // return from(this.paginateUserModel.paginate()).pipe(
    //   map((users: User[]) => {
    //     users.map(user => { result.push(this.mapUser(user, true)) });
    //     return result
    //   })
    // )
  }

  async validateUser(user: CreateUserDTO): Promise<any> {
    return await this.userModel.findOne({ userName: user.userName, email: user.email });
  }

  login(login: LoginDTO): Observable<string> {
    return this.validateUsersByUserAndPassword(login).pipe(
      map((response: string) => {
        return response
      })
    )
  }

  validateUsersByUserAndPassword(login: LoginDTO): Observable<any | string> {
    return from(this.userModel.findOne({ userName: login.userName })).pipe(
      switchMap((user: User) => {
        if (user) {
          return this.authService.comparePasswords(login.password as string, user.password as string)
            .pipe(
              concatMap(async (match: boolean) => {
                var isValid = await of(match).pipe(
                  map(result => {
                    return result
                  })
                ).toPromise()

                if (isValid) {
                  return this.authService.generateJWT(this.mapUser(user, true)).toPromise();
                } else {
                  return 'Wrong Credentials';
                }
              })
            )
        } else {
          return of('Wrong User');
        }
      })
    )
  }

  findByUserName(user: string): Observable<User> {
    return from(this.userModel.findOne({ userName: user })).pipe(
      map((user: User) => {
        return this.mapUser(user, false);
      })
    );
  }

  getUserById(id: string): Observable<any> {
    return from(this.userModel.findById(id).populate('role')).pipe(
      map((user: User) => {
        return this.mapUser(user, true)
      })
    )
  }

  createUser(user: CreateUserDTO): Observable<User> {
    return this.authService.hashPassword(user.password as string).pipe(
      switchMap((passwordHash: string) => {
        const newUser = new this.userModel(user).populate('role');
        newUser.password = passwordHash
        return from(newUser.save()).pipe(
          map((user: User) => {
            return this.mapUser(user, false);
          }),
          catchError(err => throwError(err))
        )
      })
    )
  }

  async relateJournalToUser(relation: RelateJournalUserDTO) {
    if (relation.isSelected) {
      return await this.userModel.findByIdAndUpdate(
        relation.idUser,
        {
          $push: {
            files: relation.idJournal
          }
        },
        {
          new: true,
          useFindAndModify: false
        })
    } else {
      return await this.userModel.findByIdAndUpdate(
        relation.idUser,
        {
          $pull: {
            files: relation.idJournal
          }
        },
        {
          new: true,
          useFindAndModify: false
        })
    }
  }

  updateUser(id: string, user: CreateUserDTO): Observable<User> {
    delete user.email;
    return from(this.userModel.findByIdAndUpdate({ _id: id }, user, { new: true, useFindAndModify: false }).populate('role')).pipe(
      map((user: User) => {
        return this.mapUser(user, true)
      })
    )
  }


  mapUser(result: any, isGet: boolean): any {
    const user = {
      id: isGet ? result._id : null,
      name: result.name,
      email: result.email,
      userName: result.userName,
      lastname: result.lastname,
      imgProfile: result.imgProfile,
      lastLogin: result.lastLogin,
      createAt: result.createAt,
      role: result.role.name
    }
    return user;
  }
}
