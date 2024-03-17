import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Result, ResultDTO } from './result.schema';

@Injectable()
export class ResultService {
  constructor(@InjectModel(Result.name) private resultModel: Model<Result>) {}

  async create(createResultDto: ResultDTO): Promise<Result> {
    const found = await this.resultModel.findOne(createResultDto);    
    if (found) return found;
    const createdResult = new this.resultModel(createResultDto);
    return createdResult.save();
  }

  async findAll(): Promise<Result[]> {
    return this.resultModel
      .find({})
      .populate('student')
      .populate('course')
      .exec();
  }

  async delete(id: string): Promise<any> {
    return this.resultModel.deleteOne({ _id: id });
  }
}
