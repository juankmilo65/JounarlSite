import { Module } from '@nestjs/common';
import { JournalService } from './journal.service';
import { JournalController } from './journal.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { JournalSchema } from './schemas/journal.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Journal', schema: JournalSchema }
    ]),
  ],
  controllers: [JournalController],
  providers: [JournalService],
})
export class JournalModule {}
