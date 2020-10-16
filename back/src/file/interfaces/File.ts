import { Document } from 'mongoose';

export interface File extends Document {
    readonly filename: String; 
    readonly length: Number;
    readonly chunkSize: Number;
    readonly md5: String;
    readonly contentType: String;
}