import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { FileModule } from './file/file.module';
import { AuthModule } from './auth/auth.module';
import  config  from "./configuration/config";

const mongoUrl = `mongodb+srv://${config.mongo.user}:${config.mongo.password}@cluster0.yq5tn.mongodb.net/${config.mongo.name}?retryWrites=true&w=majority`;

@Module({
  imports: [
    MongooseModule.forRoot(mongoUrl),
    UserModule,
    FileModule,
    AuthModule
  ]
})
export class AppModule {}
