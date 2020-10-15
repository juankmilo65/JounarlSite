import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { CreateJournalDTO } from './dto/create-journal.dto';
import { JournalService } from './journal.service';
import { Journal } from './interfaces/Journal';

@Controller('journal')
export class JournalController {
  constructor(private journalService: JournalService) {}

  @Get('/getJournals')
  getUsers(): Promise<Journal[]> {
    return this.journalService.getJournals();
  }

  @Get('/getJournalById/:id')
  getUsersById(@Param('id') id: string): Promise<Journal> {
    return this.journalService.getJournalById(id);
  }

  @Post('/createJournal')
  async createUser(@Res() res, @Body() user: CreateJournalDTO): Promise<Journal> {
    const userCreated = await this.journalService.createJournal(user);

    return res.status(HttpStatus.CREATED).json({
      message: 'User Successfully Created',
      user: userCreated,
    });
  }
}
