import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Journal } from './interfaces/Journal';
import { Model } from 'mongoose';
import { CreateJournalDTO } from './dto/create-journal.dto';

@Injectable()
export class JournalService {
  constructor(
    @InjectModel('Journal') private readonly journalModel: Model<Journal>,
  ) {}

  async getJournals(): Promise<Journal[]> {
    return await this.journalModel.find();
  }

  async getJournalById(id: string): Promise<Journal> {
    return await this.journalModel.findById(id);
  }

  async createJournal(journal: CreateJournalDTO): Promise<Journal> {
    const newUser = new this.journalModel(journal);
    return await newUser.save();
  }
  
}
