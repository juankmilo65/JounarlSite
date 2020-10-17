import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/User';
import { Model } from 'mongoose';
import { CreateUserDTO } from './dto/create-user.dto';
import { RelateJournalUserDTO } from './dto/relateJournalUser.dto';
import { LoginDTO } from './dto/login.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>
  ) {}

  async getUsers(): Promise<User[]> {
    return await this.userModel.find();
  }

  async validateUsersByUserAndPassword(login: LoginDTO): Promise<User[]> {
    return await this.userModel.find({userName: login.userName, password: login.password});
  }

  async getUserById(id: string): Promise<User> {
    return await this.userModel.findById(id);
  }
  
  async validateUserName(user: CreateUserDTO): Promise<User[]> {
    return await this.userModel.find({userName: user.userName});
  }

  async createUser(user: CreateUserDTO): Promise<User> {
    const newUser = new this.userModel(user);
    return await newUser.save();
  }

  async relateJournalToUser(relation: RelateJournalUserDTO )
  {
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
  }
}
