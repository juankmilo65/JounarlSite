import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { FileModule } from './file/file.module';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module'
import { ConfigModule } from '@nestjs/config';
import config from "./configuration/config";

const mongoUrl = `mongodb+srv://${config.mongo.user}:${config.mongo.password}@cluster0.yq5tn.mongodb.net/${config.mongo.name}?retryWrites=true&w=majority`;

@Module({
  imports: [
    MongooseModule.forRoot(mongoUrl),
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    FileModule,
    AuthModule,
    RoleModule
  ]
})
export class AppModule { }
