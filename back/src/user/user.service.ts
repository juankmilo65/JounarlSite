import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/User';
import { Model } from 'mongoose';
import { CreateUserDTO } from './dto/create-user.dto';
import { RelateJournalUserDTO } from './dto/relateJournalUser.dto';
import { LoginDTO } from './dto/login.dto';
import { AuthService } from 'src/auth/auth.service';
import { from, Observable, throwError } from 'rxjs';
import{ switchMap, map, catchError} from 'rxjs/operators'


@Injectable()
export class UserService {
  private userResult : User;

  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private authService : AuthService
  ) {}

  async getUsers(): Promise<any> {
    const result=[];
    return from(this.userModel.find()).pipe(
      map((users:User[])=>{
        users.map(user=>{ result.push(this.mapUser(user))} );
        return result
      })
    )
  }

  async validateUser(user: CreateUserDTO): Promise<any> {
    return  await this.userModel.findOne({userName: user.userName, email: user.email});
  }
  


  login(login: LoginDTO): Observable<string>{
    return  this.validateUsersByUserAndPassword(login).pipe(
      switchMap((user:User)=>{
        if(user){
          return this.authService.generateJWT(user).pipe(map((jwt: string) => jwt));
        }else{
          return 'Wrong Credentials';
        }
      })
    )
  } 

  validateUsersByUserAndPassword(login: LoginDTO): Observable<User> {
    return this.findByEmail(login.email as string).pipe(
      switchMap((user:User) =>  this.authService.comparePasswords(login.password as string, user.password as string).pipe(
        map((match:boolean)=>{
          if(match){
            const {password, ...result} = user;
            return this.mapUser(result);
            }else
            {
              throw Error
            }
          })
        )
      )
    )
  }

  findByEmail(email: string): Observable<User> {
    return from(this.userModel.findOne({userName: email}));
  }

  async getUserById(id: string): Promise<any> {
    return from(this.userModel.findById(id)).pipe(
      map((user:User)=>{
        return this.mapUser(user)
      })
    )
  }
  
 
  
  createUser(user: CreateUserDTO): Observable<User> {
    return this.authService.hashPassword(user.password as string).pipe(
      switchMap((passwordHash:string)=>{
        const newUser = new this.userModel(user);
        console.log(newUser)
        newUser.password=passwordHash
        return from( newUser.save()).pipe(
          map((user: User) => {
            return this.mapUser(user);
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


  mapUser(result: any): any
  {
    const user ={
      name : result.name,
      email : result.email,
      userName : result.userName,
      lastname: result.lastname,
      imgProfile : result.imgProfile,
      lastLogin : result.lastLogin,
      createAt: result.createAt
    }
    return user;
  }
}
