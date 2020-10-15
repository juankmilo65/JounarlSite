import { Document } from 'mongoose';

export interface Journal extends Document {
  readonly journalName: String;
  readonly createAt: Date;
}
