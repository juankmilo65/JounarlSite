import { Schema } from 'mongoose';

export const FileSchema = new Schema({
    filename:  { type: String, required: true },
    length:  { type: Number, required: true },
    chunkSize:  { type: Number, required: true },
    md5:  { type: String, required: true },
    contentType:  { type: String, required: true }
});