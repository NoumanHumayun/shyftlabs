import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { IsDateString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';

import { Course } from '../course/course.schema';
import { Student } from '../student/student.schema';
export type ResultDocument = HydratedDocument<Result>;

@Schema()
export class Result {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Course' })
  course: Course;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Student' })
  student: Student;

  @Prop({ required: true })
  grade: string;
}

export const ResultSchema = SchemaFactory.createForClass(Result);

export class ResultDTO {
  @IsNotEmpty()
  course: string;
  @IsNotEmpty()
  student: string;
  @IsNotEmpty()
  grade: string;
}
