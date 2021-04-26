import { Schema } from 'mongoose';
//import { mongoosePaginate } from 'mongoose-paginate-v2'
import * as mongoosePaginate from 'mongoose-paginate-v2';


export const UserSchema = new Schema({
  email: { type: String, required: true },
  userName: { type: String, required: true },
  password: { type: String },
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  imgProfile: { type: String, default: '' },
  lastLogin: {
    type: Date,
    default: Date.now,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  files: [{ type: Schema.Types.ObjectId, ref: 'fs.files' }],
  role: { type: Schema.Types.ObjectId, ref: 'Role' }
});

UserSchema.plugin(mongoosePaginate);
