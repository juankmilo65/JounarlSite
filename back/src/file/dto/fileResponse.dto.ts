export class FileResponseDTO
{
    readonly id: String;
    readonly filename: String; 
    readonly length: Number;
    readonly chunkSize: Number;
    readonly md5: String;
    readonly contentType: String;
}