import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Course, CourseDTO } from './course.schema';

@Injectable()
export class CourseService {
  constructor(@InjectModel(Course.name) private courseModel: Model<Course>) {}

  async create(createCourseDto: CourseDTO): Promise<Course> {
    const found = await this.courseModel.findOne(createCourseDto);
    if (found) return found;
    const createdCourse = new this.courseModel(createCourseDto);
    return createdCourse.save();
  }

  async findAll(): Promise<Course[]> {
    return this.courseModel.find().exec();
  }

  async delete(id: string): Promise<any> {
    return this.courseModel.deleteOne({ _id: id });
  }
}
