import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { GridFSMulterConfigService  } from "./gridFSMulterConfig.service";


@Module({
imports: [
    MulterModule.registerAsync({
        useClass: GridFSMulterConfigService,
    })
],
providers: [GridFSMulterConfigService]
})
export class GridFSMulterConfigModule {}