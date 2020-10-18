import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose'
import { Connection } from 'mongoose'
import { MongoGridFS } from 'mongo-gridfs'
import { GridFSBucketReadStream } from 'mongodb' 
import { FileResponseDTO } from "./dto/fileResponse.dto";

@Injectable()
export class FileService {
    private fileModel: MongoGridFS;
    
    constructor(
        @InjectConnection() private readonly connection: Connection
        ) {
        this.fileModel = new MongoGridFS(this.connection.db, 'fs');
       
      }

      async readStream(id: string): Promise<GridFSBucketReadStream> {
        return await this.fileModel.readFileStream(id);
      }
      
      async getFiles(type: string): Promise<FileResponseDTO[]> {
        const listFiles = []
        const result = await this.fileModel.find({contentType: type})
        .then(result=> result);
        result.map(o=>{
            listFiles.push({
                filename: o.filename,
                id: o._id.toHexString()
            })
        })
        
        return listFiles
      }

      async findInfo(id: string): Promise<FileResponseDTO> {
        const result = await this.fileModel
          .findById(id).catch( () => {throw new HttpException('File not found', HttpStatus.NOT_FOUND)} )
          .then(result => result)
        return{
          filename: result.filename,
          length: result.length,
          chunkSize: result.chunkSize,
          md5: result.md5,
          contentType: result.contentType,
          id: result._id.toHexString()
        }
      }
}
