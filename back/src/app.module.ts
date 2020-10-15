import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { JournalModule } from "./journal/journal.module";
import { MongooseModule } from '@nestjs/mongoose';
import  config  from "./configuration/config";

const mongoUrl = `mongodb+srv://${config.mongo.user}:${config.mongo.password}@cluster0.yq5tn.mongodb.net/${config.mongo.name}?retryWrites=true&w=majority`;

@Module({
  imports: [
    MongooseModule.forRoot(mongoUrl),
    UserModule,
    JournalModule
  ],
})
export class AppModule {}
