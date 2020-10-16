import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from "./file.controller";
import { MulterModule } from '@nestjs/platform-express';
//import { GridFSMulterConfigModule } from "../configuration/gridfs/gridFSMulterConfig.module";
import {  GridFSMulterConfigService} from "../configuration/gridfs/gridFSMulterConfig.service";

@Module({
   imports: [
     MulterModule.registerAsync({
         useClass: GridFSMulterConfigService,
     })
 ],
  controllers:[FileController],
  providers: [GridFSMulterConfigService, FileService]
})
export class FileModule {}
