import { Schema } from 'mongoose';

export const JournalSchema = new Schema({
  journalName: { type: String, required: true },
  createAt: {
    type: Date,
    default: Date.now,
  }
});
