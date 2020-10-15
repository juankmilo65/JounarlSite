import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/User';
import { Model } from 'mongoose';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>
  ) {}

  async getUsers(): Promise<User[]> {
    return await this.userModel.find();
  }

  async getUserById(id: string): Promise<User> {
    return await this.userModel.findById(id);
  }

  async createUser(user: CreateUserDTO): Promise<User> {
    const newUser = new this.userModel(user);
    return await newUser.save();
  }
}
