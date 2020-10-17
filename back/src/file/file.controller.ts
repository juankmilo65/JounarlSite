import { Controller, Get, HttpException, HttpStatus, Param, Post, Res, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileService } from "./file.service";
import { AnyFilesInterceptor} from "@nestjs/platform-express";
import { FileResponseDTO } from './dto/fileResponse.dto';


@Controller('file')
export class FileController {
    constructor(private fileService: FileService ){}

    @Post('')
    @UseInterceptors(AnyFilesInterceptor())
    upload(@UploadedFiles() files) {
        const response = [];
        files.forEach(file => {
            const fileReponse = {
                originalname: file.originalname,
                encoding: file.encoding,
                mimetype: file.mimetype,
                id: file.id,
                filename: file.filename,
                metadata: file.metadata,
                bucketName: file.bucketName,
                chunkSize: file.chunkSize,
                size: file.size,
                md5: file.md5,
                uploadDate: file.uploadDate,
                contentType: file.contentType,
            };
            response.push(fileReponse);
        });
        return response;
    }

    @Get('info/:id')
    async getFileInfo(@Param('id') id: string): Promise<FileResponseDTO> {        
        const file = await this.fileService.findInfo(id)
        const filestream = await this.fileService.readStream(id)
        if(!filestream){
            throw new HttpException('An error occurred while retrieving file info', HttpStatus.EXPECTATION_FAILED)
        }
        return file
    }

    @Get(':id')
    async getFile(@Param('id') id: string, @Res() res) {   
        const file = await this.fileService.findInfo(id)
        const filestream = await this.fileService.readStream(id)
        if(!filestream){
            throw new HttpException('An error occurred while retrieving file', HttpStatus.EXPECTATION_FAILED)
        }
        res.header('Content-Type', file.contentType);
        return filestream.pipe(res)
    }

    @Get('/allFiles/:type')
    async getFiles(@Param('type') type: string):Promise<FileResponseDTO[]> 
    {
        return await this.fileService.getFiles("application/"+type);
    }
}
