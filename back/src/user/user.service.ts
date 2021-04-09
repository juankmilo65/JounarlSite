import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/User';
import { Model } from 'mongoose';
import { CreateUserDTO } from './dto/create-user.dto';
import { RelateJournalUserDTO } from './dto/relateJournalUser.dto';
import { LoginDTO } from './dto/login.dto';
import { AuthService } from 'src/auth/auth.service';
import { from,Observable, throwError } from 'rxjs';
import{ switchMap, map, catchError} from 'rxjs/operators'


@Injectable()
export class UserService {
  private usersResult : User[];

  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private authService : AuthService
  ) {}

  async getUsers(): Promise<any> {
    const usersResult =[];
    return from(this.userModel.find()).pipe(
      map((users:User[])=>{
        users.forEach(function (user) {delete user.password});
        return usersResult
      })
    )

  }

  async validateUsersByUserAndPassword(login: LoginDTO): Promise<User[]> {
    (await this.findByEmail(login.email as string)).map((user:User)=>{
      this.authService.comparePasswords(login.password as string, user.password as string).pipe(
        map((match:boolean)=>{
          if(match){
            const {password, ...result} = user;
            return result;
          }else
          {
            throw Error
          }
        })
      )
    });

    

    return await this.userModel.find({userName: login.email});
  }

  async getUserById(id: string): Promise<any> {
    return from(this.userModel.findById(id)).pipe(
      map((user:User)=>{
        const {password, ...result} = user;
        return result
      })
    )
  }
  
  async validateUserName(user: CreateUserDTO): Promise<User[]> {
    return await this.userModel.find({userName: user.userName});
  }

  async validateEmail(user: CreateUserDTO): Promise<User[]> {
    return await this.userModel.find({email: user.email});
  }

  async createUser(user: CreateUserDTO): Promise<any> {
     return this.authService.hashPassword(user.password as string).pipe(
      switchMap((passwordHash:string)=>{
        const newUser = new this.userModel(user);
        newUser.password=passwordHash

        return from( newUser.save()).pipe(
          map((user: User) => {
            const{password, ...result} = user;
            return result
          }),
          catchError(err => throwError(err))
        )
      })
    )
  }

  async relateJournalToUser(relation: RelateJournalUserDTO )
  {
    if(relation.isSelected)  {
   return await this.userModel.findByIdAndUpdate(
    relation.idUser,
      {
        $push:{
          files:relation.idJournal
        }
      },
      {
        new: true,
        useFindAndModify: false
      })
    }else
    {
      return await this.userModel.findByIdAndUpdate(
        relation.idUser,
          {
            $pull:{
              files:relation.idJournal
            }
          },
          {
            new: true,
            useFindAndModify: false
          })
    }
  }

  async updateUser(_id: string, user: CreateUserDTO): Promise<Observable<User>> {
    delete user.email;
    delete user.password;

    return from(this.userModel.findByIdAndUpdate({_id: _id}, user));
  }

  async findByEmail(email: string)
  {
    return await this.userModel.find({email: email});
  }
}
