export interface IFile {
    id: string,
    length: number,
    chunkSize: number,
    uploadDate: Date,
    filename: string,
    md5: string,
    contentType: string
}