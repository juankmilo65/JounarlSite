export class CreateFileDTO
{
    readonly length: Number;
    readonly chunkSize: Number;
    readonly filename: String;   
    readonly md5: String;
    readonly contentType: String;
    readonly originalname: String;
    readonly encoding: String;
    readonly mimetype:String;
    readonly id: String;
    readonly metadata: Object;
    readonly bucketName: String;
    readonly size: Number;
    readonly uploadDate: Date;
}