import { Document } from 'mongoose';

export interface User extends Document {
  _id: String;
  email: String;
  userName: String;
  name: String;
  lastname: String;
  imgProfile: String;
  lastLogin: Date;
  createAt: Date;
  password: String;
}
