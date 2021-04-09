import { Document } from 'mongoose';

export interface User extends Document {
  readonly _id: String;
  readonly email: String;
  readonly userName: String;
  readonly name: String;
  readonly lastname: String;
  readonly imgProfile: String;
  readonly lastLogin: Date;
  readonly createAt: Date;
  password: String;
}
