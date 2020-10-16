import { Schema } from 'mongoose';


export const UserSchema = new Schema({
  userName: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  nationality: { type: Number, required: true },
  imgProfile: { type: String, default: '' },
  lastLogin: {
    type: Date,
    default: Date.now,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  isActive: { type: Boolean, required: true },
  files: [{type: Schema.Types.ObjectId, ref: 'fs.files'}]
});
