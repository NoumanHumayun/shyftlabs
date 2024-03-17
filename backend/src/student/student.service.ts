import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Student, StudentDTO } from './student.schema';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name) private studentModel: Model<Student>,
  ) {}

  async create(createStudentDto: StudentDTO): Promise<Student> {
    const found = await this.studentModel.findOne(createStudentDto);
    if (found) return found;
    const createdStudent = new this.studentModel(createStudentDto);
    return createdStudent.save();
  }

  async findAll(): Promise<Student[]> {
    return this.studentModel.find().exec();
  }

  async delete(id: string): Promise<any> {
    return this.studentModel.deleteOne({ _id: id });
  }
}
