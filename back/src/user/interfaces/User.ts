import { Document } from 'mongoose';

export interface User extends Document {
  readonly userName: String;
  readonly password: String;
  readonly name: String;
  readonly lastname: String;
  readonly nationality: Number;
  readonly imgProfile: String;
  readonly lastLogin: Date;
  readonly createAt: Date;
  readonly isActive: Boolean;
}
